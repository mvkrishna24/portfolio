"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const LINE_A = "M 30 300 L 150 230 L 290 170 L 420 120 L 570 70";
const LINE_B = "M 60 50 L 180 110 L 290 170 L 400 240 L 550 310";
const LINE_C = "M 30 160 L 150 230 L 290 280 L 460 300";
const ROUTE  = "M 60 50 L 180 110 L 290 170 L 420 120 L 570 70";

const stations: [number, number][] = [
  [30, 300], [150, 230], [290, 170], [420, 120], [570, 70],
  [60, 50],  [180, 110], [400, 240], [550, 310],
  [30, 160], [290, 280], [460, 300],
];

/** Animated metro network — route trace, interchange pulse, and origin burst. */
export default function MetroViz() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const route = root.current?.querySelector<SVGPathElement>("[data-route]");
      if (!route) return;
      const len = route.getTotalLength();
      gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.4,
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      });

      tl
        // Stations pop in
        .from("[data-station]", {
          scale: 0,
          transformOrigin: "center",
          stagger: 0.04,
          duration: 0.4,
          ease: "back.out(2)",
        })

        // Origin burst — expanding ring at departure station
        .fromTo(
          "[data-origin-ring]",
          { scale: 0.3, opacity: 0.9, transformOrigin: "center" },
          { scale: 3.0, opacity: 0, duration: 0.75, ease: "power2.out" },
          0.1
        )

        // Route line draws across the map
        .to(route, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.3)

        // Train moves along the route (cyan glow dot)
        .to(
          "[data-train]",
          { motionPath: { path: ROUTE, autoRotate: false }, duration: 2.2, ease: "power2.inOut", opacity: 1 },
          0.3
        )

        // Interchange — primary cyan ring expands
        .fromTo(
          "[data-interchange-ring]",
          { scale: 0.4, opacity: 1, transformOrigin: "center" },
          { scale: 2.4, opacity: 0, duration: 0.8, ease: "power2.out" },
          1.35
        )

        // Interchange — secondary purple ring with slight offset for depth
        .fromTo(
          "[data-interchange-ring2]",
          { scale: 0.4, opacity: 0.7, transformOrigin: "center" },
          { scale: 2.9, opacity: 0, duration: 1.0, ease: "power2.out" },
          1.6
        )

        // Train fades on arrival
        .to("[data-train]", { opacity: 0, duration: 0.3 }, 2.6)

        // Route line fades out
        .to(route, { opacity: 0, duration: 0.6 }, 3.1)

        // Reset for next loop
        .set(route, { strokeDashoffset: len, opacity: 1 });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 600 360"
      role="img"
      aria-label="Animated metro network diagram showing a route computed across two lines with an interchange"
      className="h-auto w-full"
    >
      {/* Network lines — dim */}
      <path d={LINE_A} stroke="#67e8f9" strokeOpacity="0.22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={LINE_B} stroke="#a78bfa" strokeOpacity="0.22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={LINE_C} stroke="#34d399" strokeOpacity="0.18" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Active route trace */}
      <path data-route d={ROUTE} stroke="#67e8f9" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Station nodes */}
      {stations.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          data-station
          cx={x}
          cy={y}
          r="6"
          fill="#0b0b11"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
        />
      ))}

      {/* Interchange node — fixed visible ring */}
      <circle cx="290" cy="170" r="9" fill="#0b0b11" stroke="#fff" strokeWidth="2" />

      {/* Interchange — primary pulse (cyan) */}
      <circle data-interchange-ring cx="290" cy="170" r="9" fill="none" stroke="#67e8f9" strokeWidth="1.5" />

      {/* Interchange — secondary pulse (purple offset) */}
      <circle data-interchange-ring2 cx="290" cy="170" r="9" fill="none" stroke="#a78bfa" strokeWidth="1" />

      {/* Origin pulse ring */}
      <circle data-origin-ring cx="60" cy="50" r="8" fill="none" stroke="#67e8f9" strokeWidth="1.5" />

      {/* Train — glowing dot that rides the MotionPath */}
      <circle
        data-train
        cx="60"
        cy="50"
        r="5.5"
        fill="#67e8f9"
        opacity="0"
        style={{ filter: "drop-shadow(0 0 8px #67e8f9) drop-shadow(0 0 18px rgba(103,232,249,0.5))" }}
      />

      {/* Labels */}
      <text x="290" y="148" textAnchor="middle" fontSize="10" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="2">
        INTERCHANGE
      </text>
      <text x="60" y="36" fontSize="10" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="2">
        ORIGIN
      </text>
      <text x="540" y="56" textAnchor="end" fontSize="10" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="2">
        DESTINATION
      </text>
      <text x="540" y="344" textAnchor="end" fontSize="9" fill="#9b9ba6" fontFamily="var(--font-mono)" letterSpacing="1.5">
        290 STATIONS · BFS + DIJKSTRA
      </text>
    </svg>
  );
}
