import { CornerOrnament } from "./Ornaments";

/**
 * A fixed, viewport-level decorative frame with corner flourishes —
 * gives the whole page the feel of a bordered luxury invitation card.
 * Purely decorative: click-through and stays put while sections scroll beneath it.
 */
export default function PageFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      <div className="absolute inset-[8px] sm:inset-3 md:inset-5 border border-gold/25" />
      <div className="absolute inset-[13px] sm:inset-5 md:inset-7 border border-gold/10" />

      <CornerOrnament className="absolute top-1 left-1 sm:top-2 sm:left-2 md:top-4 md:left-4" />
      <CornerOrnament className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 rotate-90" />
      <CornerOrnament className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 rotate-180" />
      <CornerOrnament className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 md:bottom-4 md:left-4 -rotate-90" />
    </div>
  );
}
