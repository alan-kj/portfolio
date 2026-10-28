import Image from "next/image";
import styles from "./Work.module.css";

type WorkPreviewProps = Readonly<{
  title: string;
  preview?: string;
  index: number;
}>;

const motifs = ["rows", "nodes", "bars", "prompt"] as const;

const rowWidths = [110, 80, 128, 64, 96];
const nodePoints = [
  [50, 40],
  [120, 28],
  [190, 56],
  [82, 108],
  [160, 112],
] as const;
const nodeLinks = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [3, 4],
  [2, 4],
] as const;
const barHeights = [40, 70, 55, 95, 75, 110, 90];
const promptWidths = [120, 168, 96, 140];

// Shows the project's image when one is set, otherwise an abstract motif that animates on hover.
export default function WorkPreview({ title, preview, index }: WorkPreviewProps) {
  if (preview) {
    return (
      <Image
        src={preview}
        alt={`${title} preview`}
        fill
        sizes="(min-width: 900px) 50vw, 100vw"
        className={styles.image}
      />
    );
  }

  const motif = motifs[index % motifs.length];

  return (
    <svg
      className={styles.motif}
      data-motif={motif}
      viewBox="0 0 240 150"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {motif === "rows" &&
        rowWidths.map((width, i) => (
          <g key={width} className={styles.row}>
            <rect
              className={i === 1 ? styles.hot : styles.shape}
              x="20"
              y={22 + i * 26}
              width="8"
              height="8"
            />
            <rect className={styles.shape} x="40" y={22 + i * 26} width={width} height="8" />
            <rect className={styles.shape} x="190" y={22 + i * 26} width="30" height="8" />
          </g>
        ))}

      {motif === "nodes" && (
        <>
          {nodeLinks.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              className={styles.link}
              x1={nodePoints[from][0]}
              y1={nodePoints[from][1]}
              x2={nodePoints[to][0]}
              y2={nodePoints[to][1]}
            />
          ))}
          {nodePoints.map(([cx, cy], i) => (
            <rect
              key={`${cx}-${cy}`}
              className={`${i === 1 ? styles.hot : styles.shape} ${styles.node}`}
              x={cx - (i === 1 ? 12 : 9)}
              y={cy - (i === 1 ? 12 : 9)}
              width={i === 1 ? 24 : 18}
              height={i === 1 ? 24 : 18}
            />
          ))}
        </>
      )}

      {motif === "bars" && (
        <>
          <line className={styles.link} x1="14" y1="132" x2="226" y2="132" />
          {barHeights.map((height, i) => (
            <rect
              key={`${height}-${i}`}
              className={`${i === 5 ? styles.hot : styles.shape} ${styles.bar}`}
              x={22 + i * 30}
              y={130 - height}
              width="18"
              height={height}
            />
          ))}
        </>
      )}

      {motif === "prompt" && (
        <>
          <path className={styles.chevron} d="M28 38 l12 8 l-12 8" />
          {promptWidths.map((width, i) => (
            <rect
              key={width}
              className={styles.shape}
              x="52"
              y={40 + i * 22}
              width={width}
              height="8"
            />
          ))}
          <rect className={`${styles.hot} ${styles.caret}`} x="52" y="128" width="9" height="12" />
        </>
      )}
    </svg>
  );
}
