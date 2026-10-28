import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { education, experience, profile } from "./data";
import Reveal from "./motion/Reveal";
import { siteUrl } from "./seo";
import "./styles/tokens.css";
import "./styles/base.css";
import { ThemeProvider } from "./ThemeProvider";

const body = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});
// Headings and UI chrome. The variable font keeps the weight range in one file.
const head = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Runs before first paint so a returning visitor never sees the wrong theme.
const navLinks = [
  { href: "/projects", label: "Projects" },
  ...(experience.length > 0 || education.length > 0
    ? [{ href: "/experience", label: "Experience" }]
    : []),
  { href: "/about", label: "About" },
];

const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl.origin,
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
}).replace(/</g, "\\u003c");

const themeScript = `try{var t=localStorage.getItem("color-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: "%s | Alan K J",
  },
  description:
    "Alan K J is a software engineer building reliable backends, APIs, and thoughtful web applications. Explore selected projects, technical skills, and get in touch.",
  applicationName: "Alan K J Portfolio",
  keywords: [
    "Alan K J",
    "software engineer",
    "backend developer",
    "full-stack developer",
    "Node.js",
    "TypeScript",
    "Go",
    "PostgreSQL",
    "API development",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "Software engineer building reliable backends, APIs, and thoughtful web applications.",
    url: "/",
    siteName: "Alan K J Portfolio",
    locale: "en_US",
    type: "profile",
    firstName: "Alan",
    lastName: "K J",
    username: "alan-kj",
  },
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Software engineer building reliable backends, APIs, and thoughtful web applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark light",
};
export const dynamic = "force-dynamic";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  // proxy.ts puts the per-request nonce in the CSP header; reuse it for the theme script.
  const csp = (await headers()).get("content-security-policy") ?? "";
  const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${body.variable} ${head.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Reveal />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header name={profile.name} links={navLinks} contactHref="/contact" />
          {children}
          <Footer
            name={profile.name}
            github={profile.github}
            linkedin={profile.linkedin}
            resumeUrl={profile.resumeUrl}
            resumeFileName={profile.resumeFileName}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
