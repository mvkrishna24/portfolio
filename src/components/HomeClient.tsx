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
import TechMarquee from "./sections/TechMarquee";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Manifesto from "./sections/Manifesto";
import ProjectsShowcase from "./sections/ProjectsShowcase";
import Contact from "./sections/Contact";

/**
 * Mode gate: full cinematic experience vs. recruiter fast-scan view.
 * The server always renders the creative view (full content for SEO);
 * a persisted recruiter preference takes over right after hydration.
 *
 * Section order:
 *   Hero → TechMarquee → About → Stack → Manifesto → Projects → Contact
 */
const emptySubscribe = () => () => {};

export default function HomeClient() {
  const mode = useAppStore((s) => s.mode);
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
        <TechMarquee />
        <About />
        <Stack />
        <Manifesto />
        <ProjectsShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
