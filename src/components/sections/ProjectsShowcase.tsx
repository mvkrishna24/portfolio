"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP, revealOnScroll } from "@/lib/gsap";
import { projects, type Project } from "@/lib/projects";
import SectionHeading from "./SectionHeading";
import MetroViz from "@/components/visuals/MetroViz";
import FlowViz from "@/components/visuals/FlowViz";
import WorkflowViz from "@/components/visuals/WorkflowViz";

const vizMap = {
  metro: MetroViz,
  flow: FlowViz,
  workflow: WorkflowViz,
} as const;

function ProjectPanel({ project, flip }: { project: Project; flip: boolean }) {
  const Viz = vizMap[project.viz];

  return (
    <article
      data-reveal
      className="hairline grid items-center gap-8 overflow-hidden rounded-3xl bg-panel/50 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14"
    >
      <div className={flip ? "lg:order-2" : undefined}>
        <p className="mb-3 font-mono text-xs tracking-[0.3em]" style={{ color: project.accent }}>
          {project.index} ▸ {project.category.toUpperCase()}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight sm:text-4xl">{project.name}</h3>
        <p className="mt-1 text-sm font-medium text-mist">{project.tagline}</p>
        <p className="mt-5 leading-relaxed text-mist">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-panel p-3">
              <dt className="font-mono text-[10px] tracking-wider text-mist uppercase">{m.label}</dt>
              <dd className="mt-1 text-lg font-semibold" style={{ color: project.accent }}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Read the engineering story
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-mist transition-colors hover:text-white"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className={`hairline rounded-2xl bg-void/60 p-4 ${flip ? "lg:order-1" : ""}`}>
        <Viz />
      </div>
    </article>
  );
}

export default function ProjectsShowcase() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => revealOnScroll(section.current), { scope: section });

  return (
    <section ref={section} id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        index="03"
        label="Selected Systems"
        title="Projects engineered as products, not demos."
      />

      <div className="flex flex-col gap-10">
        {projects.map((p, i) => (
          <ProjectPanel key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
