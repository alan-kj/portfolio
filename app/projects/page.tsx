import type { Metadata } from "next";
import WorkGrid from "../components/Work/WorkGrid";
import { projects } from "../data";
import PageTransition from "../motion/PageTransition";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects by Alan K J: backends, APIs and web applications, with the role and stack behind each one.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects", url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <WorkGrid projects={projects} />
      </main>
    </PageTransition>
  );
}
