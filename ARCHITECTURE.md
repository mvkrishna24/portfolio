# Portfolio Architecture — Vamshi Krishna Martha

A cinematic, engineering-grade portfolio built as a premium software product.
This document is the single source of truth for the system design of the site itself.

---

## 1. Concept

**"An engineering command center, not a portfolio."**

The site presents Vamshi's work the way a production system presents telemetry:
deliberate, dark, precise, alive. Two operating modes serve two audiences:

| Mode | Audience | Experience |
|------|----------|------------|
| **Creative** | Engineers, designers, curious visitors | Cinematic intro, 3D hero, scroll-driven storytelling |
| **Recruiter** | Recruiters, hiring managers | Zero-friction, single-screen-scannable, print-friendly |

The toggle persists via `localStorage` (Zustand `persist`) so a returning
recruiter lands directly in their preferred mode.

## 2. User Journey (Creative Mode)

1. **Boot** — terminal-style preloader (~1.4s, skipped for reduced-motion users)
2. **Hero** — 3D particle system + signal core; headline reveals via SplitText
3. **About** — engineering-mindset manifesto, line-by-line scroll reveal
4. **Stack** — capability matrix grouped by system layer (backend / data / AI / frontend / infra)
5. **Projects** — three full-bleed "case study" panels, each with a bespoke
   animated system diagram (metro graph, request pipeline, AI workflow)
6. **Project deep dives** — `/projects/[slug]`: Problem → Architecture →
   Engineering Decisions → Lessons
7. **Contact** — direct channels, no forms, no friction

## 3. Information Architecture

```
/                      Home (creative or recruiter view, mode-gated)
/projects/metronexis   Deep dive: Multi-City Metro Navigation Platform
/projects/url-shortener Deep dive: Production-Grade URL Shortening Platform
/projects/leadops      Deep dive: AI-Powered Lead Qualification System
```

All project content lives in `src/lib/projects.ts` as a typed content model
(`Project` interface). One data source feeds the home showcase, the deep-dive
pages, the recruiter view, and SEO metadata — content is never duplicated.

## 4. Visual System

- **Canvas**: near-black `#050507`, layered surfaces with 1px `white/8` borders
- **Glass**: `backdrop-blur` panels reserved for floating chrome (nav, HUD chips)
- **Accent**: cyan `#67e8f9` → violet `#a78bfa` gradient; used sparingly as "signal"
- **Type**: Geist Sans (display/UI) + Geist Mono (telemetry, labels, code)
- **Texture**: fixed noise overlay at 4% opacity for filmic depth
- **Grid**: 12-col, max-w-6xl content column, generous vertical rhythm (`py-32`)

## 5. Animation System

| Layer | Tool | Use |
|-------|------|-----|
| Scroll transport | Lenis (synced to GSAP ticker) | inertia scrolling, creative mode only |
| Scroll choreography | GSAP ScrollTrigger | section reveals, pinned project panels, diagram playback |
| Typography | GSAP SplitText | hero headline, section titles |
| Micro-interaction | CSS + GSAP quickTo | magnetic CTAs, cursor glow |

Rules: animations communicate state or hierarchy — never decoration for its
own sake. Everything respects `prefers-reduced-motion` (Lenis disabled,
ScrollTriggers collapse to instant set()s, preloader skipped).

## 6. 3D System

Single React Three Fiber scene in the hero only (`HeroScene`):

- ~2,400 GPU-instanced points forming a drifting data field
- Central wireframe icosahedron "signal core" with slow rotation
- Pointer parallax via lerped group rotation
- Budget: `dpr` capped at 1.75, `frameloop` paused when tab/section hidden,
  no postprocessing, no shadow maps, single draw call for particles

The scene is `next/dynamic`-imported with `ssr: false` so it never blocks
first paint; the hero is fully readable before (and without) WebGL.
Project diagrams are animated SVG (GSAP-driven), not WebGL — cheaper,
crisper, and accessible.

## 7. Component Hierarchy

```
RootLayout (fonts, metadata, theme)
└── HomeClient (mode gate)
    ├── RecruiterView                ── recruiter mode (static, fast)
    └── CreativeExperience          ── creative mode
        ├── Preloader
        ├── SmoothScroll (Lenis)
        ├── CursorGlow
        ├── Navbar (+ ModeToggle)
        ├── Hero (+ HeroScene, dynamic)
        ├── About
        ├── Stack
        ├── ProjectsShowcase
        │   ├── MetroViz   (animated metro graph)
        │   ├── FlowViz    (animated request pipeline)
        │   └── WorkflowViz (animated AI workflow)
        ├── Contact
        └── Footer
```

## 8. Folder Structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── projects/[slug]/page.tsx
│   ├── sitemap.ts, robots.ts
├── components/
│   ├── HomeClient.tsx, Preloader.tsx, Navbar.tsx, Footer.tsx,
│   │   ModeToggle.tsx, CursorGlow.tsx, SmoothScroll.tsx, RecruiterView.tsx
│   ├── sections/   Hero, About, Stack, ProjectsShowcase, Contact
│   ├── three/      HeroScene
│   ├── visuals/    MetroViz, FlowViz, WorkflowViz
│   └── project/    ProjectDetail
└── lib/
    ├── projects.ts   typed content model (single source of truth)
    ├── store.ts      Zustand (mode, intro state)
    └── profile.ts    identity, links, headline copy
```

## 9. Performance Budget

- 3D code-split behind `next/dynamic`; zero WebGL on recruiter mode and project pages
- Fonts self-hosted via `next/font` (no layout shift, no third-party request)
- No images above the fold; diagrams are inline SVG
- Static generation for every route (`generateStaticParams` for projects)
- Target: Lighthouse ≥ 95 across Performance / A11y / Best Practices / SEO

## 10. Roadmap

- [x] Phase 1 — foundation: design tokens, layout, content model, store
- [x] Phase 2 — creative experience: preloader, hero + 3D, scroll system
- [x] Phase 3 — storytelling: project showcases with animated system diagrams
- [x] Phase 4 — deep-dive pages, recruiter mode, contact
- [x] Phase 5 — SEO, accessibility, reduced motion, production build
- [ ] Phase 6 (future) — MDX-backed engineering blog, live GitHub activity HUD
