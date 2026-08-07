"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ParticleKind = "petal" | "heart" | "sparkle" | "confetti" | "leaf" | "star" | "ring";

interface BurstParticle {
  id: number;
  kind: ParticleKind;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
}

const KINDS: ParticleKind[] = ["petal", "heart", "sparkle", "confetti", "leaf", "star", "ring"];
const COLORS = ["#C6A15B", "#E4CE9C", "#9C7C3C", "#F1E4C4", "#D98C8C"];

function createBurst(count: number): BurstParticle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    kind: KINDS[Math.floor(Math.random() * KINDS.length)],
    angle: Math.random() * Math.PI * 2,
    distance: 90 + Math.random() * 220,
    size: 10 + Math.random() * 14,
    duration: 1.6 + Math.random() * 1.1,
    delay: Math.random() * 0.5,
    rotate: (Math.random() - 0.5) * 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

function ParticleShape({ kind, color }: { kind: ParticleKind; color: string }) {
  switch (kind) {
    case "petal":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 2C7 6 6 12 12 22C18 12 17 6 12 2Z" fill={color} opacity={0.85} />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            d="M12 21s-7.5-4.6-10.2-9.3C.2 8.7 1.7 5 5.4 4.3 8 3.8 10.3 5 12 7.4 13.7 5 16 3.8 18.6 4.3 22.3 5 23.8 8.7 22.2 11.7 19.5 16.4 12 21 12 21z"
            fill={color}
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
        </svg>
      );
    case "confetti":
      return (
        <div className="w-full h-full rounded-[2px]" style={{ backgroundColor: color }} />
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M3 21C3 12 9 3 21 3C21 12 15 21 3 21Z" fill={color} opacity={0.8} />
          <path
            d="M4 20 C10 14 15 9 20 4"
            stroke="#6B4328"
            strokeWidth="0.6"
            opacity={0.4}
            fill="none"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            d="M12 2 L14.6 9 L22 9.5 L16.3 14.2 L18.2 21.5 L12 17.3 L5.8 21.5 L7.7 14.2 L2 9.5 L9.4 9 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
          />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="9" cy="12" r="6" fill="none" stroke={color} strokeWidth="1.4" />
          <circle cx="15" cy="12" r="6" fill="none" stroke={color} strokeWidth="1.4" />
        </svg>
      );
  }
}

/**
 * A luxurious burst of flowers, petals, hearts, sparkles, gold confetti and
 * wedding motifs (rings, leaves, stars) fired outward from the opened
 * envelope, then settling like falling petals.
 */
export default function CelebrationAnimation({ reducedMotion }: { reducedMotion: boolean }) {
  const particles = useMemo(() => createBurst(reducedMotion ? 0 : 34), [reducedMotion]);

  if (reducedMotion) {
    return (
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <div className="w-64 h-64 rounded-full bg-gold/20 blur-3xl" />
      </motion.div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => {
        const endX = Math.cos(p.angle) * p.distance;
        const endY = Math.sin(p.angle) * p.distance - 40;
        return (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-[42%]"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{
              x: [0, endX * 0.6, endX],
              y: [0, endY, endY + 160],
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1, 1, 0.7],
              rotate: p.rotate,
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParticleShape kind={p.kind} color={p.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
