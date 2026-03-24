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
    title: "Metro Navigator India",
    tagline: "Route optimization for Indian metro networks",
    description: "Full-stack application using Dijkstra's algorithm to find optimal metro routes across Indian cities. Built with Java Spring Boot backend and React frontend.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "React", "Leaflet.js", "Dijkstra's"],
    github: "https://github.com/yourhandle/metro-navigator",
    live: "#",
    featured: true,
    status: "In Progress",
  },
  {
    id: 2,
    title: "GitHub Profile Card Generator",
    tagline: "Beautiful dev cards from GitHub data",
    description: "Generates shareable, styled profile cards using GitHub's public API. Customizable themes and instant PNG export.",
    tech: ["React", "GitHub API", "Canvas API"],
    github: "#",
    live: "#",
    featured: false,
    status: "Complete",
  },
];
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