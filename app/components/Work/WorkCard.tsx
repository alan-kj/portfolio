import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../data";
import Spotlight from "../../motion/Spotlight";
import styles from "./Work.module.css";
import WorkPreview from "./WorkPreview";

export type WorkVariant = "feature" | "side" | "wide";

type WorkCardProps = Readonly<{
  project: Project;
  index: number;
  variant: WorkVariant;
}>;

export default function WorkCard({ project, index, variant }: WorkCardProps) {
  return (
    <li className={`${styles.item} ${styles[variant]}`} data-reveal>
      <Spotlight className={styles.card}>
        <div className={styles.preview}>
          <WorkPreview title={project.title} preview={project.preview} index={index} />
        </div>
        <div className={styles.body}>
          <p className={styles.meta}>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </p>
          <h3 className={styles.title}>
            <a href={project.href} className={styles.cardLink}>
              {project.title}
              <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
            </a>
          </h3>
          <p className={styles.text}>{project.text}</p>
          <ul className={styles.tags} aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </Spotlight>
    </li>
  );
}
