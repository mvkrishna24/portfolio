"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const nodes = [
  { id: "user",      x: 20,  y: 140, w: 90,  label: "USER" },
  { id: "api",       x: 170, y: 140, w: 110, label: "API" },
  { id: "redis",     x: 340, y: 140, w: 100, label: "REDIS" },
  { id: "db",        x: 490, y: 140, w: 100, label: "POSTGRES" },
  { id: "analytics", x: 200, y: 280, w: 130, label: "ANALYTICS" },
];

/**
 * Animated redirect hot path: user → API → Redis (hit) → 302 response,
 * with async analytics drip and an occasional cold-path Postgres miss.
 * Real benchmark metrics surface on each loop.
 */
export default function FlowViz() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.8,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      });

      // Packet travels the hot path
      tl.set("[data-packet]", { opacity: 1, attr: { cx: 110, cy: 165 } })
        .to("[data-packet]", { attr: { cx: 170 }, duration: 0.35 })
        .fromTo("[data-node=api] rect", { attr: { "stroke-opacity": 0.2 } }, { attr: { "stroke-opacity": 1 }, duration: 0.15 })
        .to("[data-packet]", { attr: { cx: 340 }, duration: 0.45 })
        .fromTo("[data-node=redis] rect", { attr: { "stroke-opacity": 0.2 } }, { attr: { "stroke-opacity": 1 }, duration: 0.15 })

        // Cache hit — real metrics surface
        .fromTo("[data-hit]",        { opacity: 0, y: 0 }, { opacity: 1, y: -10, duration: 0.38, ease: "power2.out" })
        .fromTo("[data-cache-rate]", { opacity: 0, y: 0 }, { opacity: 1, y: -8,  duration: 0.35, ease: "power2.out" }, "<0.06")

        // 302 response returns to user
        .to("[data-packet]", { attr: { cx: 110 }, duration: 0.5, ease: "power1.in" })
        .fromTo("[data-redirect]", { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" })

        // Fade hit labels
        .to("[data-hit]",        { opacity: 0, duration: 0.3 }, "+=0.1")
        .to("[data-cache-rate]", { opacity: 0, duration: 0.3 }, "<")
        .to("[data-redirect]",   { opacity: 0, duration: 0.25 }, "<")
        .to("[data-packet]",     { opacity: 0, duration: 0.2 })

        // Async analytics event drips down off the hot path
        .set("[data-event]", { opacity: 1, attr: { cx: 265, cy: 190 } }, "-=0.4")
        .to("[data-event]", { attr: { cy: 280 }, duration: 0.6, ease: "power1.in" }, "<")
        .to("[data-event]", { opacity: 0, duration: 0.2 })

        // Occasional cache miss: packet continues to Postgres
        .set("[data-miss-packet]", { opacity: 0.65, attr: { cx: 440, cy: 165 } }, "-=0.3")
        .to("[data-miss-packet]", { attr: { cx: 490 }, duration: 0.5 })
        .fromTo("[data-node=db] rect", { attr: { "stroke-opacity": 0.2 } }, { attr: { "stroke-opacity": 0.8 }, duration: 0.2 })
        .to("[data-miss-packet]", { opacity: 0, duration: 0.3 });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 620 360"
      role="img"
      aria-label="Animated request flow: user to API to Redis cache hit at 4.13ms p99, with asynchronous analytics and PostgreSQL fallback"
      className="h-auto w-full"
    >
      {/* Connectors */}
      <line x1="110" y1="165" x2="170" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="280" y1="165" x2="340" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="440" y1="165" x2="490" y2="165" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="265" y1="190" x2="265" y2="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

      <text x="465" y="155" textAnchor="middle" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">MISS</text>
      <text x="280" y="240" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">ASYNC</text>

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id} data-node={n.id}>
          <rect
            x={n.x} y={n.y} width={n.w} height="50" rx="10"
            fill="#0b0b11"
            stroke={n.id === "redis" ? "#a78bfa" : "rgba(255,255,255,0.6)"}
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          <text
            x={n.x + n.w / 2} y={n.y + 30}
            textAnchor="middle" fontSize="11" fill="#f4f4f6"
            fontFamily="var(--font-mono)" letterSpacing="2"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Cache hit metrics — real benchmark values */}
      <text data-cache-rate x="390" y="112" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="var(--font-mono)" letterSpacing="1.5" opacity="0">
        99.98% CACHE HIT
      </text>
      <text data-hit x="390" y="126" textAnchor="middle" fontSize="11" fill="#34d399" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0">
        HIT 4.13ms
      </text>

      {/* 302 redirect label */}
      <text data-redirect x="65" y="132" textAnchor="middle" fontSize="10" fill="#67e8f9" fontFamily="var(--font-mono)" letterSpacing="1.5" opacity="0">
        302
      </text>

      {/* Animated dots */}
      <circle data-packet    cx="110" cy="165" r="4.5" fill="#67e8f9" opacity="0" style={{ filter: "drop-shadow(0 0 6px #67e8f9)" }} />
      <circle data-miss-packet cx="440" cy="165" r="4"   fill="#a78bfa" opacity="0" />
      <circle data-event      cx="265" cy="190" r="3.5" fill="#34d399" opacity="0" />

      {/* Footer label */}
      <text x="20" y="120" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">
        HOT PATH — DB UNTOUCHED ON CACHE HIT
      </text>
    </svg>
  );
}
