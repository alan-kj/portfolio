"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeProvider";
import styles from "./Header.module.css";

type HeaderProps = Readonly<{
  name: string;
  links: readonly { href: string; label: string }[];
  contactHref: string;
}>;

export default function Header({ name, links, contactHref }: HeaderProps) {
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${name}, home`}>
          {name}
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className={styles.cta}
            aria-current={isCurrent(contactHref) ? "page" : undefined}
          >
            Get in touch <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
