"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const lines = [
  "I don't build demo projects.",
  "I build systems that can be tested,",
  "deployed, measured, and explained.",
];

/**
 * Full-width manifesto statement. Each line slides up from behind a clip
 * mask on scroll. On reduced-motion all lines appear immediately.
 */
export default function Manifesto() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const els = section.current?.querySelectorAll<HTMLElement>("[data-manifesto-line]");
      if (!els?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, yPercent: 0 });
        return;
      }

      gsap.from(els, {
        yPercent: 100,
        opacity: 0,
        duration: 1.05,
        stagger: 0.13,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
        },
      });
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      {/* Faint accent line — left rail */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden h-20 w-px -translate-y-1/2 lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(103,232,249,0.3), transparent)",
        }}
      />

      <p className="mb-8 font-mono text-xs tracking-[0.3em] text-signal">
        ▸ ENGINEERING PHILOSOPHY
      </p>

      <div className="space-y-3 overflow-hidden lg:pl-8">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <p
              data-manifesto-line
              className={`text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${
                i === lines.length - 1 ? "text-gradient" : "text-white"
              }`}
            >
              {line}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
