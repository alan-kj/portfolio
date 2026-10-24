import { ImageResponse } from "next/og";
import { profile } from "./data";

export const alt = `${profile.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0c1013",
        color: "#f2f5f7",
      }}
    >
      <div style={{ fontSize: 32, color: "#8a979f" }}>Software Engineer</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 148, fontWeight: 700, letterSpacing: -4 }}>{profile.name}</div>
        <div style={{ fontSize: 44, color: "#c3ccd2" }}>{profile.headline}</div>
      </div>
    </div>,
    size,
  );
}
