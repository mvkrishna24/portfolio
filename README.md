# Vamshi Krishna Martha — Portfolio

A cinematic, engineering-grade portfolio built as a premium software product.
Dark command-center aesthetic, real-time 3D hero, scroll-driven storytelling,
and a recruiter fast-scan mode — all statically generated.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger,
SplitText, MotionPath) · Three.js / React Three Fiber / drei · Lenis · Zustand

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full system design — visual
system, animation system, 3D budget, component hierarchy, and performance
strategy.

## Highlights

- **Two operating modes** — Creative (cinematic) and Recruiter (zero-animation,
  print-friendly, scannable in 30 seconds), persisted per visitor
- **R3F hero scene** — 2,400 instanced particles + wireframe signal core,
  DPR-capped, frameloop paused off-screen, mounted after first paint
- **Animated system diagrams** — each project ships a bespoke GSAP-driven SVG:
  metro route graph, Redis request pipeline, AI workflow DAG
- **Accessible by default** — full `prefers-reduced-motion` support, semantic
  landmarks, keyboard-visible focus states
- **Fully static** — every route prerendered; content lives in one typed model
  (`src/lib/projects.ts`)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all routes static)
npm run lint
```

## Before deploying

1. Drop your resume at `public/resume.pdf` (the Resume buttons link there).
2. Update `siteUrl` in `src/app/layout.tsx` and `src/app/sitemap.ts` to your domain.
3. Verify the GitHub/LinkedIn links in `src/lib/profile.ts`.
4. Deploy on Vercel — zero config needed.
