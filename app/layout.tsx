import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { profile } from "./data";
import Cursor from "./motion/Cursor";
import Reveal from "./motion/Reveal";
import { siteUrl } from "./seo";
import "./styles/tokens.css";
import "./styles/base.css";
import { ThemeProvider } from "./ThemeProvider";

const body = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const head = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth"], // the width axis drives the hero; skipping optical size keeps the file ~40% smaller
  display: "swap",
});
// Only small labels use the mono face, all below the fold, so it should not compete for the first paint.
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Runs before first paint so a returning visitor never sees the wrong theme.
const navLinks = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

const themeScript = `try{var t=localStorage.getItem("color-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Alan K J — Software Engineer",
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
    title: "Alan K J — Software Engineer",
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
  twitter: {
    card: "summary",
    title: "Alan K J — Software Engineer",
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
  themeColor: "#0c1013",
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
      className={`${body.variable} ${head.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Reveal />
          <Cursor />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header name={profile.name} links={navLinks} contactId="contact" />
          {children}
          <Footer
            name={profile.name}
            github={profile.github}
            resumeUrl={profile.resumeUrl}
            resumeFileName={profile.resumeFileName}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
