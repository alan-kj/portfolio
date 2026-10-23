"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../ThemeProvider";
import styles from "./Header.module.css";

type HeaderProps = Readonly<{
  name: string;
  links: readonly { id: string; label: string }[];
  contactId: string;
}>;

export default function Header({ name, links, contactId }: HeaderProps) {
  const [active, setActive] = useState("");

  // Mark the section nearest the top of the viewport as current.
  useEffect(() => {
    const ids = [...links.map((link) => link.id), contactId];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links, contactId]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} aria-label={`${name}, home`}>
          {name}
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.link}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`#${contactId}`}
            className={styles.cta}
            aria-current={active === contactId ? "location" : undefined}
          >
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
