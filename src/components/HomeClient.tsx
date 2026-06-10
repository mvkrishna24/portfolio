"use client";

import { useSyncExternalStore } from "react";
import { useAppStore } from "@/lib/store";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";
import CursorGlow from "./CursorGlow";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RecruiterView from "./RecruiterView";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import ProjectsShowcase from "./sections/ProjectsShowcase";
import Contact from "./sections/Contact";

/**
 * Mode gate: full cinematic experience vs. recruiter fast-scan view.
 * The server always renders the creative view (full content for SEO);
 * a persisted recruiter preference takes over right after hydration.
 */
const emptySubscribe = () => () => {};

export default function HomeClient() {
  const mode = useAppStore((s) => s.mode);
  // false during SSR and the hydration render, true immediately after
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (hydrated && mode === "recruiter") {
    return <RecruiterView />;
  }

  return (
    <div className="noise">
      <Preloader />
      <SmoothScroll />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <ProjectsShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
