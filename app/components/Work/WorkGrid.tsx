import type { Project } from "../../data";
import styles from "./Work.module.css";
import WorkCard from "./WorkCard";

export default function WorkGrid({ projects }: Readonly<{ projects: readonly Project[] }>) {
  const years = projects.map((project) => Number(project.year)).filter(Number.isFinite);
  const range = years.length ? `${Math.min(...years)} to ${Math.max(...years)}` : "";

  return (
    <section className="band" aria-labelledby="projects-title">
      <div className={styles.header}>
        <h1 id="projects-title" className="section-title" data-reveal>
          A few things I&apos;ve built
        </h1>
        {range && (
          <p className={styles.range} data-reveal>
            Selected work, {range}
          </p>
        )}
      </div>
      <div className={styles.columns} aria-hidden="true">
        <span>year</span>
        <span>project</span>
        <span>role</span>
        <span>stack</span>
      </div>
      <ul className={styles.list}>
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}
