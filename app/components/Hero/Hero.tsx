import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import type { Profile } from "../../data";
import ResumeLink from "../ResumeLink";
import styles from "./Hero.module.css";

export default function Hero({ profile }: Readonly<{ profile: Profile }>) {
  const { status, email, github, linkedin } = profile;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.main}>
        <p className={styles.prompt} aria-hidden="true">
          whoami
        </p>
        <h1 id="hero-title" className={styles.name}>
          <span className={styles.type}>{profile.name}</span>
        </h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.lead}>{profile.headline}</p>
        <p className={styles.intro}>{profile.intro}</p>
        <div className={styles.actions}>
          <Link className="btn btn-primary" href="/projects" transitionTypes={["nav-forward"]}>
            Explore my work <ArrowRight size={16} aria-hidden="true" />
          </Link>
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

      <div className={styles.window}>
        <p className={styles.title}>profile</p>
        <dl className={styles.facts}>
          <div>
            <dt>status</dt>
            <dd data-state={status.state}>
              <span className={styles.dot} aria-hidden="true" />
              {status.label}
            </dd>
          </div>
          <div>
            <dt>focus</dt>
            <dd>{status.focus}</dd>
          </div>
          {email && (
            <div>
              <dt>mail</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
          )}
          <div>
            <dt>source</dt>
            <dd>
              <a href={github}>{github.replace(/^https?:\/\//, "")}</a>
            </dd>
          </div>
          {linkedin && (
            <div>
              <dt>linkedin</dt>
              <dd>
                <a href={linkedin}>
                  {linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
