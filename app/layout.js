import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Alan K J — Software Engineer",
  description: "I build reliable backends and clean web apps. Explore the work and skills of Alan K J, software engineer.",
  applicationName: "Alan K J Portfolio",
  openGraph: {
    title: "Alan K J — Software Engineer",
    description: "Reliable backends and clean web apps, built with care.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F7F9F6", colorScheme: "light" };
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Theme appearance="light" accentColor="green" grayColor="sage" radius="large" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
