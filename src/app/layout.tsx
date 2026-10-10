import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import Cursor from "@/components/ui/cursor";
import Grain from "@/components/ui/grain";
import ScrollProgress from "@/components/ui/scroll-progress";
import ParticleCanvas from "@/components/ui/particle-canvas";
import Preloader from "@/components/preloader";
import Nav from "@/components/nav";

const display = Fraunces({
  variable: "--font-display-raw",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const body = Space_Grotesk({
  variable: "--font-body-raw",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dheeraj Reddy — Web Developer",
  description:
    "Full-stack web developer building animated, production-grade web platforms with Next.js, Node.js, Express, MySQL and GSAP.",
  keywords: [
    "Dheeraj Reddy",
    "Web Developer",
    "Next.js Developer",
    "GSAP Animation",
    "Full Stack Developer Hyderabad",
    "React Developer",
  ],
  authors: [{ name: "Dheeraj Sai Charan Reddy" }],
  openGraph: {
    title: "Dheeraj Reddy — Web Developer",
    description:
      "Full-stack web developer building animated, production-grade web platforms with Next.js, Node.js, Express, MySQL and GSAP.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <Preloader />
            <ParticleCanvas />
            <Grain />
            <Cursor />
            <ScrollProgress />
            <Nav />
            <main className="pt-16 lg:pl-20 lg:pt-0">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
