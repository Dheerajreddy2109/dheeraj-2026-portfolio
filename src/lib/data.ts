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

export type ProjectCategory = "all" | "fullstack" | "saas" | "platform";

export type Project = {
  index: string;
  name: string;
  url: string;
  href: string;
  tag: string;
  category: ProjectCategory;
  stack: string[];
  description: string;
  role: string;
  year: string;
  highlights: string[];
  accentColor: string;
  gradient: string;
  mockupStats?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    index: "01",
    name: "SAP Security Expert",
    url: "sapsecurityexpert.com",
    href: "https://sapsecurityexpert.com",
    tag: "Community Platform",
    category: "fullstack",
    stack: ["Next.js", "Node.js", "Express.js", "MySQL", "AWS"],
    description:
      "A custom-built full-stack community platform for SAP Security and GRC professionals — comparable in scope to a custom enterprise portal, built from the ground up without CMS bloat.",
    role: "Architected the Next.js frontend, Node.js/Express.js backend, and the entire MySQL schema. Engineered user accounts, community discussions, knowledge articles, and a tiered author/editor workflow. Deployed on AWS.",
    year: "2024–2025",
    accentColor: "#ff6b3d",
    gradient: "from-[#cf4520] to-[#f2a154]",
    highlights: [
      "Custom role-based permissions & JWT session management",
      "Optimized MySQL relational schema with indexing for fast discussion queries",
      "Content moderation queue with automated slug & SEO meta generation",
    ],
    mockupStats: [
      { label: "Architecture", value: "Full-Stack" },
      { label: "Deployment", value: "AWS" },
      { label: "Database", value: "MySQL" },
    ],
  },
  {
    index: "02",
    name: "SuccessWikis",
    url: "successwikis.com",
    href: "https://successwikis.com",
    tag: "Content Platform",
    category: "platform",
    stack: ["React.js", "PHP", "MySQL", "phpMyAdmin"],
    description:
      "A full-stack media platform where founders and entrepreneurs publish startup success stories, deep-dive profiles, and long-form growth breakdowns.",
    role: "Engineered the React frontend featuring instant full-text search, reading-time estimates, and dynamic story carousels, paired with a custom PHP/MySQL CMS backend managing drafts, tags, and asset uploads.",
    year: "2024",
    accentColor: "#3b82f6",
    gradient: "from-[#1f2a44] to-[#5b6ea8]",
    highlights: [
      "Sub-100ms article search with client-side indexing",
      "Dynamic social preview generation and SEO-optimized markup",
      "Custom markdown-to-HTML publishing pipeline in PHP",
    ],
    mockupStats: [
      { label: "Articles", value: "500+" },
      { label: "Frontend", value: "React.js" },
      { label: "Backend", value: "PHP/MySQL" },
    ],
  },
  {
    index: "03",
    name: "ClyftAI",
    url: "clyftai.com",
    href: "https://clyftai.com",
    tag: "SaaS Frontend",
    category: "saas",
    stack: ["React.js", "GSAP", "Tailwind CSS"],
    description:
      "An AI-powered SaaS tool that helps enterprise leaders analyse SAP licensing tiers, user access matrices, and segregation-of-duties (SoD) risk exposure.",
    role: "Developed a high-performance frontend build using GSAP ScrollTrigger timelines and SVG coordinate animations to bring complex compliance charts, audit reports, and dense risk matrices to life.",
    year: "2024",
    accentColor: "#10b981",
    gradient: "from-[#2f5d4f] to-[#8fb89a]",
    highlights: [
      "60fps scroll-driven dashboard data visualizations",
      "Interactive SoD conflict matrix with real-time risk severity filters",
      "Responsive enterprise-grade navigation with dark/light themes",
    ],
    mockupStats: [
      { label: "Motion", value: "GSAP 3" },
      { label: "Focus", value: "SAP Risk" },
      { label: "FPS", value: "60 FPS" },
    ],
  },
  {
    index: "04",
    name: "ThreatSenseAI",
    url: "threatsenseai.com",
    href: "https://threatsenseai.com",
    tag: "SaaS Frontend",
    category: "saas",
    stack: ["React.js", "GSAP", "Tailwind CSS"],
    description:
      "An AI-driven cybersecurity intelligence platform visualizing zero-day vulnerability alerts, perimeter breaches, and compliance telemetry.",
    role: "Built animated alert-monitoring dashboards, live threat status panels, and SOC integration views — delivering a motion-rich cockpit UI for CISOs and security operations teams.",
    year: "2024",
    accentColor: "#ef4444",
    gradient: "from-[#7a2f3b] to-[#e08a8a]",
    highlights: [
      "Real-time event pulse animation and visual threat level gauges",
      "Staggered incident triage timeline with GSAP transitions",
      "Accessible high-contrast palette for mission-critical monitoring",
    ],
    mockupStats: [
      { label: "Security", value: "SOC Cockpit" },
      { label: "Interface", value: "Cyber UI" },
      { label: "Motion", value: "GSAP" },
    ],
  },
  {
    index: "05",
    name: "S4access",
    url: "s4access.com",
    href: "https://s4access.com",
    tag: "Corporate Site",
    category: "platform",
    stack: ["Next.js", "Responsive Design", "Tailwind CSS"],
    description:
      "A corporate digital presence for a global SAP access-management advisory firm representing 140+ professionals across 300+ enterprise client engagements.",
    role: "Built fully responsive Next.js pages covering service offerings, interactive case studies, and insights — designed to communicate authority and convert Fortune 500 prospects.",
    year: "2024",
    accentColor: "#0ea5e9",
    gradient: "from-[#12504c] to-[#5fc4b8]",
    highlights: [
      "High Lighthouse scores across Performance, Accessibility, and SEO",
      "Modular block-based layout architecture for easy marketing updates",
      "Custom enquiry funnel with lead routing",
    ],
    mockupStats: [
      { label: "Projects", value: "300+" },
      { label: "Speed", value: "98/100" },
      { label: "Framework", value: "Next.js" },
    ],
  },
  {
    index: "06",
    name: "The Sase Tech",
    url: "thesase.tech",
    href: "https://thesase.tech",
    tag: "Marketing Site",
    category: "platform",
    stack: ["React.js", "GSAP", "Responsive Design"],
    description:
      "A marketing website for a next-generation Secure Access Service Edge (SASE) network architecture provider.",
    role: "Used GSAP scroll animation and timeline sequencing to turn complex cloud network security concepts into intuitive, interactive visual stories for enterprise IT buyers.",
    year: "2024",
    accentColor: "#8b5cf6",
    gradient: "from-[#3d2b52] to-[#a186c9]",
    highlights: [
      "Scroll-pinned architectural diagram showing traffic encryption routes",
      "Smooth micro-interactions on product tier comparisons",
      "Adaptive typography and fluid viewport scaling",
    ],
    mockupStats: [
      { label: "Domain", value: "SASE / Cloud" },
      { label: "Animations", value: "GSAP Scrub" },
      { label: "Format", value: "Single Page" },
    ],
  },
  {
    index: "07",
    name: "Loooped.in",
    url: "loooped.in",
    href: "https://loooped.in",
    tag: "Workdesk Platform",
    category: "fullstack",
    stack: ["React.js (TSX)", "Node.js", "Express.js", "MySQL", "Docker"],
    description:
      "A productivity workdesk web app for organising day-to-day work, tracking cross-team deliverables, and managing project sprint boards.",
    role: "Built end to end in TypeScript React with a structured Node.js/Express.js REST API and MySQL database, packaged into Docker containers for reliable reproducible deployment.",
    year: "2024",
    accentColor: "#f59e0b",
    gradient: "from-[#5c3d2e] to-[#c99a6b]",
    highlights: [
      "Strict TypeScript types across frontend state and API payloads",
      "Docker multi-stage build containerization for automated deployment",
      "Drag-and-drop task workflows with optimistic UI updates",
    ],
    mockupStats: [
      { label: "DevOps", value: "Docker" },
      { label: "Type Safe", value: "TypeScript" },
      { label: "Storage", value: "MySQL" },
    ],
  },
  {
    index: "08",
    name: "WebAnatomy",
    url: "webanatomy.in",
    href: "https://webanatomy.in",
    tag: "Web Platform",
    category: "fullstack",
    stack: ["Next.js", "PHP", "Docker", "MySQL"],
    description:
      "A web engineering platform built with Next.js on the frontend and an enterprise PHP service layer, packaged for containerized deployment.",
    role: "Built the Next.js frontend and PHP backend services, designed database schemas, and configured Docker production environments.",
    year: "2024",
    accentColor: "#14b8a6",
    gradient: "from-[#3a3630] to-[#8b846c]",
    highlights: [
      "Hybrid Next.js SSR + PHP microservice communication",
      "Zero-downtime Docker container updates on live servers",
      "Structured error telemetry and request logging",
    ],
    mockupStats: [
      { label: "Tech", value: "Hybrid Stack" },
      { label: "Containers", value: "Docker" },
      { label: "Frontend", value: "Next.js" },
    ],
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
