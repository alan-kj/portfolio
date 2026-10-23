import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className={`wrap ${styles.page}`}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>
        That page doesn&apos;t exist. It may have moved, or the link is wrong.
      </p>
      <Link href="/" className={styles.back}>
        <ArrowLeft size={16} aria-hidden="true" /> Back to home
      </Link>
    </main>
  );
}
