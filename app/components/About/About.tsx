import type { Metric, Profile, Project, Skill } from "../../data";
import Skills from "../Skills/Skills";
import styles from "./About.module.css";

type AboutProps = Readonly<{
  profile: Profile;
  skills: readonly Skill[];
  metrics: readonly Metric[];
  projects: readonly Project[];
}>;

export default function About({ profile, skills, metrics, projects }: AboutProps) {
  return (
    <section className="band" aria-labelledby="about-title">
      <div className={styles.intro}>
        <h1 id="about-title" className="section-title" data-reveal>
          Good software feels simple
        </h1>
        <div className={styles.copy}>
          {profile.about.map((paragraph) => (
            <p key={paragraph} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <Skills skills={skills} metrics={metrics} projects={projects} />
    </section>
  );
}
