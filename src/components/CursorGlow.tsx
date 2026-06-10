"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Ambient light that follows the pointer — pure transform updates via
 * gsap.quickTo, fine-pointer devices only.
 */
export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(glow.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(glow.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={glow}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(103,232,249,0.07) 0%, rgba(167,139,250,0.04) 40%, transparent 70%)",
      }}
    />
  );
}
