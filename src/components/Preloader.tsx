"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useAppStore } from "@/lib/store";

const BOOT_LINES = [
  "init vamshi.os",
  "loading backend modules — java, spring boot",
  "connecting redis ▸ postgresql",
  "spawning ai workflows",
  "render: engineering command center",
];

/**
 * Terminal-style boot sequence. Plays once per load (~1.4s),
 * skipped entirely for reduced-motion users.
 */
export default function Preloader() {
  const finishIntro = useAppStore((s) => s.finishIntro);
  const root = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // skip the boot sequence entirely, off the synchronous effect path
      const id = requestAnimationFrame(() => {
        finishIntro();
        setGone(true);
      });
      return () => cancelAnimationFrame(id);
    }

    const lineTimer = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          return n;
        }
        return n + 1;
      });
    }, 130);

    // finishIntro fires as the curtain starts moving so the hero can set up
    // its animation states while still covered — the reveal overlaps the exit
    const exit = gsap.timeline({ delay: 0.8, onComplete: () => setGone(true) });
    exit
      .to("[data-boot-line]", { opacity: 0, y: -8, stagger: 0.03, duration: 0.22, ease: "power2.in" })
      .add(() => finishIntro())
      .to(root.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.02");

    return () => {
      clearInterval(lineTimer);
      exit.kill();
    };
  }, [finishIntro]);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-100 flex items-center justify-center bg-void"
    >
      <div className="w-72 font-mono text-xs text-mist sm:w-96">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <p key={line} data-boot-line className="mb-2 flex items-center gap-2">
            <span className="text-signal">▸</span>
            {line}
            {i === visibleLines - 1 && <span className="inline-block h-3 w-1.5 animate-pulse bg-signal" />}
          </p>
        ))}
      </div>
    </div>
  );
}
