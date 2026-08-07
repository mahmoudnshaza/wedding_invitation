"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface WeddingEnvelopeProps {
  isOpen: boolean;
  disabled: boolean;
  onClick: () => void;
  onOpened: () => void;
  reducedMotion: boolean;
}

/**
 * A hand-styled luxury envelope (CSS clip-path folds + a 3D-rotated flap)
 * with a wax seal that "cracks" open on click, revealing the invitation
 * card sliding out from beneath.
 */
export default function WeddingEnvelope({
  isOpen,
  disabled,
  onClick,
  onOpened,
  reducedMotion,
}: WeddingEnvelopeProps) {
  const hasFiredOpened = useRef(false);

  const handleActivate = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <div style={{ perspective: 1400 }} className="select-none">
      <motion.div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Open your wedding invitation"
        aria-disabled={disabled}
        onClick={handleActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
          }
        }}
        animate={reducedMotion || isOpen ? {} : { y: [0, -10, 0] }}
        transition={
          reducedMotion || isOpen
            ? undefined
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        className={`relative w-[260px] h-[178px] sm:w-[340px] sm:h-[228px] outline-none ${
          disabled ? "cursor-default pointer-events-none" : "cursor-pointer"
        }`}
      >
        {/* Envelope body */}
        <div className="absolute inset-0 rounded-md bg-champagne border border-gold/40 shadow-gold" />

        {/* Side folds */}
        <div
          className="absolute inset-0 bg-gold/5"
          style={{ clipPath: "polygon(0% 0%, 0% 100%, 50% 46%)" }}
        />
        <div
          className="absolute inset-0 bg-gold/5"
          style={{ clipPath: "polygon(100% 0%, 100% 100%, 50% 46%)" }}
        />
        {/* Bottom pocket fold */}
        <div
          className="absolute inset-0 bg-gold/15"
          style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 46%)" }}
        />

        {/* Invitation card, slides up from beneath the flap when opened */}
        <motion.div
          className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[72%] h-[62%] rounded-[2px] bg-white shadow-soft border border-gold/25"
          style={{ zIndex: 20 }}
          initial={false}
          animate={
            isOpen
              ? { y: reducedMotion ? -30 : -74, opacity: 1 }
              : { y: 0, opacity: 0 }
          }
          transition={{
            duration: reducedMotion ? 0.4 : 0.9,
            delay: reducedMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
            <span className="font-display italic text-lg sm:text-xl text-gold-deep">
              M &amp; S
            </span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </motion.div>

        {/* Top flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[54%]"
          style={{
            zIndex: 30,
            transformOrigin: "top",
            backfaceVisibility: "hidden",
          }}
          initial={false}
          animate={{ rotateX: isOpen ? (reducedMotion ? -90 : -172) : 0 }}
          transition={{
            duration: reducedMotion ? 0.5 : 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => {
            if (isOpen && !hasFiredOpened.current) {
              hasFiredOpened.current = true;
              onOpened();
            }
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-gold-light to-gold border-b border-gold-deep/40"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
          />
          {!reducedMotion && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent bg-[length:200%_100%] animate-shimmer"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
            />
          )}

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 bottom-[6%] -translate-x-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #E4CE9C, #9C7C3C 75%)",
              boxShadow: "0 4px 14px rgba(122,95,44,0.45)",
            }}
            initial={false}
            animate={
              isOpen
                ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: reducedMotion ? 0.3 : 0.5, ease: "easeIn" }}
          >
            <span className="font-display italic text-white text-xs sm:text-sm tracking-wide">
              M&amp;S
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
