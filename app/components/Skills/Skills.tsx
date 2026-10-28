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
      <dl className={styles.table} aria-label="Skills">
        {skills.map((skill) => (
          <div key={skill.group} className={styles.line} data-reveal>
            <dt>{skill.group}</dt>
            <dd>
              {skill.items
                .split(",")
                .map((item) => item.trim())
                .join(", ")}
            </dd>
          </div>
        ))}
      </dl>

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
