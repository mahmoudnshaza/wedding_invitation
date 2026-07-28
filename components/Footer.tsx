"use client";

import { motion } from "framer-motion";
import { DividerFlourish, RingsIcon } from "./Ornaments";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-charcoal py-24 sm:py-28 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_50%_0%,#C6A15B,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center"
      >
        <RingsIcon className="w-16 sm:w-20 h-auto mb-8 opacity-90" />

        <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-white leading-snug">
          We can&rsquo;t wait to celebrate with you.
        </h2>

        <DividerFlourish className="mt-8 mb-8" />

        <span className="font-body text-xs sm:text-sm tracking-widest2 uppercase text-gold-light">
          With Love
        </span>
        <span className="mt-3 font-display text-2xl sm:text-3xl text-white">
          Mahmoud &amp; Shaza
        </span>
      </motion.div>
    </footer>
  );
}
