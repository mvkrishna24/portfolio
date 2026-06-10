"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const nodes = [
  { id: "webhook", x: 20, y: 150, w: 100, label: "WEBHOOK", color: "rgba(255,255,255,0.6)" },
  { id: "score", x: 180, y: 150, w: 110, label: "AI SCORE", color: "#34d399" },
  { id: "reply", x: 430, y: 60, w: 130, label: "AUTO REPLY", color: "#67e8f9" },
  { id: "crm", x: 430, y: 150, w: 130, label: "CRM UPDATE", color: "rgba(255,255,255,0.6)" },
  { id: "nurture", x: 430, y: 240, w: 130, label: "FOLLOW-UP", color: "#a78bfa" },
];

const edges = [
  { id: "in", d: "M 120 175 L 180 175" },
  { id: "hi", d: "M 290 175 C 350 175 370 85 430 85" },
  { id: "mid", d: "M 290 175 L 430 175" },
  { id: "lo", d: "M 290 175 C 350 175 370 265 430 265" },
];

/** Animated AI lead-qualification workflow: webhook → LLM scoring → branched actions. */
export default function WorkflowViz() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const paths = gsap.utils.toArray<SVGPathElement>("[data-edge]", root.current ?? undefined);
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: `6 ${len}`, strokeDashoffset: 6 });
      });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        scrollTrigger: { trigger: root.current, start: "top 80%", toggleActions: "play pause resume pause" },
      });

      const pulse = (selector: string, position?: string | number) =>
        tl.fromTo(
          selector,
          { strokeDashoffset: 6 },
          {
            strokeDashoffset: (i: number, t: SVGPathElement) => -t.getTotalLength(),
            duration: 0.7,
            ease: "power1.inOut",
          },
          position
        );

      pulse("[data-edge=in]");
      tl.fromTo("[data-node=score] rect", { attr: { "stroke-opacity": 0.25 } }, { attr: { "stroke-opacity": 1 }, duration: 0.2 })
        .fromTo("[data-score-text]", { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .to("[data-score-num]", {
          textContent: 87,
          duration: 0.7,
          snap: { textContent: 1 },
          ease: "power2.out",
        });
      pulse("[data-edge=hi]", "+=0.1");
      pulse("[data-edge=mid]", "<0.12");
      pulse("[data-edge=lo]", "<0.12");
      tl.fromTo(
        "[data-action] rect",
        { attr: { "stroke-opacity": 0.25 } },
        { attr: { "stroke-opacity": 1 }, duration: 0.2, stagger: 0.08 },
        "-=0.3"
      )
        .to("[data-action] rect", { attr: { "stroke-opacity": 0.25 }, duration: 0.5, delay: 0.6 })
        .to("[data-node=score] rect", { attr: { "stroke-opacity": 0.25 }, duration: 0.5 }, "<")
        .to("[data-score-text]", { opacity: 0, duration: 0.3 }, "<")
        .set("[data-score-num]", { textContent: 0 });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 620 360"
      role="img"
      aria-label="Animated AI workflow: webhook intake, LLM lead scoring, branching to auto reply, CRM update and follow-up"
      className="h-auto w-full"
    >
      {edges.map((e) => (
        <g key={e.id}>
          <path d={e.d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <path data-edge={e.id} d={e.d} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {nodes.map((n) => (
        <g key={n.id} data-node={n.id} data-action={["reply", "crm", "nurture"].includes(n.id) ? "" : undefined}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height="50"
            rx="10"
            fill="#0b0b11"
            stroke={n.color}
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + 30}
            textAnchor="middle"
            fontSize="11"
            fill="#f4f4f6"
            fontFamily="var(--font-mono)"
            letterSpacing="2"
          >
            {n.label}
          </text>
        </g>
      ))}

      <text data-score-text x="235" y="135" textAnchor="middle" fontSize="12" fill="#34d399" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0">
        SCORE <tspan data-score-num>0</tspan>/100
      </text>

      <text x="20" y="120" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">
        n8n PIPELINE — STRUCTURED LLM OUTPUT, VALIDATED
      </text>
      <text x="495" y="46" textAnchor="middle" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">
        HIGH INTENT
      </text>
      <text x="495" y="320" textAnchor="middle" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">
        NURTURE TRACK
      </text>
    </svg>
  );
}
