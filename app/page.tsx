import { ArrowUpRight } from "lucide-react";
import Hero from "./components/Hero/Hero";
import WorkGrid from "./components/Work/WorkGrid";
import { profile, projects, skills } from "./data";
import PageTransition from "./motion/PageTransition";

// Interim sections: Phases 2-6 replace each block with its own component.
export default function Home() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Hero profile={profile} />

        <WorkGrid projects={projects} />

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
    </PageTransition>
  );
}
