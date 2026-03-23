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
