import { ArrowUpRight } from "lucide-react";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Hero from "./components/Hero/Hero";
import WorkGrid from "./components/Work/WorkGrid";
import { experience, metrics, profile, projects, skills } from "./data";
import PageTransition from "./motion/PageTransition";

// Interim sections: Phases 2-6 replace each block with its own component.
export default function Home() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Hero profile={profile} />

        <WorkGrid projects={projects} />

        <Experience items={experience} />

        <About profile={profile} skills={skills} metrics={metrics} projects={projects} />

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
