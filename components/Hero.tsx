"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GoldGlow, LaurelFlourish, RingsIcon } from "./Ornaments";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div variants={zoomIn} className="relative shrink-0">
      <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-gold/40" />
      <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden ring-2 ring-gold/70 shadow-gold">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 80px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 176px"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-champagne pattern-floral px-6 py-24"
    >
      {/* Decorative background */}
      <GoldGlow className="w-[520px] h-[520px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <LaurelFlourish className="hidden sm:block absolute top-10 left-4 md:left-10 w-10 md:w-14 h-32 md:h-40 opacity-70" />
      <LaurelFlourish
        flip
        className="hidden sm:block absolute top-10 right-4 md:right-10 w-10 md:w-14 h-32 md:h-40 opacity-70"
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <motion.span
          variants={fadeUp}
          className="font-display uppercase tracking-widest2 text-2xl sm:text-3xl md:text-4xl font-medium text-gold-deep text-shadow-gold"
        >
          Let&rsquo;s Get Married
        </motion.span>

        <motion.div
          variants={fadeUp}
          className="mt-10 sm:mt-14 flex flex-row items-center justify-center gap-3 sm:gap-10 md:gap-14"
        >
          <div className="flex flex-col items-center gap-3 sm:gap-5 min-w-0">
            <span className="font-display italic text-xl sm:text-4xl md:text-6xl text-charcoal whitespace-nowrap">
              Mahmoud
            </span>
            <Portrait src="/Mahmoud.jpeg" alt="Portrait of Mahmoud" />
          </div>

          <motion.div variants={zoomIn} className="w-8 sm:w-16 md:w-24 shrink-0">
            <RingsIcon className="w-full h-auto" />
          </motion.div>

          <div className="flex flex-col items-center gap-3 sm:gap-5 min-w-0">
            <span className="font-display italic text-xl sm:text-4xl md:text-6xl text-charcoal whitespace-nowrap">
              Shaza
            </span>
            <Portrait src="/Shaza1.jpg" alt="Portrait of Shaza" />
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 sm:mt-12 font-body text-sm sm:text-base text-charcoal-soft leading-relaxed"
        >
          You have received an invitation
          <br className="sm:hidden" /> from Mahmoud &amp; Shaza
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide"
        >
          Mahmoud Saeed
          <span className="block text-gold my-1 sm:my-2 text-2xl sm:text-3xl md:text-4xl">
            &amp;
          </span>
          Shaza Romhy
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-widest2 uppercase text-charcoal-faint">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold"
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
