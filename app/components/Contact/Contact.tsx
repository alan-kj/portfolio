import { ArrowUpRight, CodeXml } from "lucide-react";
import type { Profile } from "../../data";
import Magnetic from "../../motion/Magnetic";
import styles from "./Contact.module.css";
import CopyEmail from "./CopyEmail";

export default function Contact({ profile }: Readonly<{ profile: Profile }>) {
  const { email, github } = profile;

  return (
    <section id="contact" className="band" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title" data-reveal>
        Let&apos;s make it real.
      </h2>
      <p className={styles.text} data-reveal>
        {email
          ? "Have a project or a role in mind? Send me an email, or find me on GitHub."
          : "Have a project or a role in mind? The best place to find me is GitHub."}
      </p>

      {email && (
        <a className={styles.email} href={`mailto:${email}`} data-reveal>
          {email}
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </a>
      )}

      <div className={styles.actions} data-reveal>
        {email && (
          <Magnetic>
            <CopyEmail email={email} />
          </Magnetic>
        )}
        <Magnetic>
          <a className={`btn ${email ? "btn-secondary" : "btn-primary"}`} href={github}>
            <CodeXml size={16} aria-hidden="true" /> GitHub
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
