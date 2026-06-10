"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis inertia scrolling driven by the GSAP ticker so ScrollTrigger
 * and the scroll transport share one clock.
 * Expo-out easing (fast start, graceful deceleration) gives a cinematic,
 * high-end feel. Disabled entirely for reduced-motion users.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // Slightly longer duration — smoother, more filmic feel
      duration: 1.35,
      // Expo-out: snappy initial response that decelerates elegantly
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Prevent GSAP from adding artificial lag smoothing that fights Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
