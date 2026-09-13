export const site = {
  name: "Gyaneshor Singh",
  shortName: "Gyaneshor",
  role: "Backend Developer",
  status: "Currently working as a Backend Developer",
  title: "Gyaneshor Singh | Backend Developer",
  description:
    "Backend Developer and Software Engineer building reliable APIs, scalable systems, and digital products.",
  domains: ["www.gyaneshor.com", "www.gyaneshor.com.np"],
  email: "gyaneshorsingh9@gmail.com",
  phone: "+9779811010510",
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbzL2IriTIpqRFGSeMOmHCX5jHOSnk6-wcWdIMc-DXyZbukN8JLeUfG_vEzeru2_t6Oj5Q/exec",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/gyaneshorsingh1" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gyaneshor-prasad-singh/",
  },
  { label: "Instagram", href: "https://www.instagram.com/princerahul132" },
  { label: "Facebook", href: "https://www.facebook.com/rahulsingh.hancy1" },
] as const;

export const hero = {
  status: site.status,
  brand: site.name,
  headline: [
    "Building reliable backend",
    "systems and digital products",
    "that move ideas forward.",
  ],
  intro:
    "Backend Developer specializing in scalable APIs, data-driven systems, and full-stack web applications with a strong focus on performance, clarity, and maintainable architecture.",
  primaryCta: { label: "View Projects", href: "/projects" },
  secondaryCta: { label: "Let's Work Together", href: "/contact" },
};

export const about = {
  statement: "Software engineer focused on building useful, reliable systems.",
  paragraphs: [
    "I'm a Backend Developer building full-stack web applications that deliver strong performance and a clear user experience. I care about clean, maintainable code and continuously refining how systems are designed and shipped.",
    "I also share knowledge related to web development to help others in the Dev Community. Feel free to connect with me on LinkedIn where I post useful content related to programming.",
    "I'm open to exciting opportunities where I can contribute, learn, and grow.",
  ],
};

export type ExperienceItem = {
  role: string;
  company?: string;
  duration: string;
  description: string;
  technologies: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Backend Developer",
    duration: "Present",
    description:
      "Building and maintaining backend services, REST APIs, and data layers for production web applications. Collaborating across the stack to ship reliable features with Node.js, Express, MongoDB, and Laravel.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Laravel",
      "Next.js",
      "Git",
    ],
  },
];

export const skillGroups = [
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "Laravel"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js"],
  },
  {
    label: "Tools",
    items: ["Git & GitHub"],
  },
] as const;

export type Project = {
  id: string;
  title: string;
  company?: string;
  description: string;
  technologies: string[];
  href?: string;
  image: string;
  cursorLabel: string;
};

export const projects: Project[] = [
  {
    id: "sajilo-scale",
    title: "Sajilo Scale",
    company: "Martin Softech",
    description:
      "Professional software work delivered at Martin Softech — focused on backend systems, application structure, and shipping reliable product features.",
    technologies: ["Node.js", "Express.js", "MongoDB", "React", "Laravel"],
    image: "/images/projects/sajilo-scale.svg",
    cursorLabel: "EXPLORE",
  },
  {
    id: "maasparsh",
    title: "MaaSparsh",
    company: "NRKS",
    description:
      "An Ayurveda & wellness e-commerce platform featuring product listings, category filters, cart management, secure checkout, and responsive UI for all devices.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Next.js"],
    href: "https://maasparsh.com",
    image: "/images/projects/maasparsh.svg",
    cursorLabel: "VIEW",
  },
  {
    id: "rare-robo",
    title: "Rare Robo",
    description:
      "An AI-driven platform showcasing innovative robotics solutions with modern design and interactivity.",
    technologies: ["React", "JavaScript", "Next.js"],
    href: "https://rarerobo.netlify.app",
    image: "/images/projects/rare-robo.svg",
    cursorLabel: "VIEW",
  },
];
