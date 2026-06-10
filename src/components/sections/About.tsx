"use client";

import { useRef } from "react";
import { useGSAP, revealOnScroll } from "@/lib/gsap";
import { principles, profile } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => revealOnScroll(section.current), { scope: section });

  return (
    <section ref={section} id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        index="01"
        label="Operating Principles"
        title="I build software the way production systems demand it."
      />

      <div className="grid gap-12 lg:grid-cols-5">
        <div data-reveal className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-mist">
            Not a tutorial developer. I design data models before screens, plan
            for failure before launch, and treat caching, rate limiting, and
            offline behavior as table stakes — because that&apos;s what shipping
            real software means.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-mist">
            Currently seeking{" "}
            <span className="text-white">{profile.seeking[0].toLowerCase()}</span>{" "}
            and backend / AI automation roles where systems thinking matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.seeking.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {principles.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              className="hairline group rounded-2xl bg-panel/60 p-6 transition-colors duration-300 hover:border-signal/30"
            >
              <p className="mb-3 font-mono text-[11px] tracking-[0.25em] text-signal/80">
                P-{String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-lg font-medium">{p.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
