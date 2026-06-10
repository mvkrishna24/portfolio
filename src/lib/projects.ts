export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  summary: string;
  problem: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  stack: string[];
  metrics: { label: string; value: string }[];
  lessons: string[];
  github: string;
  demo?: string;
  viz: "metro" | "flow" | "workflow";
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "metronexis",
    index: "01",
    name: "MetroNexis",
    tagline: "Multi-City Metro Navigation Platform",
    category: "Mobile + Backend System",
    summary:
      "An offline-first metro navigation platform spanning multiple Indian cities — modeling 290 stations as a weighted graph to compute optimal routes, fares, and interchanges in milliseconds.",
    problem:
      "Metro riders in multi-line cities juggle separate apps, stale fare charts, and no offline support underground — exactly where connectivity dies. MetroNexis needed to answer “fastest route, exact fare, where do I change lines?” instantly, with or without a network.",
    architecture: [
      "Metro network modeled as a weighted undirected graph: 290 stations as vertices, track segments as edges weighted by travel time and interchange penalty.",
      "Route engine runs Dijkstra with a custom interchange-aware cost function, so a route with one fewer line change can beat a nominally shorter path.",
      "Fare calculation layered as a pure function over the route result — distance-slab rules per city, kept independent from pathfinding so cities can be added without touching the engine.",
      "Offline-first: the full graph and fare tables ship inside the React Native bundle and sync deltas from the Spring Boot API when online.",
      "Spring Boot backend owns the canonical network data, exposes versioned REST endpoints, and serves diff-based updates so clients never re-download the full network.",
    ],
    decisions: [
      {
        title: "Graph in the client, truth in the server",
        body: "Routing runs entirely on-device for zero-latency, zero-connectivity results. The server is the source of truth that versions and patches the dataset — the inverse of the usual thin-client design, chosen because the data is small (~290 nodes) and the environment is offline-hostile.",
      },
      {
        title: "Interchange penalty as a first-class edge weight",
        body: "Early versions returned technically-shortest routes with three line changes. Encoding interchange cost into the graph weights — rather than post-filtering — let the same Dijkstra pass produce genuinely better routes.",
      },
      {
        title: "City as a data package, not a code branch",
        body: "Each city is a self-contained dataset (graph + fare slabs + line metadata) validated against one schema. Adding a city is a data PR, not a feature branch.",
      },
    ],
    stack: ["React Native", "TypeScript", "Spring Boot", "Java", "REST", "SQLite"],
    metrics: [
      { label: "Stations modeled", value: "290" },
      { label: "Route computation", value: "<50ms" },
      { label: "Works offline", value: "100%" },
      { label: "Cities supported", value: "Multi" },
    ],
    lessons: [
      "Shortest path is not best path — user-perceived cost (interchanges, crowding) must live in the model, not in UI filtering.",
      "Offline-first inverts your sync design: you stop asking “how do I fetch?” and start asking “how do I reconcile?”",
      "Schema-validated data packages scale a product across cities far better than configuration flags.",
    ],
    github: "https://github.com/mvkrishna24",
    viz: "metro",
    accent: "#67e8f9",
  },
  {
    slug: "url-shortener",
    index: "02",
    name: "URL Shortener",
    tagline: "Production-Grade URL Shortening Platform",
    category: "Backend System",
    summary:
      "A high-throughput link platform engineered like infrastructure: Redis-fronted redirects, PostgreSQL durability, per-client rate limiting, custom aliases, and async click analytics — fully containerized.",
    problem:
      "Shortening a URL is trivial; serving redirects at speed while surviving abuse and capturing analytics is not. The system had to keep redirect latency near-zero, protect itself from hot-key floods and scrapers, and record every click without slowing the redirect path.",
    architecture: [
      "Redirect hot path: request → token-bucket rate limiter → Redis lookup → 301. The database is never touched on a cache hit.",
      "Cache-aside with TTL: misses fall through to PostgreSQL, then warm Redis, so the cache self-heals after restarts and evictions.",
      "Click analytics fire as asynchronous events off the redirect path — counted in Redis, batch-flushed to PostgreSQL — so analytics load can never degrade redirect latency.",
      "Base62 short codes generated from a sequence, with custom aliases enforced via a unique constraint and reserved-word checks.",
      "Everything ships as Docker Compose: API, PostgreSQL, Redis — one command to a production-shaped environment.",
    ],
    decisions: [
      {
        title: "Redis in the read path, not as decoration",
        body: "Redirects are a 99%-read workload, so the design optimizes for the cache hit: sub-millisecond Redis lookup with PostgreSQL as durable fallback. Cache-aside (vs write-through) keeps writes simple and tolerates cold starts.",
      },
      {
        title: "Analytics must never block a redirect",
        body: "Click recording is decoupled from the response: increment in Redis, flush in batches. A slow analytics write can cost a data point — it can never cost a user-facing millisecond.",
      },
      {
        title: "Rate limiting at the edge of the API",
        body: "A token-bucket limiter keyed per client sits before any business logic, turning abuse into cheap 429s instead of database load.",
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "REST"],
    metrics: [
      { label: "Cache-hit redirect", value: "<5ms" },
      { label: "DB hits on hot path", value: "0" },
      { label: "Analytics", value: "Async" },
      { label: "Deploy", value: "1 cmd" },
    ],
    lessons: [
      "Design for the dominant access pattern — a 99%-read system should look nothing like a CRUD app.",
      "Every external call on a hot path is a liability; move everything non-essential off it.",
      "Docker Compose parity between dev and prod kills an entire class of “works on my machine” bugs.",
    ],
    github: "https://github.com/mvkrishna24",
    viz: "flow",
    accent: "#a78bfa",
  },
  {
    slug: "leadops",
    index: "03",
    name: "LeadOps AI CRM",
    tagline: "AI-Powered Lead Qualification System",
    category: "AI Automation",
    summary:
      "An autonomous lead-qualification pipeline: n8n orchestrates OpenAI-powered scoring, instant personalized replies, CRM updates, and scheduled follow-ups — turning raw inbound leads into a prioritized pipeline with zero manual triage.",
    problem:
      "Inbound leads decay by the minute — manual triage means slow first responses, inconsistent qualification, and forgotten follow-ups. The goal: respond to every lead in seconds, score it consistently, and keep the CRM current, without a human in the loop for the routine 90%.",
    architecture: [
      "Ingestion: webhooks capture leads from forms and email into a single normalized n8n entry point.",
      "Qualification: an OpenAI scoring stage extracts intent, budget signals, and urgency into structured JSON against a strict schema, producing a 0–100 score with reasoning.",
      "Branching: high-intent leads trigger an instantly drafted personalized reply and a priority CRM flag; low-intent leads enter a nurture sequence.",
      "CRM sync: every stage writes back — score, reasoning, conversation state — so the CRM remains the single source of truth a human can audit.",
      "Follow-up engine: time-based n8n workflows re-engage silent leads with context-aware messages, escalating to a human only on reply.",
    ],
    decisions: [
      {
        title: "Structured output or it didn't happen",
        body: "The LLM is forced into a JSON schema (score, signals, reasoning) and validated before anything downstream runs. Free-text AI output is a demo; validated structured output is a system.",
      },
      {
        title: "Human-auditable by design",
        body: "Every automated action logs its reasoning to the CRM record. Trust in automation comes from being able to see why the machine did what it did.",
      },
      {
        title: "Escalation as a feature, not a failure",
        body: "The pipeline routes ambiguity (low-confidence scores, replies, edge cases) to humans deliberately. Automating 90% reliably beats automating 100% badly.",
      },
    ],
    stack: ["n8n", "OpenAI API", "Webhooks", "REST", "CRM APIs", "JavaScript"],
    metrics: [
      { label: "First response", value: "<60s" },
      { label: "Triage automated", value: "90%" },
      { label: "Scoring", value: "0–100" },
      { label: "Follow-ups", value: "Auto" },
    ],
    lessons: [
      "LLM reliability is an engineering problem: schemas, validation, and retries turn a model into a component.",
      "Workflow automation is distributed systems in disguise — idempotency and failure paths matter as much as the happy path.",
      "The best automation knows when to stop and hand off to a human.",
    ],
    github: "https://github.com/mvkrishna24",
    viz: "workflow",
    accent: "#34d399",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
