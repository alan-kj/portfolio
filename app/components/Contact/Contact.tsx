import { ArrowUpRight, BriefcaseBusiness, CodeXml } from "lucide-react";
import type { Profile } from "../../data";
import styles from "./Contact.module.css";
import CopyEmail from "./CopyEmail";

export default function Contact({ profile }: Readonly<{ profile: Profile }>) {
  const { email, github, linkedin } = profile;
  const elsewhere = linkedin ? "GitHub or LinkedIn" : "GitHub";

  return (
    <section className="band" aria-labelledby="contact-title">
      <h1 id="contact-title" className="section-title" data-reveal>
        Let&apos;s make it real.
      </h1>
      <p className={styles.text} data-reveal>
        {email
          ? `Have a project or a role in mind? Send me an email, or find me on ${elsewhere}.`
          : `Have a project or a role in mind? The best place to find me is ${elsewhere}.`}
      </p>

      {email && (
        <a className={styles.email} href={`mailto:${email}`} data-reveal>
          {email}
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </a>
      )}

      <div className={styles.actions} data-reveal>
        {email && <CopyEmail email={email} />}
        <a className={`btn ${email ? "btn-secondary" : "btn-primary"}`} href={github}>
          <CodeXml size={16} aria-hidden="true" /> GitHub
        </a>
        {linkedin && (
          <a className="btn btn-secondary" href={linkedin}>
            <BriefcaseBusiness size={16} aria-hidden="true" /> LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
