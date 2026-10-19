import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { profile } from "./data";
import { siteUrl } from "./seo";
import { ThemeProvider } from "./ThemeProvider";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Alan K J — Software Engineer",
    template: "%s | Alan K J",
  },
  description: "Alan K J is a software engineer building reliable backends, APIs, and thoughtful web applications. Explore selected projects, technical skills, and get in touch.",
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
    description: "Software engineer building reliable backends, APIs, and thoughtful web applications.",
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
    description: "Software engineer building reliable backends, APIs, and thoughtful web applications.",
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
  themeColor: "#F7F9F6",
  colorScheme: "light dark",
};
export const dynamic = "force-dynamic";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
