import { ArrowUpRight } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import { profile, projects, skills } from "./data";
import Reveal from "./motion/Reveal";

const navLinks = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
];

// Interim sections: Phases 2-6 replace each block with its own component.
export default function Home() {
  return (
    <>
      <Reveal />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header name={profile.name} links={navLinks} contactId="contact" />

      <main id="main" className="wrap">
        <Hero profile={profile} />

        <section id="projects" className="block" aria-labelledby="projects-title">
          <h2 id="projects-title" data-reveal>
            A few things I&apos;ve built
          </h2>
          <ul className="projects">
            {projects.map((project) => (
              <li key={project.title} data-reveal>
                <a href={project.href}>
                  <span className="meta">{project.year}</span>
                  <h3>
                    {project.title} <ArrowUpRight size={18} aria-hidden="true" />
                  </h3>
                  <p>{project.text}</p>
                  <span className="meta">{project.stack}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="block about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title" data-reveal>
              Good software feels simple
            </h2>
            {profile.about.map((paragraph) => (
              <p key={paragraph} data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
          <dl data-reveal>
            {skills.map((skill) => (
              <div key={skill.group}>
                <dt>{skill.group}</dt>
                <dd>{skill.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="block" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>
            Let&apos;s make it real.
          </h2>
          <p data-reveal>
            Want to talk about a project or a role? The best place to find me is GitHub.
          </p>
          <a className="button" href={profile.email ? `mailto:${profile.email}` : profile.github}>
            {profile.email ? "Send an email" : "Find me on GitHub"}{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>
      </main>

      <Footer name={profile.name} github={profile.github} />
    </>
  );
}
