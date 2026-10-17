import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Alan K J – Software Engineer",
  description: "Portfolio of Alan K J, software engineer."
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0A0E1A", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body>{children}</body>
    </html>
  );
}
