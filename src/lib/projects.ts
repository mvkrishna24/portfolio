export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  summary: string;
  recruiterSummary: string;
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
    tagline: "Production-Grade Metro Navigation Platform for India",
    category: "Mobile + Backend System",
    summary:
      "An offline-first metro navigation platform for Indian commuters, combining a React Native mobile app with a Spring Boot backend to deliver fast route planning, fare calculation, ticketing, wallet, service alerts, and multi-city metro support.",
    recruiterSummary:
      "Engineered a production-grade metro navigation system with offline-first route computation, Spring Boot backend APIs, PostgreSQL schema design, Redis caching, JWT security, QR ticketing, wallet flows, and Railway deployment.",
    problem:
      "Around 75% of Delhi Metro runs underground, where signal is unreliable. MetroNexis is designed to keep route planning available even when the network is offline or degraded — answering 'fastest route, exact fare, where do I change lines?' instantly, in all three network states.",
    architecture: [
      "Mobile app uses React Native + Expo with local MMKV storage and offline BFS/Dijkstra fallback — full route computation runs on-device with no network dependency.",
      "Backend uses Spring Boot 3.3.5 with layered REST APIs, service layer, PostgreSQL 16, Redis 7, Flyway migrations, JWT authentication, and Swagger/OpenAPI documentation.",
      "3-tier network awareness: online (API-first), degraded (1.5s timeout then local fallback), and offline (fully local graph from MMKV cache).",
      "Redis key patterns cover route cache, station cache, fare cache, and service-alert cache with TTL and invalidation strategy to keep data fresh without hammering the database.",
      "Multi-city architecture isolates Delhi and Hyderabad route data and fare rules — adding a city is a data migration, not a code change.",
      "Ticket QR payloads are HMAC-signed server-side to prevent forged or replayed tickets, with server-side validation on scan.",
    ],
    decisions: [
      {
        title: "Graph in the client, truth in the server",
        body: "Routing runs entirely on-device for zero-latency, zero-connectivity results. The server is the canonical source that versions and patches the dataset. Chosen because the graph is small (~290 nodes) and the environment is underground/offline-hostile.",
      },
      {
        title: "Interchange penalty as a first-class edge weight",
        body: "Early versions returned technically-shortest routes with three line changes. Encoding interchange cost into the graph weights — rather than post-filtering — let the same Dijkstra pass produce genuinely better routes without any UI hacks.",
      },
      {
        title: "City as a data package, not a code branch",
        body: "Each city is a self-contained dataset (graph + fare slabs + line metadata) validated against one schema and deployed via Flyway migrations. Adding a city is a data PR, not a feature branch — no business logic changes required.",
      },
    ],
    stack: [
      "Java 21",
      "Spring Boot 3.3.5",
      "PostgreSQL 16",
      "Redis 7",
      "React Native 0.81.5",
      "Expo SDK 54",
      "TypeScript",
      "MMKV",
      "Docker",
      "Railway",
      "GitHub Actions",
      "Swagger / OpenAPI",
      "Flyway",
      "JWT",
    ],
    metrics: [
      { label: "Stations modeled", value: "290" },
      { label: "Automated tests", value: "152+" },
      { label: "Flyway migrations", value: "18" },
      { label: "Cities live", value: "Delhi + HYD" },
    ],
    lessons: [
      "Shortest path is not best path — user-perceived cost (interchanges, crowding) must live in the graph model, not in UI filtering.",
      "Offline-first inverts your sync design: stop asking 'how do I fetch?' and start asking 'how do I reconcile?' with bounded local state.",
      "152 passing tests across auth, fares, tickets, wallet, journeys, and multi-city routing gave real confidence to deploy — not just coverage numbers.",
    ],
    github: "https://github.com/mvkrishna24/MetroNexis",
    viz: "metro",
    accent: "#67e8f9",
  },
  {
    slug: "url-shortener",
    index: "02",
    name: "Distributed URL Shortener",
    tagline: "Production-Grade URL Shortening Platform",
    category: "Backend System",
    summary:
      "A high-performance Spring Boot URL shortener with Redis caching, PostgreSQL persistence, Base62 batch ID generation, JWT authentication, rate limiting, asynchronous analytics, and CI/CD.",
    recruiterSummary:
      "Built a production-grade URL shortener that validates 100+ warm-cache redirects/sec at 4.13ms p99 latency on a single local instance, using Redis read-through caching, PostgreSQL-backed Base62 ID allocation, and asynchronous analytics.",
    problem:
      "Shortening a URL is trivial; serving redirects at speed while surviving abuse and capturing analytics is not. The system had to keep redirect latency near-zero, protect itself from hot-key floods and scrapers, and record every click without slowing the redirect path.",
    architecture: [
      "Redirect hot path: request → Redis Lua token-bucket rate limiter → Redis lookup → 302 redirect. The database is never touched on a warm-cache hit.",
      "Base62 short-code generation uses PostgreSQL sequence blocks of 1,000 IDs per instance, dispensed via AtomicLong — eliminating per-request database calls for ID generation.",
      "Read-through Redis caching with 1-hour TTL; cache misses fall back to PostgreSQL, then warm Redis. Cache self-heals after restarts with zero operator intervention.",
      "Click analytics are fire-and-forget: events enqueue into a bounded LinkedBlockingQueue (capacity 10,000), then a scheduler batch-inserts 500-row chunks to PostgreSQL — analytics load never touches redirect latency.",
      "Redis Lua script guarantees atomic two-tier quota enforcement: 100 req/min for anonymous IPs, 1,000 req/min for authenticated users — abuse becomes cheap 429s, not database load.",
      "Micrometer + Prometheus metrics exposed through authenticated /actuator/prometheus; GitHub Actions CI with Docker-based health checks validates each commit.",
    ],
    decisions: [
      {
        title: "Redis in the read path, not as decoration",
        body: "Redirects are a 99%-read workload, so the design optimizes for the cache hit: sub-millisecond Redis lookup with PostgreSQL as durable fallback. Cache-aside (vs write-through) keeps writes simple and tolerates cold starts without complex invalidation.",
      },
      {
        title: "Analytics must never block a redirect",
        body: "Click recording is fully decoupled from the response path. Increment in Redis, flush in batches. A slow analytics write can cost a data point — it can never cost a user-facing millisecond.",
      },
      {
        title: "Batch ID allocation for high throughput and short codes",
        body: "Allocating 1,000-ID blocks per instance trades small crash gaps (lost IDs between block boundary and crash) for high throughput — no per-redirect database round-trips, short Base62 codes, and no distributed locking.",
      },
    ],
    stack: [
      "Java 17",
      "Spring Boot 3",
      "PostgreSQL 16",
      "Redis 7",
      "Docker Compose",
      "GitHub Actions",
      "Flyway",
      "JJWT",
      "BCrypt",
      "Micrometer",
      "Prometheus",
      "JUnit 5",
      "Mockito",
      "Testcontainers",
    ],
    metrics: [
      { label: "Redirect p99", value: "4.13ms" },
      { label: "Cache hit rate", value: "99.98%" },
      { label: "Throughput", value: "100+ RPS" },
      { label: "ID block size", value: "1,000" },
    ],
    lessons: [
      "Design for the dominant access pattern — a 99%-read system should look nothing like a CRUD app; put Redis in the read path, not as a nice-to-have.",
      "Every external call on a hot path is a liability. Move everything non-essential off it — analytics, metrics, logging all run async.",
      "Lua scripts in Redis are the right tool for atomic rate limiting — they execute transactionally, no race conditions, no distributed lock overhead.",
    ],
    github: "https://github.com/mvkrishna24/url-shortener",
    viz: "flow",
    accent: "#a78bfa",
  },
  {
    slug: "leadops",
    index: "03",
    name: "LeadOps AI CRM",
    tagline: "AI-Powered Lead Qualification & Outreach Automation",
    category: "AI Automation",
    summary:
      "A production-tested AI automation pipeline that captures leads, scores them with Gemini, generates personalized outreach emails, stores structured CRM data, and routes hot leads automatically.",
    recruiterSummary:
      "Built an event-driven n8n automation that turns Google Form submissions into Gemini-powered lead scoring, personalized Gmail outreach, CRM updates in Google Sheets, and hot-lead alerts in under 10 seconds.",
    problem:
      "Inbound leads decay by the minute — manual triage means slow first responses, inconsistent qualification, and forgotten follow-ups. The goal: respond to every lead in seconds, score it with AI, and keep the CRM current without a human in the loop for the routine work.",
    architecture: [
      "Ingestion layer: Google Forms captures lead data into Google Sheets; Apps Script onFormSubmit trigger dispatches the payload to an n8n webhook in real time.",
      "AI layer: Gemini API analyzes the lead profile, intent, budget signals, urgency, and fit — producing a numeric score (1–10) and personalized email copy instead of static templates.",
      "Delivery layer: Gmail SMTP sends the personalized outreach email to the prospect and, when the score crosses the hot-lead threshold, fires a priority alert to the sales inbox.",
      "Routing layer: n8n IF nodes branch on Hot / Warm / Cold classification — each tier gets a different follow-up sequence and CRM status.",
      "Storage layer: Google Sheets CRM stores structured lead data — score, category, AI analysis, email delivery status, and timestamp — as the auditable source of truth.",
    ],
    decisions: [
      {
        title: "Gemini for scoring and copy generation in one pass",
        body: "A single Gemini call both scores the lead and drafts the personalized email, reducing latency and API calls. The prompt enforces structured output so downstream routing is deterministic.",
      },
      {
        title: "Apps Script as the ingestion bridge",
        body: "Using Google Apps Script onFormSubmit avoids polling and keeps the pipeline fully event-driven. The script normalizes the form payload and fires an HTTP POST to n8n, decoupling the ingestion layer from the automation engine.",
      },
      {
        title: "Human-auditable by design",
        body: "Every automated action logs its reasoning to the Google Sheets CRM record: score, category, AI analysis, and delivery status. Trust in automation comes from being able to see why the machine did what it did.",
      },
    ],
    stack: [
      "n8n",
      "Google Gemini API",
      "Google Forms",
      "Google Sheets API",
      "Google Apps Script",
      "Gmail SMTP",
      "Webhooks",
      "JavaScript",
      "Service Account Credentials",
      "Conditional Routing",
    ],
    metrics: [
      { label: "Response time", value: "<10s" },
      { label: "AI score range", value: "1–10" },
      { label: "Lead routing", value: "Hot/Warm/Cold" },
      { label: "Manual work", value: "0" },
    ],
    lessons: [
      "Event-driven ingestion beats polling — Apps Script onFormSubmit fires immediately; a polling loop would add minutes of lag to a pipeline measured in seconds.",
      "Structured AI output is non-negotiable in a real pipeline: forcing Gemini into a schema makes the score and routing deterministic, not probabilistic.",
      "Workflow automation is distributed systems in disguise — idempotency and failure paths matter as much as the happy path.",
    ],
    github: "https://github.com/mvkrishna24/leadops-ai-crm",
    viz: "workflow",
    accent: "#34d399",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
