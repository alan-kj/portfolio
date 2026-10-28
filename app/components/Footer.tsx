import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import ResumeLink from "./ResumeLink";
import styles from "./Footer.module.css";

type FooterProps = Readonly<{
  name: string;
  github: string;
  resumeUrl: string;
  resumeFileName: string;
}>;

export default function Footer({ name, github, resumeUrl, resumeFileName }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Link href="/#top" className={styles.brand}>
        {name}
      </Link>
      <span className={styles.year}>© {new Date().getFullYear()}</span>
      <div className={styles.links}>
        {resumeUrl && (
          <ResumeLink className={styles.link} href={resumeUrl} fileName={resumeFileName}>
            Resume <Download size={14} aria-hidden="true" />
          </ResumeLink>
        )}
        <a href={github} className={styles.link}>
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
