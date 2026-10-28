import { ArrowDown, CodeXml, FileText } from "lucide-react";
import type { Profile } from "../../data";
import ResumeLink from "../ResumeLink";
import styles from "./Hero.module.css";
import StatusPill from "./StatusPill";

export default function Hero({ profile }: Readonly<{ profile: Profile }>) {
  const words = profile.name.split(" ");

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <StatusPill status={profile.status} />

      <h1 id="hero-title" className={styles.wordmark}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className={styles.word}>
              <span className={styles.rise}>{word}</span>
            </span>{" "}
          </span>
        ))}
      </h1>

      <div className={styles.lower}>
        <p className={styles.lead}>{profile.headline}</p>
        <div className={styles.side}>
          <p className={styles.intro}>{profile.intro}</p>
          <div className={styles.actions}>
            <a className="btn btn-primary" href="#projects">
              Explore my work <ArrowDown className="btn-nudge" size={16} aria-hidden="true" />
            </a>
            <a className="btn btn-secondary" href={profile.github}>
              <CodeXml size={16} aria-hidden="true" /> GitHub
            </a>
            {profile.resumeUrl && (
              <ResumeLink
                className="btn btn-secondary"
                href={profile.resumeUrl}
                fileName={profile.resumeFileName}
              >
                <FileText className="btn-nudge" size={16} aria-hidden="true" /> Resume
              </ResumeLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
