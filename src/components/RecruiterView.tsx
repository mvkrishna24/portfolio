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

        {/* ── Header ── */}
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-mist">{profile.roles.join(" · ")}</p>
          <p className="mt-1 text-sm text-mist">{profile.location}</p>

          <p className="mt-4 max-w-xl leading-relaxed text-mist">
            Final-year B.Tech CSE (AI/ML) student building production-grade backend systems and AI
            automation workflows. Strongest projects include MetroNexis, a Spring Boot + React Native
            metro navigation platform; a Redis-backed Distributed URL Shortener; and LeadOps AI CRM,
            an n8n + Gemini automation pipeline.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className="text-signal hover:underline">
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-signal hover:underline">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-signal hover:underline">
              LinkedIn ↗
            </a>
            <a href={profile.resume} className="text-signal hover:underline">
              Resume (PDF) ↓
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

        {/* ── Technical Skills ── */}
        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Technical Skills</h2>
          <div className="space-y-3">
            {stack.map((g) => (
              <div key={g.layer} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <span className="w-36 shrink-0 text-sm font-medium">{g.layer}</span>
                <span className="text-sm text-mist">{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
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
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.recruiterSummary}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] tracking-wider text-mist/70 uppercase">{m.label}</dt>
                      <dd className="mt-0.5 text-sm font-semibold" style={{ color: p.accent }}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 font-mono text-xs text-mist/70">{p.stack.join(" · ")}</p>
                <div className="mt-3 flex gap-4 text-sm print:hidden">
                  <Link href={`/projects/${p.slug}`} className="text-signal hover:underline">
                    Full case study
                  </Link>
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-signal hover:underline">
                    GitHub ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Experience</h2>
          <article className="hairline rounded-xl p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">Freelance Full-Stack Developer &amp; AI Automation Consultant</h3>
              <span className="font-mono text-xs text-mist">Jan 2025 – Present</span>
            </div>
            <p className="mt-0.5 text-sm text-mist">Independent · Remote, India</p>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-mist marker:text-signal">
              <li>
                Building production websites and automation systems for real business clients using Next.js,
                Tailwind CSS, GSAP, Clerk, Turso, Vercel, n8n, and Gemini API.
              </li>
              <li>
                Deployed LeadOps AI CRM workflow for a local business use case, automating lead qualification,
                AI outreach, CRM logging, and hot-lead alerts.
              </li>
              <li>
                Delivered and iterated client-facing projects across architecture, hospitality, and education verticals.
              </li>
            </ul>
          </article>
        </section>

        {/* ── Client Work & Freelancing ── */}
        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Client Work &amp; Freelancing</h2>
          <article className="hairline rounded-xl p-5">
            <p className="text-lg font-semibold leading-snug">
              Real Clients. Real Deliverables. Real Deployments.
            </p>
            <p className="mt-1 mb-4 text-sm leading-relaxed text-mist">
              Building production websites, business automation systems, and engineering solutions for paying clients.
            </p>

            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-semibold">
                Freelance Full-Stack Developer &amp; AI Automation Consultant
              </span>
              <span className="font-mono text-xs text-mist">Jan 2025 – Present</span>
            </div>
            <p className="mb-4 text-sm text-mist">
              Delivered production-ready software and automation solutions for real businesses across
              architecture, hospitality, and education sectors.
            </p>

            <ul className="mb-5 list-inside list-disc space-y-1.5 text-sm text-mist marker:text-signal">
              <li>
                Built and shipped client websites using Next.js, Tailwind CSS, GSAP, TypeScript, Clerk,
                Turso, and Vercel.
              </li>
              <li>
                Worked directly with business owners to gather requirements, design solutions, implement
                features, and deploy production systems.
              </li>
              <li>
                Built AI automation workflows using n8n, Gemini API, Google Workspace integrations,
                webhooks, and CRM automations.
              </li>
              <li>
                Delivered LeadOps AI CRM workflow for a real business use case, automating lead
                qualification, AI-powered outreach, CRM logging, and hot-lead notifications.
              </li>
              <li>
                Managed projects independently from planning and development through deployment and
                client handoff.
              </li>
            </ul>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  { label: "Client Projects Delivered", value: "5+" },
                  { label: "Production Deployments", value: "Multiple" },
                  { label: "Industries Served", value: "Architecture, Hospitality, Education" },
                  { label: "Automation Workflows Built", value: "LeadOps + Client Automations" },
                ] as const
              ).map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[10px] tracking-wider text-mist/70 uppercase">
                    {m.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-signal">{m.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>

        {/* ── Achievements ── */}
        <section className="mb-12">
          <h2 className="mb-4 font-mono text-xs tracking-[0.25em] text-mist uppercase">Achievements</h2>
          <ul className="space-y-2 text-sm text-mist">
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              Won university startup pitch competition with MetroNexis; judges recommended patent filing and
              identified the project as fundable.
            </li>
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              Built MetroNexis backend with 152+ automated tests, 18 Flyway migrations, Redis caching, JWT auth,
              QR ticketing, and Railway deployment.
            </li>
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              Built URL shortener sustaining 100+ warm-cache redirects/sec at 4.13ms p99 latency with 99.98%
              Redis cache hit rate.
            </li>
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              Built LeadOps AI CRM delivering Gemini-powered lead response in under 10 seconds end-to-end.
            </li>
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              297 LeetCode submissions with 3 badges.
            </li>
            <li className="flex gap-3">
              <span className="text-signal shrink-0">▸</span>
              Organised AI &amp; Web Development workshops for 50+ students covering React.js, Spring Boot, and
              Generative AI tooling.
            </li>
          </ul>
        </section>

        <footer className="hairline border-x-0 border-b-0 pt-6 text-sm text-mist print:hidden">
          Prefer the full experience? Switch to Creative Mode with the toggle above.
        </footer>
      </div>
    </div>
  );
}
