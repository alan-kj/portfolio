import type { Metric, Project, Skill } from "../../data";
import styles from "./Skills.module.css";

type SkillsProps = Readonly<{
  skills: readonly Skill[];
  metrics: readonly Metric[];
  projects: readonly Project[];
}>;

// Used when `metrics` in data.ts is empty: figures counted from the projects, never invented.
function metricsFromProjects(projects: readonly Project[]): Metric[] {
  if (projects.length === 0) return [];

  const years = projects.map((project) => Number(project.year)).filter(Number.isFinite);
  const technologies = new Set(projects.flatMap((project) => project.tags)).size;
  const found: Metric[] = [
    { value: String(projects.length), label: "Projects on this page" },
    { value: String(technologies), label: "Technologies used across them" },
  ];
  if (years.length) {
    found.push({
      value: `${Math.min(...years)} to ${Math.max(...years)}`,
      label: "Years the work covers",
    });
  }
  return found;
}

export default function Skills({ skills, metrics, projects }: SkillsProps) {
  const figures = metrics.length > 0 ? metrics : metricsFromProjects(projects);

  return (
    <div className={styles.wrap}>
      <ul className={styles.bento} aria-label="Skills">
        {skills.map((skill) => (
          <li key={skill.group} className={styles.cell} data-reveal>
            <div className={styles.tile}>
              <h3 className={styles.group}>{skill.group}</h3>
              <ul className={styles.chips}>
                {skill.items.split(",").map((item) => (
                  <li key={item}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {figures.length > 0 && (
        <ul className={styles.metrics} aria-label="Highlights">
          {figures.map((figure) => (
            <li key={figure.label} className={styles.metric} data-reveal>
              <p className={styles.value}>{figure.value}</p>
              <p className={styles.label}>{figure.label}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
