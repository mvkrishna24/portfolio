"use client";

import { useRef } from "react";
import { useGSAP, revealOnScroll } from "@/lib/gsap";
import { stack } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => revealOnScroll(section.current), { scope: section });

  return (
    <section ref={section} id="stack" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        index="02"
        label="Capability Matrix"
        title="One stack, from backend systems to AI automation."
        subtitle="A practical engineering toolkit focused on APIs, data, caching, automation, and production delivery."
      />

      <div className="hairline divide-y divide-line overflow-hidden rounded-2xl bg-panel/40">
        {stack.map((group) => (
          <div
            key={group.layer}
            data-reveal
            className="group grid gap-4 p-6 transition-colors duration-300 hover:bg-faint sm:grid-cols-[160px_1fr] sm:p-8 lg:grid-cols-[200px_1fr_280px]"
          >
            <h3 className="font-mono text-sm tracking-[0.2em] text-signal uppercase">
              {group.layer}
            </h3>
            <div className="flex flex-wrap content-start gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="hairline rounded-lg bg-void px-3 py-1.5 text-sm text-white/90"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="hidden text-sm leading-relaxed text-mist lg:block">
              {group.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
