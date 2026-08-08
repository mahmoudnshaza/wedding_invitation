"use client";

import { motion } from "framer-motion";
import { Users, Church, UtensilsCrossed, PartyPopper, type LucideIcon, Landmark } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface ProgramItem {
  time: string;
  label: string;
  icon: LucideIcon;
}

const items: ProgramItem[] = [
  { time: "7:00 PM", label: "Guest Arrival", icon: Users },
  { time: "7:30 PM", label: "Ceremony", icon: Landmark },
  { time: "9:00 PM", label: "Dinner", icon: UtensilsCrossed },
  { time: "12:00 AM", label: "Party Ends", icon: PartyPopper },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Program() {
  return (
    <section
      id="program"
      className="relative w-full bg-champagne pattern-arcs py-24 sm:py-32 px-6"
    >
      <SectionTitle eyebrow="The Evening" title="Program" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {items.map(({ time, label, icon: Icon }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group flex flex-col items-center text-center gap-4 rounded-2xl bg-white/80 border border-gold/20 shadow-soft px-6 py-10 transition-shadow duration-300 hover:shadow-gold"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-soft text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <span className="font-display text-xl sm:text-2xl text-charcoal tracking-wide">
              {time}
            </span>
            <span className="font-body text-xs sm:text-sm tracking-widest2 uppercase text-charcoal-soft">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
