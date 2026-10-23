import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
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
        <ViewTransition name={`work-${project.slug}`} share="morph" default="none">
          <div className={styles.preview}>
            <WorkPreview title={project.title} preview={project.preview} index={index} />
          </div>
        </ViewTransition>
        <div className={styles.body}>
          <p className={styles.meta}>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </p>
          <h3 className={styles.title}>
            <Link
              href={`/work/${project.slug}`}
              className={styles.cardLink}
              transitionTypes={["nav-forward"]}
            >
              {project.title}
              <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
            </Link>
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
