"use client";

const TRACK =
  "JAVA · SPRING BOOT · POSTGRESQL · REDIS · DOCKER · N8N · GEMINI · REACT NATIVE · NEXT.JS · TYPESCRIPT · GITHUB ACTIONS · ";

/**
 * Infinite CSS-animated tech marquee. Two identical spans side-by-side;
 * the animation moves to -50% (one span width), then resets seamlessly.
 * GPU-composited via will-change: transform. Paused on prefers-reduced-motion.
 */
export default function TechMarquee() {
  return (
    <div
      className="relative overflow-hidden py-6 select-none"
      aria-hidden="true"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, var(--color-void), transparent)" }}
      />
      {/* Right edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, var(--color-void), transparent)" }}
      />

      <div className="tech-marquee-track flex whitespace-nowrap">
        <span className="font-mono text-2xl font-medium uppercase tracking-[0.2em] text-white/[0.13]">
          {TRACK}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-2xl font-medium uppercase tracking-[0.2em] text-white/[0.13]"
        >
          {TRACK}
        </span>
      </div>
    </div>
  );
}
