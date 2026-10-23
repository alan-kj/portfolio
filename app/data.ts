export type Status = {
  state: "available" | "busy";
  label: string;
  focus: string;
};

export type Profile = {
  name: string;
  role: string;
  status: Status;
  headline: string;
  intro: string;
  about: readonly string[];
  github: string;
  githubLabel: string;
  email: string;
};

export type Project = {
  year: string;
  title: string;
  text: string;
  stack: string;
  href: string;
};

export type Skill = {
  group: string;
  items: string;
};

// Edit this file to change the site content.
export const profile: Profile = {
  name: "Alan K J",
  role: "Software engineer",
  status: {
    state: "available",
    label: "Available for new work",
    focus: "Backend APIs and PostgreSQL",
  }, // the pill in the hero; set state to "busy" when you're not taking work
  headline: "I build reliable backends and clean web apps.",
  intro: "I turn messy requirements into simple, well-tested software that stays easy to change.",
  about: [
    "I care about clear code, good naming and tests that catch problems before users do.",
    "I like working across the stack, from database design to the interface people actually touch.",
  ],
  github: "https://github.com/alan-kj",
  githubLabel: "github.com/alan-kj",
  email: "", // add your email to show it in the contact section
};

// Placeholder projects: replace with your real ones.
export const projects: Project[] = [
  {
    year: "2026",
    title: "Orbit API",
    text: "A payments API with retries and clear error messages for developers.",
    stack: "Node.js, PostgreSQL, Docker",
    href: "https://github.com/alan-kj",
  },
  {
    year: "2025",
    title: "Tidepool Notes",
    text: "A note app that links related ideas and finds notes by meaning.",
    stack: "Next.js, TypeScript",
    href: "https://github.com/alan-kj",
  },
  {
    year: "2024",
    title: "Signal Dashboard",
    text: "A live view of server health with alerts written in plain language.",
    stack: "React, WebSockets",
    href: "https://github.com/alan-kj",
  },
  {
    year: "2023",
    title: "Ledger CLI",
    text: "An open-source command-line tool that tracks expenses from plain text files.",
    stack: "Go",
    href: "https://github.com/alan-kj",
  },
];

export const skills: Skill[] = [
  { group: "Languages", items: "JavaScript, TypeScript, Python, Go, SQL" },
  { group: "Front end", items: "React, Next.js, CSS" },
  { group: "Back end", items: "Node.js, REST APIs, PostgreSQL, Redis" },
  { group: "Tools", items: "Git, Docker, AWS, CI/CD" },
];
