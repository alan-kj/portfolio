import type { Metadata } from "next";
import About from "../components/About/About";
import { metrics, profile, projects, skills } from "../data";
import PageTransition from "../motion/PageTransition";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Alan K J: how I work, the technologies I use, and what I care about when building software.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About", url: "/about" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <About profile={profile} skills={skills} metrics={metrics} projects={projects} />
      </main>
    </PageTransition>
  );
}
