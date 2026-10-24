"use client";

import dynamic from "next/dynamic";

// The ring is decorative and only matters after the first pointer move, so keep it out of the
// initial bundle and the server render.
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export default function CursorLazy() {
  return <Cursor />;
}
