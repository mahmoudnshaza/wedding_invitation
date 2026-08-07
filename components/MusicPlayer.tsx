"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export interface MusicPlayerHandle {
  /** Silently plays + immediately pauses, using the current user gesture to unlock autoplay. */
  unlock: () => void;
  /** Starts playback and fades the volume in over ~2s. */
  fadeIn: () => void;
}

type MusicPlayerProps = object;

const MUSIC_SRC = "/wedding-music.mpeg";
const FADE_MS = 2000;
const TARGET_VOLUME = 0.55;

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer(_props, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const fadeVolumeTo = useCallback((target: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);

    const start = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t < 1) {
        fadeFrame.current = requestAnimationFrame(step);
      } else {
        fadeFrame.current = null;
      }
    };
    fadeFrame.current = requestAnimationFrame(step);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      unlock: () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => {
            // Missing asset or blocked — the floating button remains a manual fallback.
          });
      },
      fadeIn: () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeVolumeTo(TARGET_VOLUME, FADE_MS);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      },
    }),
    [fadeVolumeTo]
  );

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeVolumeTo(TARGET_VOLUME, 600);
        })
        .catch(() => {
          // Asset likely missing — nothing to play yet.
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" />
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[90] flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
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
    </>
  );
});

export default MusicPlayer;
