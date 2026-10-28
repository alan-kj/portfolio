import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Experience from "../components/Experience/Experience";
import { education, experience } from "../data";
import PageTransition from "../motion/PageTransition";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where Alan K J has worked and studied, in order.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience", url: "/experience" },
};

export default function ExperiencePage() {
  if (experience.length === 0 && education.length === 0) notFound();

  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Experience items={experience} education={education} />
      </main>
    </PageTransition>
  );
}
