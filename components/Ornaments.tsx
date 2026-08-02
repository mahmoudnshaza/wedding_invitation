"use client";

import { motion } from "framer-motion";

/**
 * A thin gold divider line with a small diamond flourish in the center.
 * Used consistently across sections as the site's signature motif.
 */
export function DividerFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-gold shrink-0">
        <rect
          x="1"
          y="1"
          width="12"
          height="12"
          transform="rotate(45 7 7)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

/**
 * Two delicate interlocking rings — the site's core signature icon.
 * Appears between the couple's portraits in the hero.
 */
export function RingsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="34" cy="34" r="20" stroke="url(#ringGrad1)" strokeWidth="2.25" />
      <circle cx="56" cy="34" r="20" stroke="url(#ringGrad2)" strokeWidth="2.25" />
      <path
        d="M45 8 L48.5 15.5 L57 16.5 L50.8 22.2 L52.5 30.5 L45 26.3 L37.5 30.5 L39.2 22.2 L33 16.5 L41.5 15.5 Z"
        fill="#C6A15B"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="ringGrad1" x1="14" y1="14" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4CE9C" />
          <stop offset="1" stopColor="#9C7C3C" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="36" y1="14" x2="76" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9C7C3C" />
          <stop offset="1" stopColor="#E4CE9C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * A slim laurel-style flourish used as a frame accent.
 */
export function LaurelFlourish({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 120"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 5 C30 40 30 80 30 115"
        stroke="#C6A15B"
        strokeWidth="1"
        opacity="0.6"
      />
      {[18, 34, 50, 66, 82, 98].map((y, i) => (
        <path
          key={y}
          d={`M30 ${y} C${30 + (i % 2 === 0 ? 22 : 14)} ${y - 8} ${30 + (i % 2 === 0 ? 24 : 16)} ${y + 8} 30 ${y + 14}`}
          stroke="#C6A15B"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}
    </svg>
  );
}

/**
 * A gently floating heart, used as ambient decoration and the
 * "highlighted day" marker in the Save the Date calendar.
 */
export function FloatingHeart({
  size = 18,
  className = "",
  delay = 0,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path
        d="M12 21s-7.5-4.6-10.2-9.3C.2 8.7 1.7 5 5.4 4.3 8 3.8 10.3 5 12 7.4 13.7 5 16 3.8 18.6 4.3 22.3 5 23.8 8.7 22.2 11.7 19.5 16.4 12 21 12 21z"
        fill="#C6A15B"
      />
    </motion.svg>
  );
}

/**
 * A slim corner flourish — an L-shaped bracket with a small curling
 * tendril, echoing the hand-drawn linework used elsewhere on the site.
 * Rotated per-corner to frame the page in PageFrame.
 */
export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 26 V4 C1 2.3 2.3 1 4 1 H26"
        stroke="#C6A15B"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M1 13 C6 13 9 10 9 5"
        stroke="#C6A15B"
        strokeWidth="0.75"
        opacity="0.3"
      />
      <path
        d="M13 1 C13 6 10 9 5 9"
        stroke="#C6A15B"
        strokeWidth="0.75"
        opacity="0.3"
      />
      <circle cx="1" cy="1" r="2" fill="#C6A15B" opacity="0.55" />
    </svg>
  );
}

/** A soft radial glow used behind key focal elements. */
export function GoldGlow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(198,161,91,0.55) 0%, rgba(198,161,91,0) 70%)",
      }}
    />
  );
}
