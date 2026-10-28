import type { Education, Experience as Role } from "../../data";
import styles from "./Experience.module.css";

type Entry = {
  key: string;
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  impact?: readonly string[];
};

type ExperienceProps = Readonly<{
  items: readonly Role[];
  education: readonly Education[];
}>;

function Timeline({ entries, Title }: Readonly<{ entries: readonly Entry[]; Title: "h2" | "h3" }>) {
  return (
    <ol className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.key} className={styles.item} data-reveal>
          <p className={styles.period}>{entry.period}</p>
          <div className={styles.body}>
            <Title className={styles.role}>{entry.title}</Title>
            <p className={styles.org}>{entry.subtitle}</p>
            <p className={styles.summary}>{entry.summary}</p>
            {entry.impact && entry.impact.length > 0 && (
              <ul className={styles.impact} aria-label="Impact">
                {entry.impact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Experience({ items, education }: ExperienceProps) {
  if (items.length === 0 && education.length === 0) return null;

  const showWork = items.length > 0;
  const work: Entry[] = items.map((item) => ({
    key: `${item.org}-${item.period}`,
    period: item.period,
    title: item.role,
    subtitle: item.org,
    summary: item.summary,
    impact: item.impact,
  }));
  const study: Entry[] = education.map((item) => ({
    key: `${item.institution}-${item.period}`,
    period: item.period,
    title: item.degree,
    subtitle: item.institution,
    summary: `${item.university}, ${item.location}`,
  }));

  return (
    <section className="band" aria-labelledby={showWork ? "experience-title" : "education-title"}>
      {showWork && (
        <>
          <h1 id="experience-title" className="section-title" data-reveal>
            Where I&apos;ve worked
          </h1>
          <Timeline entries={work} Title="h2" />
        </>
      )}

      {study.length > 0 &&
        (showWork ? (
          <div className={styles.education}>
            <h2 id="education-title" className={styles.subhead} data-reveal>
              Education
            </h2>
            <Timeline entries={study} Title="h3" />
          </div>
        ) : (
          <>
            <h1 id="education-title" className="section-title" data-reveal>
              Education
            </h1>
            <Timeline entries={study} Title="h2" />
          </>
        ))}
    </section>
  );
}
