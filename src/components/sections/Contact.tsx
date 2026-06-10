"use client";

import { useRef } from "react";
import { useGSAP, revealOnScroll } from "@/lib/gsap";
import { profile } from "@/lib/profile";

export default function Contact() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => revealOnScroll(section.current), { scope: section });

  return (
    <section ref={section} id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <div
        data-reveal
        className="hairline relative overflow-hidden rounded-3xl bg-panel/60 px-6 py-16 text-center sm:px-12 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(103,232,249,0.08), transparent 70%)",
          }}
        />

        <p className="relative mb-4 font-mono text-xs tracking-[0.3em] text-signal">
          04 ▸ OPEN CHANNEL
        </p>
        <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s build something{" "}
          <span className="text-gradient">production-grade</span>.
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-mist">
          Open to software engineering internships, backend roles, AI automation
          work, and startup engineering opportunities. Direct line, no contact
          forms.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Email
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-full px-6 py-3 text-sm transition-colors hover:border-signal/40"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-full px-6 py-3 text-sm transition-colors hover:border-signal/40"
          >
            LinkedIn
          </a>
          <a
            href={profile.resume}
            className="glass rounded-full px-6 py-3 text-sm transition-colors hover:border-signal/40"
          >
            Resume
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-full px-6 py-3 text-sm transition-colors hover:border-signal/40"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
