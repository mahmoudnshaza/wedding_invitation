"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WeddingEnvelope from "./WeddingEnvelope";
import CelebrationAnimation from "./CelebrationAnimation";
import { GoldGlow } from "./Ornaments";

export type IntroPhase = "envelope" | "opening" | "celebrating" | "exiting";

interface IntroOverlayProps {
  phase: IntroPhase;
  onEnvelopeClick: () => void;
  onEnvelopeOpened: () => void;
  onExitComplete: () => void;
}

interface AmbientParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Full-screen intro cover: soft floating particles, the envelope, the
 * celebration burst once opened, and a cinematic fade + zoom exit into
 * the invitation beneath.
 */
export default function IntroOverlay({
  phase,
  onEnvelopeClick,
  onEnvelopeOpened,
  onExitComplete,
}: IntroOverlayProps) {
  const reducedMotion = !!useReducedMotion();

  const particles = useMemo<AmbientParticle[]>(
    () =>
      Array.from({ length: reducedMotion ? 0 : 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 7,
      })),
    [reducedMotion]
  );

  const isExiting = phase === "exiting";

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-champagne pattern-floral"
          initial={{ opacity: 1 }}
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0.5 } }
              : {
                  opacity: 0,
                  scale: 1.06,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                }
          }
          aria-live="polite"
        >
          <GoldGlow className="w-[480px] h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-gold/30 pointer-events-none"
              style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -10 }}
              animate={{ y: [0, -520], opacity: [0, 0.6, 0.6, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center px-6">
            <WeddingEnvelope
              isOpen={phase === "opening" || phase === "celebrating"}
              disabled={phase !== "envelope"}
              onClick={onEnvelopeClick}
              onOpened={onEnvelopeOpened}
              reducedMotion={reducedMotion}
            />

            <motion.p
              animate={{ opacity: phase === "envelope" ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 font-body text-xs sm:text-sm tracking-widest2 uppercase text-charcoal-faint"
            >
              Tap to open your invitation
            </motion.p>
          </div>

          {phase === "celebrating" && <CelebrationAnimation reducedMotion={reducedMotion} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
