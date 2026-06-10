# Vamshi Krishna Martha — Portfolio

A cinematic, engineering-grade portfolio for a backend engineer and AI automation builder.
Dark command-center aesthetic, real-time 3D hero, scroll-driven storytelling,
and a recruiter fast-scan mode — all statically generated.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger,
SplitText, MotionPath) · Three.js / React Three Fiber / drei · Lenis · Zustand

## Showcases

- **MetroNexis** — 290-station offline-first metro navigation platform (Java 21, Spring Boot 3.3.5, PostgreSQL 16, Redis 7, React Native)
- **Distributed URL Shortener** — 100+ RPS, 4.13ms p99, 99.98% Redis cache hit rate (Java 17, Spring Boot, PostgreSQL, Redis, Docker)
- **LeadOps AI CRM** — n8n + Gemini lead qualification pipeline, lead-to-email under 10 seconds
- **Freelance engineering work** — production websites and automation systems for real business clients
- **Recruiter Mode** — zero-animation fast-scan view with experience, education, achievements, and project metrics

## Features

- **Two operating modes** — Creative (cinematic) and Recruiter (zero-animation,
  print-friendly, scannable in 30 seconds), persisted per visitor
- **R3F hero scene** — 2,400 instanced particles + wireframe signal core,
  DPR-capped, frameloop paused off-screen, mounted after first paint
- **Animated system diagrams** — each project ships a bespoke GSAP-driven SVG:
  metro route graph, Redis request pipeline, AI workflow DAG
- **Accessible by default** — full `prefers-reduced-motion` support, semantic
  landmarks, keyboard-visible focus states
- **Fully static** — every route prerendered; content lives in typed data models
  (`src/lib/projects.ts`, `src/lib/profile.ts`)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
npm run lint
```

## Before deploying

1. Drop your resume at `public/resume.pdf` (all Resume buttons link there).
2. Update `siteUrl` in `src/app/layout.tsx` and `src/app/sitemap.ts` to your domain.
3. Verify the GitHub/LinkedIn links in `src/lib/profile.ts`.
4. Deploy on Vercel — zero config needed.

> Deployment planned after final content review.
