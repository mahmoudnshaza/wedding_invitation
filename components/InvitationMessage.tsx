"use client";

import { motion } from "framer-motion";
import { DividerFlourish } from "./Ornaments";

export default function InvitationMessage() {
  return (
    <section
      id="message"
      className="relative w-full bg-champagne pattern-scallop py-24 sm:py-32 px-6"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-4xl sm:text-5xl text-charcoal"
        >
          Dear Guests!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DividerFlourish className="mt-5 mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 font-body text-base sm:text-lg leading-loose text-charcoal-soft"
        >
          <p>Something wonderful is about to happen in our lives.</p>
          <p>
            We would be so happy to share this special day with the people
            who matter most to us — our family and dearest friends.
          </p>
          <p>Please join us as we celebrate the beginning of our forever.</p>
        </motion.div>
      </div>
    </section>
  );
}
