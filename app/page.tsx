import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";
import Hero from "./components/Hero/Hero";
import WorkGrid from "./components/Work/WorkGrid";
import { experience, metrics, profile, projects, skills } from "./data";
import PageTransition from "./motion/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Hero profile={profile} />

        <WorkGrid projects={projects} />

        <Experience items={experience} />

        <About profile={profile} skills={skills} metrics={metrics} projects={projects} />

        <Contact profile={profile} />
      </main>
    </PageTransition>
  );
}
