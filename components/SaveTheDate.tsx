"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { FloatingHeart } from "./Ornaments";

const days = [8, 9, 10, 11, 12, 13, 14];

export default function SaveTheDate() {
  return (
    <section
      id="save-the-date"
      className="relative w-full bg-blush pattern-diamond py-24 sm:py-32 px-6 overflow-hidden"
    >
      <FloatingHeart size={16} className="absolute top-16 left-[10%] opacity-40" delay={0} />
      <FloatingHeart size={22} className="absolute bottom-24 right-[12%] opacity-30" delay={1.2} />
      <FloatingHeart size={12} className="absolute top-1/3 right-[20%] opacity-30" delay={2.1} />

      <SectionTitle eyebrow="Mark Your Calendar" title="Save The Date" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl mx-auto mt-14 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-gold/25 shadow-soft px-6 sm:px-12 py-10 sm:py-14"
      >
        <div className="flex flex-col items-center text-center">
          <span className="font-display text-3xl sm:text-4xl text-charcoal tracking-wide">
            October
          </span>
          <span className="mt-1 font-body text-xs sm:text-sm tracking-widest2 uppercase text-gold-deep">
            Two Thousand Twenty-Six
          </span>
        </div>

        <div className="mt-10 flex items-center justify-between gap-1 sm:gap-3">
          {days.map((day) => {
            const isHighlighted = day === 9;
            return (
              <div
                key={day}
                className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12"
              >
                {isHighlighted ? (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute inset-0 w-full h-full text-gold drop-shadow-[0_4px_12px_rgba(198,161,91,0.55)]"
                    >
                      <path
                        d="M12 21s-7.5-4.6-10.2-9.3C.2 8.7 1.7 5 5.4 4.3 8 3.8 10.3 5 12 7.4 13.7 5 16 3.8 18.6 4.3 22.3 5 23.8 8.7 22.2 11.7 19.5 16.4 12 21 12 21z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="relative z-10 flex items-center justify-center w-full h-full font-display font-semibold text-white text-sm sm:text-lg">
                      {day}
                    </span>
                  </motion.div>
                ) : (
                  <span className="font-body text-sm sm:text-base text-charcoal-soft">
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center font-display text-xl sm:text-2xl text-charcoal"
        >
          Friday, October 9, 2026
        </motion.p>
      </motion.div>
    </section>
  );
}
