"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

interface PaletteColor {
    name: string;
    hex: string;
}

const palette: PaletteColor[] = [
    { name: "Sand", hex: "#DAC6A6" },
    { name: "Dusty Rose", hex: "#C79392" },
    { name: "Berry", hex: "#7C2F44" },
    { name: "Chocolate", hex: "#6B4328" },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.94 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Rough luminance check so the color name stays legible if ever placed on the swatch itself. */
function isLight(hex: string) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
}

export default function DressCode() {
    return (
        <section
            id="dress-code"
            className="relative w-full bg-blush pattern-herringbone py-24 sm:py-32 px-6"
        >
            <SectionTitle eyebrow="Garden Elegance" title="Dress Code" />

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-xl mx-auto text-center font-body text-sm sm:text-base leading-relaxed text-charcoal-soft"
            >
                We&rsquo;d love it if you matched our soft, romantic palette
                <br className="hidden sm:block" /> &mdash; anything in these warm,
                earthy tones will look
                <br className="hidden sm:block" /> beautiful in our garden setting.
            </motion.p>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-14 max-w-md sm:max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
            >
                {palette.map(({ name, hex }) => (
                    <motion.div
                        key={name}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.04 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-4 rounded-3xl bg-white/70 border border-gold/15 px-4 py-8 shadow-soft transition-shadow duration-300 hover:shadow-gold cursor-default"
                    >
                        <span
                            className="block w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ring-1 ring-gold/20 shadow-inner"
                            style={{
                                backgroundColor: hex,
                                boxShadow: isLight(hex)
                                    ? "inset 0 0 0 1px rgba(0,0,0,0.06)"
                                    : "inset 0 0 0 1px rgba(255,255,255,0.15)",
                            }}
                            aria-hidden="true"
                        />
                        <span className="flex flex-col items-center gap-1">
                            <span className="font-display text-sm sm:text-base text-center tracking-wide text-charcoal">
                                {name}
                            </span>
                            <span className="font-body text-[10px] tracking-widest2 uppercase text-charcoal-faint">
                                {hex}
                            </span>
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
