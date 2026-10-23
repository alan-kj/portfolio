import type { Experience as Role } from "../../data";
import styles from "./Experience.module.css";

export default function Experience({ items }: Readonly<{ items: readonly Role[] }>) {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="band" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section-title" data-reveal>
        Where I&apos;ve worked
      </h2>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={`${item.org}-${item.period}`} className={styles.item} data-reveal>
            <p className={styles.period}>{item.period}</p>
            <div className={styles.body}>
              <h3 className={styles.role}>{item.role}</h3>
              <p className={styles.org}>{item.org}</p>
              <p className={styles.summary}>{item.summary}</p>
              <ul className={styles.impact} aria-label="Impact">
                {item.impact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
