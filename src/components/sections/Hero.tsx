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

const BG_TEXT =
  "BACKEND SYSTEMS · AI AUTOMATION · JAVA SPRING BOOT · PRODUCTION APIs · ";

const hudCards = [
  { label: "Redis Cache", value: "99.98%", unit: "Hit Rate", color: "#a78bfa", top: "22%", right: "3.5%" },
  { label: "Metro Graph",  value: "290",    unit: "Stations",  color: "#67e8f9", top: "40%", right: "1.5%" },
  { label: "LeadOps",      value: "<10s",   unit: "Response",  color: "#34d399", top: "58%", right: "4.5%" },
  { label: "Spring Boot",  value: "APIs",   unit: "Production",color: "#f4f4f6", top: "74%", right: "2%" },
] as const;

export default function Hero() {
  const introDone = useAppStore((s) => s.introDone);
  const section = useRef<HTMLElement>(null);
  const [sceneActive, setSceneActive] = useState(true);
  const [webglOk, setWebglOk] = useState(false);

  // Probe for hardware-accelerated WebGL off the critical path.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!prefersReducedMotion()) setWebglOk(hasPerformantWebGL());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // WebGL mounts after the intro so it never competes with first paint;
  // the frameloop pauses when the hero scrolls out of view.
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
      if (!introDone || prefersReducedMotion()) return;

      // ── Title reveal ─────────────────────────────────────────
      const split = SplitText.create("[data-hero-title]", {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(split.lines, { yPercent: 110, duration: 0.95, stagger: 0.08 })
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          "-=0.6"
        );

      // ── HUD cards fade-in + continuous float ──────────────────
      // Only animate if the xl breakpoint is active (cards are hidden below xl)
      const hudEls = gsap.utils.toArray<HTMLElement>("[data-hud-card]", section.current ?? undefined);
      if (hudEls.length) {
        // Initial reveal staggered after the main hero anim
        gsap.fromTo(
          hudEls,
          { opacity: 0, y: 14 },
          {
            opacity: 0.72,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            delay: 1.1,
            onComplete() {
              // Start the infinite float loop once visible
              hudEls.forEach((card, i) => {
                gsap.to(card, {
                  y: -11 + (i % 2) * 5,
                  duration: 2.6 + i * 0.45,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: i * 0.55,
                });
              });
            },
          }
        );
      }

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
      {/* ── Background typography crawl ───────────────────────
          Large, low-opacity horizontal ticker. GPU-composited via CSS
          animation (will-change: transform). Paused on prefers-reduced-motion.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] select-none overflow-hidden"
      >
        <div
          className="hero-bg-text absolute top-[37%] flex whitespace-nowrap font-bold uppercase text-white"
          style={{
            fontSize: "clamp(3.5rem, 8.5vw, 8rem)",
            letterSpacing: "0.11em",
            opacity: 0.033,
          }}
        >
          <span>{BG_TEXT}</span>
          <span aria-hidden="true">{BG_TEXT}</span>
        </div>
      </div>

      {/* ── 3D / backdrop layer ───────────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-60 sm:opacity-100">
        {introDone && webglOk && <HeroScene active={sceneActive} />}
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

      {/* ── Floating HUD cards — xl screens only ─────────────────
          Positioned in the right-hand "empty" zone of the hero.
          Each card fades in after the headline, then floats indefinitely.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] hidden xl:block"
      >
        {hudCards.map((card) => (
          <div
            key={card.label}
            data-hud-card
            className="glass absolute rounded-xl px-4 py-3 opacity-0"
            style={{ top: card.top, right: card.right, minWidth: "138px" }}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-mist/80 uppercase">
              {card.label}
            </p>
            <p
              className="mt-0.5 font-mono text-xl font-semibold tabular-nums"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-mist/50 uppercase">
              {card.unit}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
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
          I build production-grade backend systems, offline-first mobile
          platforms, and AI automation workflows with Java, Spring Boot,
          PostgreSQL, Redis, Docker, and n8n.
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
          <span>n8n / Gemini</span>
          <span>React Native / Next.js</span>
          <span>Docker / CI/CD</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-mist/80 sm:block">
        SCROLL ▾
      </div>
    </section>
  );
}
