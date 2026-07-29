"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

interface PaletteColor {
    name: string;
    hex: string;
}

const palette: PaletteColor[] = [
    { name: "Olive", hex: "#6E6A3C" },
    { name: "Sage", hex: "#A7AE8C" },
    { name: "Pistachio", hex: "#C7D2A9" },
    { name: "Leaf", hex: "#7C8B57" },
    { name: "Blush Sage", hex: "#CBD2BC" },
    { name: "Mulberry", hex: "#5C2A3B" },
    { name: "Dusty Rose", hex: "#C79392" },
    { name: "Berry", hex: "#7C2F44" },
    { name: "Pale Rose", hex: "#EAD4CF" },
    { name: "Dusty Pink", hex: "#D9AEA6" },
    { name: "Peony", hex: "#E8BDB5" },
    { name: "Mauve", hex: "#A67F87" },
    { name: "Espresso", hex: "#4A342A" },
    { name: "Chocolate", hex: "#6B4328" },
    { name: "Deep Taupe", hex: "#7C6455" },
    { name: "Mocha", hex: "#8D715C" },
    { name: "Sand", hex: "#DAC6A6" },
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
            className="relative w-full bg-ivory py-24 sm:py-32 px-6"
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
                className="mt-14 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5"
            >
                {palette.map(({ name, hex }) => (
                    <motion.div
                        key={name}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.04 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-3 rounded-2xl bg-white/70 border border-gold/15 px-3 py-5 shadow-soft transition-shadow duration-300 hover:shadow-gold cursor-default"
                    >
                        <span
                            className="block w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-1 ring-black/5 shadow-inner"
                            style={{
                                backgroundColor: hex,
                                boxShadow: isLight(hex)
                                    ? "inset 0 0 0 1px rgba(0,0,0,0.06)"
                                    : "inset 0 0 0 1px rgba(255,255,255,0.15)",
                            }}
                            aria-hidden="true"
                        />
                        <span className="font-body text-[11px] sm:text-xs text-center tracking-wide text-charcoal-soft leading-tight">
                            {name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
