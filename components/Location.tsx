"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function Location() {
  return (
    <section
      id="location"
      className="relative w-full bg-sand-mist pattern-dots py-24 sm:py-32 px-6"
    >
      <SectionTitle eyebrow="White Garden" title="Location" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 max-w-xl mx-auto text-center"
      >
        <p className="font-display text-2xl sm:text-3xl text-charcoal">
          Dar Al Quwat Al Jawiya
        </p>
        <p className="mt-1 font-body text-sm sm:text-base tracking-widest2 uppercase text-gold-deep">
          Hayah Hall
        </p>
        <p className="mt-4 font-body text-sm sm:text-base text-charcoal-soft leading-relaxed">
          Salah Salem Road,
          <br />
          Cairo, Egypt
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12 max-w-3xl mx-auto"
      >
        <div className="relative w-full h-72 sm:h-96 md:h-[26rem] rounded-[2rem] overflow-hidden shadow-soft ring-1 ring-gold/20">
          <Image
            src="/hall.jpg"
            alt="Hayah Hall - White Garden"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display italic text-white text-base sm:text-lg tracking-wide text-center px-4">
            Hayah Hall &mdash; White Garden
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-10 flex justify-center"
      >
        <Link
          href="https://maps.app.goo.gl/vtgcCLPnV52SBFAcA?g_st=aw"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-body text-sm sm:text-base tracking-wide text-white shadow-gold transition-all duration-300 hover:bg-gold-deep hover:shadow-lg"
        >
          <MapPin size={18} strokeWidth={1.75} className="transition-transform duration-300 group-hover:scale-110" />
          View on Google Maps
        </Link>
      </motion.div>
    </section>
  );
}
