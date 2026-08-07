"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import IntroOverlay, { type IntroPhase } from "./IntroOverlay";
import { useMusic } from "./MusicProvider";

const SESSION_KEY = "wedding-intro-seen";
const CELEBRATION_DURATION_MS = 2600;

type ControllerPhase = "checking" | IntroPhase | "done";

/**
 * Orchestrates the one-time-per-session envelope intro: checks
 * sessionStorage, drives the envelope -> celebration -> exit phases, and
 * keeps the invitation content mounted (but hidden) underneath so it's
 * ready the instant the overlay clears.
 */
export default function IntroController({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<ControllerPhase>("checking");
  const { unlockAndPlay, fadeIn } = useMusic();
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_KEY);
    setPhase(seen ? "done" : "envelope");
  }, []);

  const introActive = phase !== "done";

  useEffect(() => {
    if (!introActive) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introActive]);

  useEffect(() => {
    return () => {
      if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
    };
  }, []);

  const handleEnvelopeClick = useCallback(() => {
    // Must run synchronously inside the click gesture — this is the only
    // thing that can legally unlock audio in the browser.
    unlockAndPlay();
    setPhase("opening");
  }, [unlockAndPlay]);

  const handleEnvelopeOpened = useCallback(() => {
    setPhase("celebrating");
    fadeIn();
    celebrationTimer.current = setTimeout(() => {
      setPhase("exiting");
    }, CELEBRATION_DURATION_MS);
  }, [fadeIn]);

  const handleExitComplete = useCallback(() => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("done");
  }, []);

  return (
    <>
      <div aria-hidden={introActive} className={introActive ? "invisible" : undefined}>
        {children}
      </div>

      {phase === "checking" && (
        <div className="fixed inset-0 z-[100] bg-champagne" aria-hidden="true" />
      )}

      {phase !== "checking" && phase !== "done" && (
        <IntroOverlay
          phase={phase}
          onEnvelopeClick={handleEnvelopeClick}
          onEnvelopeOpened={handleEnvelopeOpened}
          onExitComplete={handleExitComplete}
        />
      )}
    </>
  );
}
