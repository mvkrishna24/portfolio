"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useAppStore } from "@/lib/store";
import { profile } from "@/lib/profile";
import ModeToggle from "./ModeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const introDone = useAppStore((s) => s.introDone);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!introDone || prefersReducedMotion()) return;
    gsap.fromTo(
      nav.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, [introDone]);

  return (
    <header ref={nav} className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 sm:px-6"
      >
        <Link
          href="/"
          className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-widest"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
          VK<span className="text-mist">.OS</span>
        </Link>

        <div className="glass hidden items-center gap-1 rounded-full p-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-mist transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={profile.resume}
            className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
          >
            Resume
          </a>
        </div>

        <ModeToggle />
      </nav>
    </header>
  );
}
