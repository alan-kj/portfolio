import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

type FooterProps = Readonly<{ name: string; github: string }>;

export default function Footer({ name, github }: FooterProps) {
  return (
    <footer className={`wrap ${styles.footer}`}>
      <a href="#top" className={styles.brand}>
        {name}
      </a>
      <span>© {new Date().getFullYear()}</span>
      <a href={github} className={styles.link}>
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
