"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP, revealOnScroll } from "@/lib/gsap";
import type { Project } from "@/lib/projects";
import MetroViz from "@/components/visuals/MetroViz";
import FlowViz from "@/components/visuals/FlowViz";
import WorkflowViz from "@/components/visuals/WorkflowViz";

const vizMap = {
  metro: MetroViz,
  flow: FlowViz,
  workflow: WorkflowViz,
} as const;

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const Viz = vizMap[project.viz];

  useGSAP(() => revealOnScroll(root.current), { scope: root });

  return (
    <div ref={root} className="mx-auto max-w-4xl px-6 pt-28 pb-24">
      <nav data-reveal className="mb-12 flex items-center justify-between">
        <Link href="/#projects" className="font-mono text-xs tracking-widest text-mist transition-colors hover:text-white">
          ← ALL SYSTEMS
        </Link>
        <span className="font-mono text-xs tracking-widest text-mist">{project.index} / 03</span>
      </nav>

      <header data-reveal className="mb-14">
        <p className="mb-3 font-mono text-xs tracking-[0.3em]" style={{ color: project.accent }}>
          {project.category.toUpperCase()}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{project.name}</h1>
        <p className="mt-3 text-xl text-mist">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="glass rounded-full px-5 py-2.5 text-sm">
              Live Demo ↗
            </a>
          )}
        </div>
      </header>

      <div data-reveal className="hairline mb-16 rounded-2xl bg-panel/50 p-4 sm:p-6">
        <Viz />
      </div>

      <dl data-reveal className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-panel p-5">
            <dt className="font-mono text-[10px] tracking-wider text-mist uppercase">{m.label}</dt>
            <dd className="mt-1 text-2xl font-semibold" style={{ color: project.accent }}>
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <Section title="The Problem">
        <p className="text-lg leading-relaxed text-mist">{project.problem}</p>
      </Section>

      <Section title="Architecture & System Design">
        <ol className="space-y-4">
          {project.architecture.map((a, i) => (
            <li key={a} className="flex gap-4">
              <span className="font-mono text-sm" style={{ color: project.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-mist">{a}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Engineering Decisions">
        <div className="space-y-4">
          {project.decisions.map((d) => (
            <article key={d.title} className="hairline rounded-2xl bg-panel/50 p-6">
              <h3 className="mb-2 font-medium">{d.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{d.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Tech Stack">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Lessons Learned">
        <ul className="space-y-3">
          {project.lessons.map((l) => (
            <li key={l} className="flex gap-3 leading-relaxed text-mist">
              <span style={{ color: project.accent }}>▸</span>
              {l}
            </li>
          ))}
        </ul>
      </Section>

      <div data-reveal className="hairline mt-20 flex items-center justify-between rounded-2xl bg-panel/50 p-6">
        <p className="text-sm text-mist">Want the full system walkthrough?</p>
        <a
          href="mailto:marthavamshikrishna1024@gmail.com"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="mb-16">
      <h2 className="mb-6 font-mono text-xs tracking-[0.3em] text-mist uppercase">▸ {title}</h2>
      {children}
    </section>
  );
}
