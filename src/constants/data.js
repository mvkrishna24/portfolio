// src/constants/data.js
export const PERSONAL = {
  name: " Martha Vamshi Krishna",
  tagline: "Building systems that move cities.",
  role: "Backend Developer & CS Student",
  location: "India",
  email: "your@email.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  bio: `3rd year CS student specializing in AI/ML, obsessed with 
        building backend systems that solve real problems. 
        Currently building Metro Navigator — a full-stack route 
        optimization engine for Indian cities.`,
};

export const SKILLS = {
  backend: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "JWT Auth"],
  frontend: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
  tools: ["Git", "Docker", "IntelliJ IDEA", "VS Code", "Postman"],
  learning: ["DSA", "System Design", "MLOps"],
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Metro Navigator India',
    tagline: 'Route optimization for Indian metro networks',
    description:
      'A full-stack application that finds the fastest, cheapest, and fewest-stop routes across Indian metro systems. Built Dijkstra\'s algorithm from scratch in Java, exposed as REST APIs, and visualized on an interactive map.',
    longDesc: [
      'Implemented Dijkstra\'s algorithm in Java to compute optimal routes across multi-line metro networks.',
      'Built a Spring Boot backend with PostgreSQL storing station data, adjacency graphs, and fare matrices.',
      'React + Leaflet.js frontend renders real-time routes on an interactive map with station markers.',
      'JWT-secured API with rate limiting, deployed with Docker Compose.',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Leaflet.js', 'Dijkstra\'s', 'Docker', 'JWT'],
    github: 'https://github.com/mvkrishna24/metro-navigator-india',
    live: '#',
    featured: true,
    status: 'In Progress',
    category: 'Full Stack',
    year: '2024',
    highlight: 'Dijkstra\'s from scratch',
  },
  {
    id: 2,
    title: 'GitHub Profile Card Generator',
    tagline: 'Beautiful dev cards from GitHub data',
    description:
      'Generates shareable, beautifully styled developer profile cards using the GitHub public API. Supports multiple themes, skill tags, and one-click PNG export.',
    longDesc: [],
    tech: ['React', 'GitHub API', 'Canvas API', 'CSS'],
    github: '#',
    live: '#',
    featured: false,
    status: 'Complete',
    category: 'Frontend',
    year: '2024',
    highlight: 'Canvas API export',
  },
  {
    id: 3,
    title: 'Spring Boot Auth Service',
    tagline: 'Production-ready JWT authentication API',
    description:
      'A reusable authentication microservice with JWT access + refresh tokens, role-based access control, and PostgreSQL user management. Designed as a plug-in module for any Spring Boot project.',
    longDesc: [],
    tech: ['Java', 'Spring Boot', 'JWT', 'PostgreSQL', 'Spring Security'],
    github: '#',
    live: '#',
    featured: false,
    status: 'Complete',
    category: 'Backend',
    year: '2024',
    highlight: 'Role-based access',
  },
]
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
export const ABOUT = {
  story: [
    "I'm a 3rd year B.Tech AIML student who enjoys building practical systems that solve real-world problems.",
    "My journey started with learning programming fundamentals and gradually moved into frontend development, backend development, and project building.",
    "Right now, I'm focused on improving my Java, Spring Boot, web development, DSA, and generative AI skills while building strong portfolio projects.",
    "One of my major projects is Metro Navigator India, where I want to combine problem-solving, backend logic, and real-world usefulness into one strong system.",
    "I'm also interested in photography, and that creative side helps me think more carefully about visual design, composition, and presentation."
  ],

  stats: [
    { value: '3+', label: 'Projects Started' },
    { value: '3rd', label: 'Year B.Tech AIML' },
    { value: '1+', label: 'Major Portfolio Build' },
    { value: '2026', label: 'Internship Focus' },
  ],

  timeline: [
    {
      year: '2023',
      title: 'Started B.Tech Journey',
      desc: 'Began my engineering journey in AIML and started learning core programming concepts.',
    },
    {
      year: '2024',
      title: 'Explored Development',
      desc: 'Started learning frontend, backend, Java, and practical project development.',
    },
    {
      year: '2025',
      title: 'Built Stronger Projects',
      desc: 'Focused on portfolio projects like GitHub Profile Card Generator and Metro Navigator India.',
    },
    {
      year: '2026',
      title: 'Internship Preparation',
      desc: 'Working on skills, projects, and presentation to prepare for strong internship opportunities.',
    },
  ],
}
export const SKILLS_DATA = {
  backend: [
    { name: 'Java',            level: 75, note: 'Primary language' },
    { name: 'Spring Boot',     level: 68, note: 'REST APIs, JWT, JPA' },
    { name: 'PostgreSQL',      level: 62, note: 'Queries, schema design' },
    { name: 'REST API Design', level: 70, note: 'Backend structuring' },
    { name: 'JWT Auth',        level: 58, note: 'Authentication basics' },
    { name: 'Docker',          level: 42, note: 'Learning containerization' },
  ],

  frontend: [
    { name: 'React',           level: 72, note: 'Components, props, hooks' },
    { name: 'JavaScript',      level: 74, note: 'ES6+, async/await' },
    { name: 'Tailwind CSS',    level: 70, note: 'Utility-first styling' },
    { name: 'Framer Motion',   level: 58, note: 'Animations and transitions' },
    { name: 'HTML & CSS',      level: 85, note: 'Semantic and responsive UI' },
  ],

  tools: [
    { name: 'Git & GitHub',    level: 72, note: 'Version control workflow' },
    { name: 'IntelliJ IDEA',   level: 78, note: 'Java development' },
    { name: 'VS Code',         level: 85, note: 'Frontend and general coding' },
    { name: 'Postman',         level: 68, note: 'API testing' },
    { name: 'Maven',           level: 55, note: 'Java build tool' },
    { name: 'Figma',           level: 40, note: 'Basic UI exploration' },
  ],
}

export const TECH_STACK = [
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'React',
  'Tailwind CSS',
  'Framer Motion',
  'Git',
  'Postman',
  'REST APIs',
  'JWT',
]