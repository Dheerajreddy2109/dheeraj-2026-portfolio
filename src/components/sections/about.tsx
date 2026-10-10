"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Copy, Check, Sparkles, Layers, Cpu, Server, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { RevealWords } from "@/components/ui/reveal";
import StatCounter from "@/components/ui/stat-counter";
import ScrambleText from "@/components/ui/scramble-text";
import { profile, stats } from "@/lib/data";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CODE_TABS = [
  {
    name: "developer.config.ts",
    code: `export const engineer = {
  name: "Dheeraj Sai Charan Reddy",
  role: "Full-Stack Web Architect",
  location: "Hyderabad, India",
  philosophy: "Production-first, motion-driven",
  coreStack: ["Next.js", "Node.js", "Express", "MySQL", "GSAP"],
  status: "Available for high-impact contracts & roles",
  coffee: Infinity,
};`,
  },
  {
    name: "api-service.ts",
    code: `// Secure REST endpoint with MySQL pooling
router.get("/api/v1/metrics", verifyJWT, async (req, res) => {
  const [data] = await db.query(
    "SELECT project_id, latency_ms, status FROM telemetries WHERE active = 1"
  );
  return res.status(200).json({ success: true, payload: data });
});`,
  },
  {
    name: "motion.gsap.ts",
    code: `// 60FPS ScrollTrigger scrubbing sequence
gsap.timeline({
  scrollTrigger: {
    trigger: "#work",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 0.8,
  }
}).from(".project-card", { y: 60, opacity: 0, stagger: 0.1 });`,
  },
];

export default function About() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useGSAP(
    () => {
      if (!bentoRef.current) return;
      const tiles = bentoRef.current.querySelectorAll("[data-bento-tile]");
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: bentoRef }
  );

  const copySnippet = () => {
    sound.playClick();
    navigator.clipboard.writeText(CODE_TABS[activeTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="01"
        title="About & Philosophy"
        description="A look at how I engineer applications — merging rock-solid full-stack infrastructure with fluid, award-winning interactive motion."
      />

      {/* Bento Grid */}
      <div ref={bentoRef} className="grid gap-6 md:grid-cols-12">
        {/* Tile 1: Main Story (8 Cols) */}
        <div
          data-bento-tile
          className="md:col-span-8 flex flex-col justify-between rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:p-10"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-4">
              <Sparkles size={14} />
              <span>Full-Stack &amp; Motion Engineering</span>
            </div>
            <RevealWords
              as="p"
              text={profile.summary}
              className="text-balance font-display text-xl font-light leading-relaxed text-ink sm:text-2xl md:text-3xl"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line/60 pt-6 font-mono text-xs text-ink-faint">
            <span className="flex items-center gap-1.5 text-ink font-medium">
              <Layers size={14} className="text-signal" /> Full Web Layer Ownership
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-ink font-medium">
              <Zap size={14} className="text-amber-500" /> GSAP 60fps Animation
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-ink font-medium">
              <Server size={14} className="text-blue-500" /> Scalable Node / MySQL
            </span>
          </div>
        </div>

        {/* Tile 2: Metrics Column (4 Cols) */}
        <div
          data-bento-tile
          className="md:col-span-4 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm sm:p-8"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Production Track Record
          </h3>

          <div className="flex flex-col divide-y divide-line">
            {stats.map((stat) => (
              <div key={stat.label} className="py-4 first:pt-0 last:pb-0">
                <div className="font-display text-4xl text-ink font-bold sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line/80 bg-paper p-3 text-xs font-mono text-ink-faint">
            <span className="text-signal font-semibold">100%</span> Client Delivery Rate · Built with zero templates
          </div>
        </div>

        {/* Tile 3: Interactive Developer Terminal (7 Cols) */}
        <div
          data-bento-tile
          className="md:col-span-7 flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-md"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-line bg-paper-soft/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-2 font-mono text-[11px] text-ink-faint flex items-center gap-1.5">
                <Terminal size={12} className="text-signal" /> zsh — dheeraj@portfolio
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={copySnippet}
              data-cursor
              aria-label="Copy code"
              className="flex items-center gap-1.5 rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-ink-soft hover:border-signal hover:text-signal transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check size={11} className="text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-line bg-paper-soft/40 overflow-x-auto">
            {CODE_TABS.map((tab, idx) => (
              <button
                key={tab.name}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(idx);
                }}
                className={`px-4 py-2 font-mono text-xs border-r border-line transition-colors whitespace-nowrap ${
                  activeTab === idx
                    ? "bg-paper text-signal font-semibold border-b-2 border-b-signal"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Code Viewer Body */}
          <div className="flex-1 p-5 font-mono text-xs sm:text-sm text-ink-soft overflow-x-auto bg-paper/60">
            <pre className="leading-relaxed">
              <code>{CODE_TABS[activeTab].code}</code>
            </pre>
          </div>
        </div>

        {/* Tile 4: Engineering Pillars (5 Cols) */}
        <div
          data-bento-tile
          className="md:col-span-5 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm sm:p-8"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Engineering Pillars
          </h3>

          <div className="grid gap-3">
            <div className="rounded-xl border border-line bg-paper p-3.5 transition-transform duration-300 hover:translate-x-1">
              <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                <Cpu size={16} className="text-signal" />
                <ScrambleText text="Enterprise Architecture" />
              </div>
              <p className="mt-1 text-xs text-ink-soft font-sans">
                Next.js App Router, SSR, Docker containerization, and performant REST endpoints.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-paper p-3.5 transition-transform duration-300 hover:translate-x-1">
              <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                <Zap size={16} className="text-amber-500" />
                <ScrambleText text="Kinetic & GSAP Motion" />
              </div>
              <p className="mt-1 text-xs text-ink-soft font-sans">
                Timeline sequencing, ScrollTrigger scrubbing, Lenis smooth scrolling, and bespoke interaction physics.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-paper p-3.5 transition-transform duration-300 hover:translate-x-1">
              <div className="flex items-center gap-2 text-ink font-semibold text-sm">
                <Server size={16} className="text-emerald-500" />
                <ScrambleText text="Database & DevOps" />
              </div>
              <p className="mt-1 text-xs text-ink-soft font-sans">
                Relational MySQL schema design, query tuning, AWS deployment, DNS, SSL, and server telemetry.
              </p>
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Ready for collaborative or solo ownership
          </p>
        </div>
      </div>
    </section>
  );
}
