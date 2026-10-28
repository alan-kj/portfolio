import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import WorkPreview from "../../components/Work/WorkPreview";
import { projects } from "../../data";
import PageTransition from "../../motion/PageTransition";
import styles from "./CaseStudy.module.css";

type CaseStudyProps = Readonly<{ params: Promise<{ slug: string }> }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.text,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.text,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  return (
    <PageTransition>
      <main id="main" className={`wrap ${styles.page}`}>
        <Link href="/projects" className={styles.back} transitionTypes={["nav-back"]}>
          <ArrowLeft size={16} aria-hidden="true" /> ~/projects
        </Link>

        <header className={styles.intro}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.text}</p>
        </header>

        <dl className={styles.facts}>
          <div>
            <dt>year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>stack</dt>
            <dd>{project.tags.join(", ")}</dd>
          </div>
          <div>
            <dt>source</dt>
            <dd>
              <a className={styles.visit} href={project.href}>
                View project <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>

        <ViewTransition name={`work-${project.slug}`} share="morph" default="none">
          <div className={styles.preview}>
            <WorkPreview title={project.title} preview={project.preview} index={index} />
          </div>
        </ViewTransition>

        <div className={styles.sections}>
          {project.sections?.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        {next && (
          <nav className={styles.next} aria-label="Next project">
            <Link href={`/projects/${next.slug}`} transitionTypes={["nav-forward"]}>
              <span className={styles.nextLabel}>Next project</span>
              <span className={styles.nextTitle}>
                {next.title} <ArrowUpRight size={28} aria-hidden="true" />
              </span>
            </Link>
          </nav>
        )}
      </main>
    </PageTransition>
  );
}
