import type { Metadata } from "next";
import Contact from "../components/Contact/Contact";
import { profile } from "../data";
import PageTransition from "../motion/PageTransition";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alan K J about a project or a role.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", url: "/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main id="main" className="wrap">
        <Contact profile={profile} />
      </main>
    </PageTransition>
  );
}
