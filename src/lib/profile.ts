export const profile = {
  name: "Vamshi Krishna Martha",
  shortName: "Vamshi Krishna",
  roles: ["Backend Engineer", "Java Developer", "AI Automation Engineer"],
  headline: "Backend systems. AI workflows. Production software.",
  subheadline:
    "Building production-grade backend systems, AI-powered workflows, and real-world software products.",
  location: "India",
  email: "marthavamshikrishna1024@gmail.com",
  github: "https://github.com/mvkrishna24",
  linkedin: "https://www.linkedin.com/in/vamshi-krishna-martha",
  resume: "/resume.pdf",
  seeking: [
    "Software Engineering Internships",
    "Backend Engineering Internships",
    "AI Automation Roles",
    "Startup Engineering Roles",
  ],
} as const;

export const stack = [
  {
    layer: "Backend",
    note: "The core discipline — services designed for failure, load, and change.",
    items: ["Java", "Spring Boot", "REST APIs", "JWT Auth", "Rate Limiting"],
  },
  {
    layer: "Data",
    note: "Storage chosen per access pattern, not per habit.",
    items: ["PostgreSQL", "Redis", "Caching Strategy", "Indexing", "Graph Modeling"],
  },
  {
    layer: "AI Automation",
    note: "LLMs wired into real business workflows that run unattended.",
    items: ["n8n", "OpenAI APIs", "Gemini APIs", "Prompt Pipelines", "Lead Scoring"],
  },
  {
    layer: "Frontend",
    note: "Modern interfaces that respect performance budgets.",
    items: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS"],
  },
  {
    layer: "Infrastructure",
    note: "Reproducible environments, shippable artifacts.",
    items: ["Docker", "Git", "CI/CD", "Vercel", "Linux"],
  },
] as const;

export const principles = [
  {
    title: "Systems before screens",
    body: "Every product starts as a data model and a failure plan. The UI is the last mile, not the foundation.",
  },
  {
    title: "Production is the standard",
    body: "Caching, rate limiting, observability, and offline behavior are designed in from day one — not patched in after launch.",
  },
  {
    title: "Automate the repeatable",
    body: "If a workflow runs twice, it becomes a pipeline. AI agents and n8n flows handle the routine so humans handle judgment.",
  },
  {
    title: "Measure, then optimize",
    body: "Decisions ride on numbers: query plans, cache hit rates, p95 latency. Intuition proposes; benchmarks decide.",
  },
] as const;
