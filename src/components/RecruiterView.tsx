"use client";

import Link from "next/link";
import { profile, stack } from "@/lib/profile";
import { projects } from "@/lib/projects";
import ModeToggle from "./ModeToggle";

/**
 * Recruiter mode: zero animation, zero WebGL, everything scannable
 * in under 30 seconds. Print-friendly by design.
 */
export default function RecruiterView() {
  return (
    <div className="min-h-svh bg-void">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 flex items-center justify-between print:hidden">
          <p className="font-mono text-xs tracking-widest text-mist">RECRUITER MODE</p>
          <ModeToggle />
        </div>

        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-mist">{profile.roles.join(" · ")}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-mist">{profile.subheadline}</p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className="text-signal hover:underline">
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-signal hover:underline">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-signal hover:underline">
              LinkedIn
            </a>
            <a href={profile.resume} className="text-signal hover:underline">
              Resume (PDF)
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.seeking.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Technical Skills</h2>
          <div className="space-y-3">
            {stack.map((g) => (
              <div key={g.layer} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-32 shrink-0 text-sm font-medium">{g.layer}</span>
                <span className="text-sm text-mist">{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Projects</h2>
          <div className="space-y-8">
            {projects.map((p) => (
              <article key={p.slug} className="hairline rounded-xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {p.name} <span className="font-normal text-mist">— {p.tagline}</span>
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.summary}</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-mist marker:text-signal">
                  {p.architecture.slice(0, 3).map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="mt-3 font-mono text-xs text-mist/80">{p.stack.join(" · ")}</p>
                <div className="mt-3 flex gap-4 text-sm print:hidden">
                  <Link href={`/projects/${p.slug}`} className="text-signal hover:underline">
                    Full case study
                  </Link>
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-signal hover:underline">
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="hairline border-x-0 border-b-0 pt-6 text-sm text-mist print:hidden">
          Prefer the full experience? Switch to Creative Mode with the toggle above.
        </footer>
      </div>
    </div>
  );
}
