"use client";

import { useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { projects, type Project } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GRADIENTS = [
  "from-[#cf4520] to-[#f2a154]",
  "from-[#1f2a44] to-[#5b6ea8]",
  "from-[#2f5d4f] to-[#8fb89a]",
  "from-[#5c3d2e] to-[#c99a6b]",
  "from-[#3a3630] to-[#8b846c]",
  "from-[#7a2f3b] to-[#e08a8a]",
  "from-[#12504c] to-[#5fc4b8]",
  "from-[#3d2b52] to-[#a186c9]",
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [gradient, setGradient] = useState(GRADIENTS[0]);

  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!previewRef.current) return;
      gsap.set(previewRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.85,
      });
      xTo.current = gsap.quickTo(previewRef.current, "x", {
        duration: 0.5,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(previewRef.current, "y", {
        duration: 0.5,
        ease: "power3",
      });

      const rows = gsap.utils.toArray<HTMLElement>(
        "[data-project-row]",
        containerRef.current
      );
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    xTo.current?.(e.clientX - bounds.left);
    yTo.current?.(e.clientY - bounds.top);
  }

  function handleEnter(project: Project, index: number) {
    setActive(project);
    setGradient(GRADIENTS[index % GRADIENTS.length]);
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.35,
      ease: "power3.in",
    });
  }

  return (
    <section id="work" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="02"
        title="Selected Work"
        description="Eight production platforms — communities, SaaS dashboards, and marketing sites — designed, built and shipped end to end."
      />

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative border-t border-line"
      >
        {projects.map((project, i) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-project-row
            onMouseEnter={() => handleEnter(project, i)}
            onMouseLeave={handleLeave}
            className="group relative grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-line py-6 opacity-0 transition-colors duration-300 hover:bg-paper-soft/60 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-8 sm:px-4 sm:py-8"
          >
            <span className="font-mono text-xs text-ink-faint">
              {project.index}
            </span>

            <div className="min-w-0">
              <h3 className="truncate font-display text-2xl text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-1 truncate font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                {project.tag} · {project.url}
              </p>
            </div>

            <div className="hidden max-w-[13rem] text-right font-mono text-[11px] text-ink-soft sm:block">
              {project.stack.join(" · ")}
            </div>

            <ArrowUpRight
              size={20}
              className="hidden shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal sm:block"
            />
          </a>
        ))}

        <div
          ref={previewRef}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-56 w-44 overflow-hidden rounded-md border border-line-strong bg-paper shadow-2xl lg:block"
        >
          <div
            className={`flex h-2/3 items-center justify-center bg-linear-to-br font-display text-3xl italic text-white/90 ${gradient}`}
          >
            {active?.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex h-1/3 flex-col justify-center gap-1 px-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {active?.tag}
            </span>
            <span className="font-mono text-[10px] text-ink-soft">
              View project →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
