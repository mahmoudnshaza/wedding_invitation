"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import SectionTitle from "./SectionTitle";
import RSVPModal from "./RSVPModal";

export default function RSVP() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section
            id="rsvp"
            className="relative w-full bg-ivory py-24 sm:py-32 px-6"
        >
            <SectionTitle eyebrow="Kindly Reply" title="RSVP" />

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-md mx-auto text-center font-body text-sm sm:text-base leading-relaxed text-charcoal-soft"
            >
                We&rsquo;d be so happy to have you with us on our big day.
                <br className="hidden sm:block" /> Please let us know if you can make
                it.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-10 flex justify-center"
            >
                <motion.button
                    type="button"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setIsModalOpen(true)}
                    className="group inline-flex items-center gap-2 rounded-full bg-gold px-9 py-4 font-body text-sm sm:text-base tracking-wide text-white shadow-gold transition-colors duration-300 hover:bg-gold-deep"
                >
                    <Mail
                        size={18}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                    Fill The Form
                </motion.button>
            </motion.div>

            <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
