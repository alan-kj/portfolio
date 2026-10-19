import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  Layers3,
  Mail,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { Badge, Button, Card, Heading, Text } from "@radix-ui/themes";
import { profile, projects, skills } from "./data";
import Motion from "./Motion";
import Typewriter from "./Typewriter";
import { ThemeToggle } from "./ThemeProvider";

function CodeLine({ children }: Readonly<{ children: ReactNode }>) {
  return <span className="code-line">{children}</span>;
}

function SectionTitle({
  eyebrow,
  id,
  children,
}: Readonly<{
  eyebrow: string;
  id: string;
  children: ReactNode;
}>) {
  return (
    <div className="section-title" data-reveal>
      <Text as="span" className="eyebrow">
        {eyebrow}
      </Text>
      <Heading as="h2" id={id}>
        {children}
      </Heading>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Motion />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <div className="ambient-grid" />
        <i className="ambient-glow glow-one" />
        <i className="ambient-glow glow-two" />
      </div>

      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="brand" aria-label={`${profile.name}, home`}>
            <span className="brand-mark" aria-hidden="true">
              A.
            </span>
            <span>{profile.name}</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#projects">Work</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-contact">
              Get in touch <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="main" className="wrap">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Badge className="hero-badge" variant="soft" radius="full">
              <Sparkles size={13} aria-hidden="true" />
              Software engineer
            </Badge>
            <Heading as="h1" id="hero-title" className="hero-title">
              {profile.name.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} className="word">
                  <span>{word}</span>
                </span>
              ))}
            </Heading>
            <p className="role">
              <Typewriter words={profile.roles} />
            </p>
            <p className="lead rise">{profile.headline}</p>
            <p className="intro rise">{profile.intro}</p>
            <div className="hero-actions rise">
              <Button asChild className="button-primary button-shine" size="3" radius="full">
                <a href="#projects">
                  Explore my work <ArrowDown size={16} aria-hidden="true" />
                </a>
              </Button>
              <Button asChild className="button-secondary" size="3" variant="outline" radius="full">
                <a href={profile.github}>
                  <CodeXml size={16} aria-hidden="true" /> GitHub
                </a>
              </Button>
            </div>
            <div className="hero-note rise">
              <span className="note-line" aria-hidden="true" />
              <Text as="span">Thoughtful software, from data layer to the details.</Text>
            </div>
          </div>

          <Card className="code-card" variant="surface" size="3" data-reveal>
            <div className="code-topbar">
              <div className="window-controls" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="code-filename">alan.ts</span>
              <Badge variant="soft" radius="full" className="code-label">
                profile
              </Badge>
            </div>
            <pre className="code-content" aria-label="A short summary of Alan's engineering focus">
              <code>
                <CodeLine>
                  <b className="code-keyword">const</b> engineer = {"{"}
                </CodeLine>
                <CodeLine>
                  {" "}
                  role: <b className="code-string">&quot;Software engineer&quot;</b>,
                </CodeLine>
                <CodeLine> focus: [</CodeLine>
                <CodeLine>
                  {" "}
                  <b className="code-string">&quot;APIs&quot;</b>,{" "}
                  <b className="code-string">&quot;databases&quot;</b>,
                </CodeLine>
                <CodeLine>
                  {" "}
                  <b className="code-string">&quot;web apps&quot;</b>,
                </CodeLine>
                <CodeLine> ],</CodeLine>
                <CodeLine> stack: [</CodeLine>
                <CodeLine>
                  {" "}
                  <b className="code-string">&quot;TypeScript&quot;</b>,{" "}
                  <b className="code-string">&quot;Node.js&quot;</b>,
                </CodeLine>
                <CodeLine>
                  {" "}
                  <b className="code-string">&quot;Go&quot;</b>,{" "}
                  <b className="code-string">&quot;PostgreSQL&quot;</b>,
                </CodeLine>
                <CodeLine> ],</CodeLine>
                <CodeLine> values: [</CodeLine>
                <CodeLine>
                  {" "}
                  <b className="code-string">&quot;simple&quot;</b>,{" "}
                  <b className="code-string">&quot;tested&quot;</b>,
                </CodeLine>
                <CodeLine> ],</CodeLine>
                <CodeLine>{"};"}</CodeLine>
              </code>
            </pre>
            <div className="code-footer">
              <span className="code-status" aria-hidden="true" />
              <Text as="span">Built with care</Text>
              <Layers3 size={14} aria-hidden="true" />
            </div>
          </Card>
        </section>

        <section id="projects" className="content-section" aria-labelledby="projects-title">
          <SectionTitle id="projects-title" eyebrow="Selected work">
            A few things I&apos;ve built
          </SectionTitle>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="project-card"
                variant="surface"
                size="3"
                data-reveal
              >
                <div className="project-meta">
                  <Badge variant="soft" radius="full" className="project-year">
                    {project.year}
                  </Badge>
                  <ArrowUpRight className="project-icon" size={18} aria-hidden="true" />
                </div>
                <Heading as="h3" className="project-heading">
                  <a href={project.href}>
                    {project.title}
                    <span className="sr-only"> (project)</span>
                  </a>
                </Heading>
                <Text as="p" className="project-description">
                  {project.text}
                </Text>
                <div className="project-bottom">
                  <Text as="span" className="project-index">
                    0{index + 1}
                  </Text>
                  <Text as="span" className="project-stack">
                    {project.stack}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="about" className="content-section about-section" aria-labelledby="about-title">
          <div className="about-copy">
            <SectionTitle id="about-title" eyebrow="A little about me">
              Good software feels simple
            </SectionTitle>
            {profile.about.map((paragraph) => (
              <Text key={paragraph} as="p" className="about-paragraph" data-reveal>
                {paragraph}
              </Text>
            ))}
          </div>
          <div className="skills-panel" data-reveal>
            <div className="skills-heading">
              <div>
                <Text as="span" className="eyebrow">
                  What I work with
                </Text>
                <Heading as="h3">Tools of the trade</Heading>
              </div>
              <Layers3 size={20} aria-hidden="true" />
            </div>
            <dl className="skills-list">
              {skills.map((skill) => (
                <div className="skill-row" key={skill.group}>
                  <dt>{skill.group}</dt>
                  <dd>{skill.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <Card className="contact-card" variant="surface" size="3" data-reveal>
            <div className="contact-copy">
              <Text as="span" className="eyebrow">
                Have a good one in mind?
              </Text>
              <Heading as="h2" id="contact-title">
                Let&apos;s make it real.
              </Heading>
              <Text as="p">
                Want to talk about a project or a role? The best place to find me is GitHub.
              </Text>
              <Button asChild className="button-primary contact-button" size="3" radius="full">
                <a href={profile.github}>
                  <CodeXml size={16} aria-hidden="true" /> Find me on GitHub{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="contact-decoration" aria-hidden="true">
              <Mail size={74} strokeWidth={1} />
            </div>
            {profile.email && (
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            )}
          </Card>
        </section>
      </main>

      <footer className="site-footer wrap">
        <a href="#top" className="footer-brand">
          {profile.name}
        </a>
        <Text as="span">© {new Date().getFullYear()} · Built with intention.</Text>
        <a href={profile.github} className="footer-link">
          <CodeXml size={16} aria-hidden="true" /> GitHub{" "}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
