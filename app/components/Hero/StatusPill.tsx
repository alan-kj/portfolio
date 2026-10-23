import type { Status } from "../../data";
import styles from "./Hero.module.css";

export default function StatusPill({ status }: Readonly<{ status: Status }>) {
  return (
    <p className={styles.pill} data-state={status.state}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.pillLabel}>{status.label}</span>
      <span className={styles.pillFocus}>{status.focus}</span>
    </p>
  );
}
