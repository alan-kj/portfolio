import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "../../data";
import styles from "./Work.module.css";

// One row of the project listing. The heading link stretches over the whole row.
export default function WorkCard({ project }: Readonly<{ project: Project }>) {
  return (
    <li className={styles.entry} data-reveal>
      <p className={styles.year}>{project.year}</p>
      <div className={styles.main}>
        <h3 className={styles.title}>
          <Link
            href={`/work/${project.slug}`}
            className={styles.rowLink}
            transitionTypes={["nav-forward"]}
          >
            {project.title}
            <ArrowUpRight className={styles.arrow} size={18} aria-hidden="true" />
          </Link>
        </h3>
        <p className={styles.text}>{project.text}</p>
      </div>
      <p className={styles.role}>{project.role}</p>
      <ul className={styles.tags} aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </li>
  );
}
