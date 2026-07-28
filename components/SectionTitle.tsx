"use client";

import { motion } from "framer-motion";
import { DividerFlourish } from "./Ornaments";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      {eyebrow && (
        <span
          className={`font-body text-[11px] sm:text-xs tracking-widest2 uppercase mb-3 ${
            light ? "text-gold-light" : "text-gold-deep"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <DividerFlourish className="mt-5" />
      {subtitle && (
        <p
          className={`mt-4 max-w-xl font-body text-sm sm:text-base leading-relaxed ${
            light ? "text-white/80" : "text-charcoal-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
