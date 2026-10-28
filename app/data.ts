export type Status = {
  state: "available" | "busy";
  label: string;
  focus: string;
};

export type Profile = {
  name: string;
  role: string; // the job title shown in the hero, page titles and search results
  status: Status;
  headline: string;
  intro: string;
  about: readonly string[];
  github: string;
  linkedin: string; // "" hides every LinkedIn link
  email: string;
  resumeUrl: string; // "" hides every resume link
  resumeFileName: string; // name the browser saves a same-site PDF as
};

type CaseStudySection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  year: string;
  title: string;
  text: string;
  role: string;
  tags: readonly string[];
  preview?: string; // image under public/, e.g. "/previews/orbit-api.webp"; an abstract motif shows without it
  sections?: readonly CaseStudySection[]; // the case-study page at /projects/<slug>
  href: string;
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
  impact: readonly string[];
};

export type Education = {
  degree: string;
  institution: string;
  university: string;
  period: string;
  location: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Skill = {
  group: string;
  items: string;
};

// Edit this file to change the site content.
export const profile: Profile = {
  name: "Alan K J",
  role: "Software Engineer",
  status: {
    state: "available",
    label: "Open to opportunities",
    focus: "CSE @ SCET",
  }, // the pill in the hero; set state to "busy" when you're not taking work
  headline: "I build reliable backends and clean web apps.",
  intro: "I turn messy requirements into simple, well-tested software that stays easy to change.",
  about: [
    "I care about clear code, good naming and tests that catch problems before users do.",
    "I like working across the stack, from database design to the interface people actually touch.",
  ],
  github: "https://github.com/alan-kj",
  linkedin: "https://www.linkedin.com/in/alan-k-j-37b130373/",
  resumeUrl: "/resume.pdf", // a file in public/, or a full URL if hosted elsewhere (Drive, Notion)
  resumeFileName: "Alan_KJ_Resume.pdf",
  email: "hello@example.com", // placeholder: replace with your address; clear it to show GitHub only
};

// Placeholder case-study text. Replace it per project with the real story.
const placeholderSections: readonly CaseStudySection[] = [
  {
    heading: "The problem",
    body: "Describe what was missing or broken, and who it affected.",
  },
  {
    heading: "The approach",
    body: "Explain the key decisions you made and why you made them.",
  },
  {
    heading: "The outcome",
    body: "Say what changed once it shipped, with real numbers if you have them.",
  },
];

// Placeholder projects: replace with your real ones. The first project is the featured card.
export const projects: Project[] = [
  {
    slug: "orbit-api",
    year: "2026",
    title: "Orbit API",
    text: "A payments API with retries and clear error messages for developers.",
    role: "Backend",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    sections: placeholderSections,
    href: "https://github.com/alan-kj",
  },
  {
    slug: "tidepool-notes",
    year: "2025",
    title: "Tidepool Notes",
    text: "A note app that links related ideas and finds notes by meaning.",
    role: "Full-stack",
    tags: ["Next.js", "TypeScript"],
    sections: placeholderSections,
    href: "https://github.com/alan-kj",
  },
  {
    slug: "signal-dashboard",
    year: "2024",
    title: "Signal Dashboard",
    text: "A live view of server health with alerts written in plain language.",
    role: "Front end",
    tags: ["React", "WebSockets"],
    sections: placeholderSections,
    href: "https://github.com/alan-kj",
  },
  {
    slug: "ledger-cli",
    year: "2023",
    title: "Ledger CLI",
    text: "An open-source command-line tool that tracks expenses from plain text files.",
    role: "Open source",
    tags: ["Go"],
    sections: placeholderSections,
    href: "https://github.com/alan-kj",
  },
];

export const skills: Skill[] = [
  { group: "Languages", items: "JavaScript, TypeScript, Python, Go, SQL" },
  { group: "Front end", items: "React, Next.js, CSS" },
  { group: "Back end", items: "Node.js, REST APIs, PostgreSQL, Redis" },
  { group: "Tools", items: "Git, Docker, AWS, CI/CD" },
];

// Placeholder experience, newest first. Replace it with your own history; the section hides if empty.
export const experience: Experience[] = [
  {
    role: "Your role title",
    org: "Company or team",
    period: "2024 to now",
    summary: "Say in a sentence what you owned and who you worked with.",
    impact: [
      "Add a result you can measure, such as a faster response time or fewer incidents.",
      "Add a second result, such as a system you shipped or a process you improved.",
    ],
  },
  {
    role: "Your earlier role",
    org: "Previous company or team",
    period: "2022 to 2024",
    summary: "Describe the work in a sentence.",
    impact: ["Add one result from this role."],
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Sahrdaya College of Engineering & Technology (Autonomous)",
    university: "APJ Abdul Kalam Technological University (KTU)",
    period: "2023 to 2027",
    location: "Kodakara, Kerala",
  },
];

// Optional headline figures for the skills bento, e.g. { value: "99.9%", label: "Uptime on Orbit API" }.
// Leave it empty and the tiles show figures counted from `projects` instead.
export const metrics: Metric[] = [];
