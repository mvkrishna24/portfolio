"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useAppStore } from "@/lib/store";
import { profile } from "@/lib/profile";
import { hasPerformantWebGL } from "@/lib/webgl";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const introDone = useAppStore((s) => s.introDone);
  const section = useRef<HTMLElement>(null);
  const [sceneActive, setSceneActive] = useState(true);
  const [webglOk, setWebglOk] = useState(false);

  // Probe for hardware-accelerated WebGL off the critical path; software
  // renderers get the static gradient backdrop instead of the 3D scene.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!prefersReducedMotion()) setWebglOk(hasPerformantWebGL());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // WebGL mounts only after the intro so it never competes with first paint;
  // the frameloop pauses whenever the hero scrolls out of view.
  useEffect(() => {
    if (!introDone) return;
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [introDone]);

  useGSAP(
    () => {
      // content is visible in SSR for SEO/LCP; the preloader covers the
      // first paint, so initializing animation states here never flashes
      if (!introDone || prefersReducedMotion()) return;

      const split = SplitText.create("[data-hero-title]", {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(split.lines, { yPercent: 110, duration: 0.95, stagger: 0.08 })
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          "-=0.6"
        );

      return () => split.revert();
    },
    { scope: section, dependencies: [introDone] }
  );

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* 3D layer — dimmed on small screens so the headline stays legible */}
      <div className="absolute inset-0 z-0 opacity-60 sm:opacity-100">
        {introDone && webglOk && <HeroScene active={sceneActive} />}
        {/* static backdrop — always present, sole visual on non-accelerated devices */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 65% 42%, rgba(167,139,250,0.10), transparent 70%), radial-gradient(ellipse 40% 35% at 30% 60%, rgba(103,232,249,0.06), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
        <div className="absolute inset-0 bg-void/40 sm:bg-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-24 sm:pt-24">
        <p data-hero-fade className="mb-6 font-mono text-xs tracking-[0.3em] text-signal">
          ▸ SYSTEM ONLINE — PORTFOLIO v2.0
        </p>

        <h1
          data-hero-title
          className="split-mask max-w-4xl text-5xl leading-[1.04] font-semibold tracking-tight sm:text-7xl"
        >
          {profile.shortName}.
          <br />
          <span className="text-gradient">Backend Engineer.</span>
          <br />
          Java &amp; AI Automation.
        </h1>

        <p data-hero-fade className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
          Building production-grade backend systems, AI-powered workflows, and
          real-world software products.
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/#projects"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            View Projects
          </Link>
          <a
            href={profile.resume}
            className="glass rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-signal/40"
          >
            Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-signal/40"
          >
            GitHub
          </a>
          <Link
            href="/#contact"
            className="px-4 py-3 text-sm text-mist transition-colors hover:text-white"
          >
            Contact →
          </Link>
        </div>

        <div data-hero-fade className="mt-16 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.2em] text-mist uppercase sm:mt-20">
          <span>Java / Spring Boot</span>
          <span>PostgreSQL / Redis</span>
          <span>n8n / OpenAI</span>
          <span>React / Next.js</span>
          <span>Docker</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-mist/80 sm:block">
        SCROLL ▾
      </div>
    </section>
  );
}
