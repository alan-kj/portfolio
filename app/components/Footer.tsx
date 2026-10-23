import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./Footer.module.css";

type FooterProps = Readonly<{ name: string; github: string }>;

export default function Footer({ name, github }: FooterProps) {
  return (
    <footer className={`wrap ${styles.footer}`}>
      <Link href="/#top" className={styles.brand}>
        {name}
      </Link>
      <span>© {new Date().getFullYear()}</span>
      <a href={github} className={styles.link}>
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
