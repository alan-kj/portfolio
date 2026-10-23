import type { Project } from "../../data";
import styles from "./Work.module.css";
import WorkCard, { type WorkVariant } from "./WorkCard";

// Bento layout: the first project is featured, the next two stack beside it, the rest run full width.
function variantFor(index: number, total: number): WorkVariant {
  if (total < 3) return "wide";
  if (index === 0) return "feature";
  return index < 3 ? "side" : "wide";
}

export default function WorkGrid({ projects }: Readonly<{ projects: readonly Project[] }>) {
  const years = projects.map((project) => Number(project.year)).filter(Number.isFinite);
  const range = years.length ? `${Math.min(...years)} to ${Math.max(...years)}` : "";

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.header}>
        <h2 id="projects-title" className={styles.heading} data-reveal>
          A few things I&apos;ve built
        </h2>
        {range && (
          <p className={styles.range} data-reveal>
            Selected work, {range}
          </p>
        )}
      </div>
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <WorkCard
            key={project.slug}
            project={project}
            index={index}
            variant={variantFor(index, projects.length)}
          />
        ))}
      </ul>
    </section>
  );
}
