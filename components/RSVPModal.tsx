"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, HeartCrack } from "lucide-react";

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Attendance = "yes" | "no" | null;

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [name, setName] = useState("");
    const [attendance, setAttendance] = useState<Attendance>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            const timeout = setTimeout(() => {
                setName("");
                setAttendance(null);
                setSubmitted(false);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handleAttendance = (choice: Attendance) => {
        setAttendance(choice);
        setSubmitted(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="rsvp-modal-title"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-md rounded-[2rem] bg-ivory border border-gold/25 shadow-soft px-6 sm:px-10 py-10 sm:py-12"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close RSVP form"
                            className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full text-charcoal-soft transition-colors duration-300 hover:bg-gold-soft hover:text-gold-deep"
                        >
                            <X size={18} strokeWidth={1.75} />
                        </button>

                        {!submitted ? (
                            <div className="flex flex-col items-center text-center">
                                <h3
                                    id="rsvp-modal-title"
                                    className="font-display italic text-2xl sm:text-3xl text-charcoal"
                                >
                                    We can&rsquo;t wait to see you
                                </h3>

                                <div className="mt-6 w-full text-left">
                                    <label
                                        htmlFor="guest-name"
                                        className="block font-body text-xs tracking-widest2 uppercase text-gold-deep mb-2"
                                    >
                                        Your name
                                    </label>
                                    <input
                                        id="guest-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full rounded-xl border border-gold/30 bg-white/70 px-4 py-3 font-body text-sm text-charcoal placeholder:text-charcoal-faint outline-none transition-colors duration-300 focus:border-gold focus:ring-2 focus:ring-gold/25"
                                    />
                                </div>

                                <span className="my-7 h-px w-16 bg-gold/40" />

                                <p className="font-body text-xs tracking-widest2 uppercase text-gold-deep mb-5">
                                    Will you attend?
                                </p>

                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.button
                                        type="button"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => handleAttendance("yes")}
                                        className="rounded-full bg-gold px-6 py-4 font-body text-sm sm:text-base text-white shadow-gold transition-colors duration-300 hover:bg-gold-deep"
                                    >
                                        Yes, with joy
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => handleAttendance("no")}
                                        className="rounded-full bg-transparent border border-charcoal/20 px-6 py-4 font-body text-sm sm:text-base text-charcoal-soft transition-colors duration-300 hover:border-charcoal/40 hover:text-charcoal"
                                    >
                                        Sadly, no
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center py-6"
                            >
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-soft text-gold-deep mb-5">
                                    {attendance === "yes" ? (
                                        <Sparkles size={24} strokeWidth={1.5} />
                                    ) : (
                                        <HeartCrack size={24} strokeWidth={1.5} />
                                    )}
                                </div>
                                <h3 className="font-display italic text-2xl sm:text-3xl text-charcoal">
                                    {attendance === "yes"
                                        ? "Thank you, we can't wait!"
                                        : "We'll miss you"}
                                </h3>
                                <p className="mt-3 font-body text-sm text-charcoal-soft leading-relaxed">
                                    {name ? `${name}, ` : ""}
                                    {attendance === "yes"
                                        ? "your reply means so much to us. See you at the celebration."
                                        : "thank you for letting us know. You'll be in our hearts on the day."}
                                </p>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-8 rounded-full border border-gold/40 px-8 py-3 font-body text-sm text-gold-deep transition-colors duration-300 hover:bg-gold-soft"
                                >
                                    Close
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
