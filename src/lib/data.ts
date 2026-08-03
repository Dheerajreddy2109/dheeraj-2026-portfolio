export const profile = {
  fullName: "Dheeraj Sai Charan Reddy",
  name: "Dheeraj Reddy",
  role: "Web Developer",
  location: "Hyderabad, India",
  email: "reddydheeraj2109@gmail.com",
  phone: "+91 6301117473",
  linkedin: "https://linkedin.com/in/dheeraj-sai-charan-reddy",
  linkedinLabel: "linkedin.com/in/dheeraj-sai-charan-reddy",
  github: "https://github.com/Dheerajreddy2109",
  githubLabel: "github.com/Dheerajreddy2109",
  summary:
    "Web Developer with hands-on experience building and shipping full-stack web applications end to end — from animated React.js frontends with GSAP to Node.js/Express.js backends and MySQL databases. I've delivered production projects across SaaS platforms, community apps, and enterprise tools, and I'm just as comfortable owning the full web layer solo in a startup as I am collaborating inside a larger engineering team.",
  available: true,
} as const;

export const heroStack = [
  "NEXT.JS",
  "REACT.JS",
  "NODE.JS",
  "EXPRESS.JS",
  "MYSQL",
  "GSAP",
];

export const stats = [
  { value: 8, suffix: "+", label: "Production platforms shipped" },
  { value: 2, suffix: "+", label: "Years building full-stack, freelance" },
  { value: 100, suffix: "%", label: "Ownership — UI to deployment" },
] as const;

export const experience = {
  role: "Web Developer",
  org: "Freelance / Independent Projects",
  location: "Hyderabad, India",
  start: "Jul 2024",
  end: "Present",
  achievements: [
    "Designed and delivered multiple production web applications — SaaS dashboards, single-page apps, community platforms, and marketing sites — owning everything from UI design through API development and deployment.",
    "Built scroll-driven, animated interfaces with GSAP (timelines, ScrollTriggers, entrance sequences) that measurably improved visual quality and engagement across client projects.",
    "Developed reusable React component libraries that streamlined recurring patterns and cut build time across projects.",
    "Built and maintained REST APIs with Node.js and Express.js — routing, JWT authentication, middleware, validation, and structured error handling.",
    "Designed and managed MySQL databases from the ground up — schema design, query optimisation, Sequelize ORM integration, and phpMyAdmin administration for multiple live platforms.",
    "Handled complete deployment pipelines — DNS configuration, cPanel hosting, SSL, SMTP email, and post-launch monitoring.",
  ],
} as const;

export type Project = {
  index: string;
  name: string;
  url: string;
  href: string;
  tag: string;
  stack: string[];
  description: string;
  role: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "SAP Security Expert",
    url: "sapsecurityexpert.com",
    href: "https://sapsecurityexpert.com",
    tag: "Community Platform",
    stack: ["Next.js", "Node.js", "Express.js", "MySQL"],
    description:
      "A custom-built full-stack community platform for SAP Security and GRC professionals — comparable in scope to a WordPress install, built entirely from scratch.",
    role: "Built the Next.js frontend, the Node.js/Express.js backend, and designed the entire MySQL schema — user accounts, community discussions, knowledge articles, and a full content workflow for authors and editors. Deployed on AWS.",
  },
  {
    index: "02",
    name: "SuccessWikis",
    url: "successwikis.com",
    href: "https://successwikis.com",
    tag: "Content Platform",
    stack: ["React.js", "PHP", "MySQL", "phpMyAdmin"],
    description:
      "A full-stack content platform where founders and entrepreneurs publish startup success stories and long-form blogs.",
    role: "Built the React.js frontend — searchable articles, story cards, smooth navigation — plus the PHP/MySQL CMS backend handling authoring, publishing, and reader flows.",
  },
  {
    index: "03",
    name: "ClyftAI",
    url: "clyftai.com",
    href: "https://clyftai.com",
    tag: "SaaS Frontend",
    stack: ["React.js", "GSAP"],
    description:
      "A SaaS tool that helps enterprises analyse SAP licensing, user access, and segregation-of-duties risk.",
    role: "Frontend build using GSAP animation and scroll-triggered transitions to bring dashboard UI and dense data visualisations to life.",
  },
  {
    index: "04",
    name: "ThreatSenseAI",
    url: "threatsenseai.com",
    href: "https://threatsenseai.com",
    tag: "SaaS Frontend",
    stack: ["React.js", "GSAP"],
    description: "An AI-driven enterprise cybersecurity platform.",
    role: "Built animated alert-monitoring dashboards, threat status panels, and integration views — a motion-rich UI for IT leadership and compliance teams.",
  },
  {
    index: "05",
    name: "S4access",
    url: "s4access.com",
    href: "https://s4access.com",
    tag: "Corporate Site",
    stack: ["Next.js", "Responsive Design"],
    description:
      "A global SAP access-management firm — 140+ professionals, 300+ projects.",
    role: "Built fully responsive pages covering services, case studies, and blog sections, designed to communicate authority and build trust with enterprise buyers.",
  },
  {
    index: "06",
    name: "The Sase Tech",
    url: "thesase.tech",
    href: "https://thesase.tech",
    tag: "Marketing Site",
    stack: ["React.js", "GSAP", "Responsive Design"],
    description: "A marketing website for a SASE network security provider.",
    role: "Used GSAP scroll animation and timeline sequencing to make complex cybersecurity concepts visually engaging for enterprise IT audiences.",
  },
  {
    index: "07",
    name: "Loooped.in",
    url: "loooped.in",
    href: "https://loooped.in",
    tag: "Workdesk Platform",
    stack: ["React.js (TSX)", "Node.js", "Express.js", "MySQL", "Docker"],
    description:
      "A workdesk-style web app for organising day-to-day work, built end to end and shipped as a containerized deployment.",
    role: "Built the full-stack app in TypeScript React with a Node.js/Express.js API and MySQL, then containerized it with Docker for deployment.",
  },

  {
    index: "08",
    name: "WebAnatomy",
    url: "webanatomy.in",
    href: "https://webanatomy.in",
    tag: "Web Platform",
    stack: ["Next.js", "PHP", "Docker"],
    description:
      "A web platform built with a Next.js frontend and a PHP backend, packaged for containerized deployment.",
    role: "Built the Next.js frontend and PHP backend, and containerized the app with Docker for deployment.",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "Responsive Design",
      "SPAs",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PHP", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["MySQL", "Sequelize", "phpMyAdmin", "MongoDB", "Firebase"],
  },
  {
    category: "Tools & Ops",
    items: [
      "Git",
      "GitHub",
      "Vite",
      "cPanel",
      "SMTP",
      "Domain & Hosting",
      "WordPress",
    ],
  },
] as const;

export const education = {
  degree: "B.Tech — Computer Science & Engineering",
  school:
    "Maharaj Vijayaram Gajapathi Raj College of Engineering (Autonomous)",
  start: "2019",
  end: "2023",
};

export const certifications = [
  { name: "Java Full Stack Certification", org: "Excler Institute" },
  { name: "Python Certification", org: "Cisco Networking Academy" },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Telugu", level: "Native" },
  { name: "Hindi", level: "Fluent" },
];

export const sections = [
  { id: "hero", index: "00", label: "Intro" },
  { id: "about", index: "01", label: "About" },
  { id: "work", index: "02", label: "Work" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "education", index: "05", label: "Education" },
  { id: "contact", index: "06", label: "Contact" },
] as const;
