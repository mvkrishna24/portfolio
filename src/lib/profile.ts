export const profile = {
  name: "Vamshi Krishna Martha",
  shortName: "Vamshi Krishna",
  roles: ["Backend Engineer", "Java Developer", "AI Automation Engineer"],
  headline: "Backend systems. AI workflows. Production software.",
  subheadline:
    "I build production-grade backend systems, offline-first mobile platforms, and AI automation workflows with Java, Spring Boot, PostgreSQL, Redis, Docker, and n8n.",
  location: "Hyderabad, India · Open to Remote",
  email: "m.v.krishnaa@gmail.com",
  phone: "9398191346",
  github: "https://github.com/mvkrishna24",
  linkedin: "https://www.linkedin.com/in/krishna-mv-tech/",
  instagram: "https://www.instagram.com/martha_vamshi_krishna/",
  resume: "/resume.pdf",
  seeking: [
    "Software Engineering Internships",
    "Backend Engineering Internships",
    "AI Automation Roles",
    "Startup Engineering Roles",
    "Remote Internships",
  ],
} as const;

export const stack = [
  {
    layer: "Languages",
    note: "The foundation — strong typed, scripted, and query languages.",
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    layer: "Backend",
    note: "Production-grade services designed for correctness, load, and change.",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "OAuth 2.0",
      "JWT",
      "REST APIs",
      "Hibernate / JPA",
      "Maven",
      "Node.js",
    ],
  },
  {
    layer: "Databases",
    note: "Storage chosen per access pattern — relational durability, cache speed.",
    items: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    layer: "Frontend",
    note: "Modern interfaces that respect performance budgets.",
    items: ["React", "Next.js", "Tailwind CSS", "React Native"],
  },
  {
    layer: "AI / Automation",
    note: "LLMs and workflow engines wired into real business pipelines.",
    items: ["OpenAI API", "Gemini API", "n8n", "LangChain", "RAG Pipelines"],
  },
  {
    layer: "DevOps",
    note: "Reproducible environments and shippable artifacts.",
    items: ["Docker", "GitHub Actions", "Railway", "Vercel"],
  },
  {
    layer: "Tools",
    note: "Day-to-day engineering toolkit for building and debugging.",
    items: ["Git", "Postman", "Swagger / OpenAPI", "IntelliJ IDEA", "VS Code"],
  },
  {
    layer: "Concepts",
    note: "Principles that guide system design decisions.",
    items: [
      "Microservices",
      "Caching",
      "Rate Limiting",
      "Database Indexing",
      "API Design",
      "System Design",
    ],
  },
] as const;

export const principles = [
  {
    title: "Systems before screens",
    body: "Every product starts with data models, APIs, failure handling, and clear system boundaries. The UI is the last mile, not the foundation.",
  },
  {
    title: "Production is the standard",
    body: "Caching, rate limiting, authentication, observability, and deployment are not afterthoughts — they are designed in from day one.",
  },
  {
    title: "Automate the repeatable",
    body: "If a workflow runs twice, it can become an automation pipeline. AI agents and n8n flows handle the routine so humans handle judgment.",
  },
  {
    title: "Measure, then optimize",
    body: "Benchmarks, latency numbers, cache hit rates, and tests are stronger than assumptions. Decisions ride on numbers, not instinct.",
  },
] as const;
