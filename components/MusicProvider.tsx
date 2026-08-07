"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC = "/wedding-music.mp3";
const FADE_MS = 2000;
const TARGET_VOLUME = 0.55;

interface MusicContextValue {
  /**
   * Must be called synchronously from inside the triggering user gesture
   * (e.g. the envelope's onClick). Starts real, silent (volume 0) playback
   * immediately so the click itself is what unlocks audio — nothing async
   * sits between the gesture and audio.play().
   */
  unlockAndPlay: () => void;
  /** Ramps the already-playing audio up to the target volume. Never calls play() again. */
  fadeIn: () => void;
  toggle: () => void;
  toggleMute: () => void;
  isPlaying: boolean;
  isMuted: boolean;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
}

export default function MusicProvider({ children }: { children: ReactNode }) {
  // Lazy-initialized once via the ref-guard pattern, not in an effect, so
  // audio.play() below is never separated from the click that calls it by
  // an extra render/effect tick.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const hasUnlocked = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!audioRef.current && typeof window !== "undefined") {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.src = MUSIC_SRC;
    audioRef.current = audio;
    console.log("[music] audio created");
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () =>
      console.log("[music] audio loaded (loadedmetadata)", { readyState: audio.readyState });
    const onCanPlay = () => console.log("[music] canplay", { readyState: audio.readyState });
    const onCanPlayThrough = () =>
      console.log("[music] canplaythrough", { readyState: audio.readyState });
    const onError = () => console.error("[music] audio element error", audio.error);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("error", onError);

    if (audio.readyState === 0 /* HAVE_NOTHING */) {
      audio.load();
      console.log("[music] audio.load() called");
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const fadeVolumeTo = useCallback((target: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);

    const start = audio.volume;
    const startTime = performance.now();
    console.log("[music] fade started", { from: start, to: target, duration });
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t < 1) {
        fadeFrame.current = requestAnimationFrame(step);
      } else {
        fadeFrame.current = null;
        console.log("[music] fade completed", { volume: audio.volume });
      }
    };
    fadeFrame.current = requestAnimationFrame(step);
  }, []);

  // Plays and correctly handles the promise per the play()/catch contract.
  // If it rejects for a reason other than the browser blocking autoplay
  // (e.g. the source wasn't buffered enough yet), retry once the browser
  // signals it's actually ready.
  const requestPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("[music] play() requested", { readyState: audio.readyState });
    try {
      await audio.play();
      console.log("[music] play() resolved");
      setIsPlaying(true);
    } catch (error) {
      console.error("[music] play() rejected", error);
      setIsPlaying(false);
      const name = error instanceof DOMException ? error.name : undefined;
      if (name !== "NotAllowedError") {
        const retry = () => {
          audio.removeEventListener("canplaythrough", retry);
          void requestPlay();
        };
        audio.addEventListener("canplaythrough", retry, { once: true });
      }
    }
  }, []);

  const unlockAndPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasUnlocked.current) return;
    hasUnlocked.current = true;
    console.log("[music] envelope clicked");
    audio.volume = 0;
    void requestPlay();
  }, [requestPlay]);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Safety net: if the initial unlock play() is still pending/failed,
    // this ensures playback still starts — never a second competing play()
    // once it's already underway.
    if (audio.paused) {
      void requestPlay();
    }
    fadeVolumeTo(TARGET_VOLUME, FADE_MS);
  }, [fadeVolumeTo, requestPlay]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      console.log("[music] pause()");
      audio.pause();
      setIsPlaying(false);
    } else {
      console.log("[music] resume()");
      void requestPlay().then(() => fadeVolumeTo(TARGET_VOLUME, 600));
    }
  }, [isPlaying, requestPlay, fadeVolumeTo]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return (
    <MusicContext.Provider
      value={{ unlockAndPlay, fadeIn, toggle, toggleMute, isPlaying, isMuted }}
    >
      {children}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[90] flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne/90 backdrop-blur-sm border border-gold/40 shadow-gold text-gold-deep hover:bg-gold/10 transition-colors"
        >
          {isPlaying ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne/90 backdrop-blur-sm border border-gold/40 shadow-gold text-gold-deep hover:bg-gold/10 transition-colors"
        >
          {isMuted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
        </button>
      </div>
    </MusicContext.Provider>
  );
}
