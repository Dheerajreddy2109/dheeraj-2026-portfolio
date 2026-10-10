"use client";

import { useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Grid, List, Sparkles, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import ProjectMockup from "@/components/ui/project-mockup";
import ProjectModal from "@/components/ui/project-modal";
import ScrambleText from "@/components/ui/scramble-text";
import { projects, type Project, type ProjectCategory } from "@/lib/data";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES: { label: string; value: ProjectCategory; count: number }[] = [
  { label: "All Works", value: "all", count: 8 },
  { label: "Full-Stack & DB", value: "fullstack", count: 3 },
  { label: "SaaS & GSAP", value: "saas", count: 2 },
  { label: "Platforms & CMS", value: "platform", count: 3 },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // For list mode floating preview
  const [activeListProject, setActiveListProject] = useState<Project | null>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  useGSAP(
    () => {
      // Setup list cursor preview
      if (previewRef.current) {
        gsap.set(previewRef.current, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.85,
        });
        xTo.current = gsap.quickTo(previewRef.current, "x", {
          duration: 0.4,
          ease: "power3",
        });
        yTo.current = gsap.quickTo(previewRef.current, "y", {
          duration: 0.4,
          ease: "power3",
        });
      }

      // Animate project cards or rows on scroll
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-item]", containerRef.current);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [viewMode, selectedCategory] }
  );

  function handleMouseMoveList(e: MouseEvent<HTMLDivElement>) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    xTo.current?.(e.clientX - bounds.left);
    yTo.current?.(e.clientY - bounds.top);
  }

  function handleMouseEnterList(project: Project) {
    setActiveListProject(project);
    sound.playTick();
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }

  function handleMouseLeaveList() {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }

  function handleCategoryChange(cat: ProjectCategory) {
    sound.playClick();
    setSelectedCategory(cat);
  }

  function toggleViewMode(mode: "grid" | "list") {
    sound.playClick();
    setViewMode(mode);
  }

  return (
    <section id="work" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="02"
        title="Selected Work"
        description="Eight production platforms — SaaS telemetry, developer communities, and enterprise apps — designed, engineered, and shipped end to end."
      />

      {/* Control Bar: Categories & View Switcher */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                data-cursor
                onClick={() => handleCategoryChange(cat.value)}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-ink text-paper shadow-md"
                    : "border border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive
                      ? "bg-signal text-white font-bold"
                      : "bg-line text-ink-faint group-hover:text-ink"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher: 3D Grid vs Minimal List */}
        <div className="flex items-center gap-1 rounded-full border border-line bg-paper-soft/60 p-1">
          <button
            data-cursor
            onClick={() => toggleViewMode("grid")}
            aria-label="Grid view"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
              viewMode === "grid"
                ? "bg-ink text-paper shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <Grid size={13} />
            <span className="hidden sm:inline">3D Showcase</span>
          </button>
          <button
            data-cursor
            onClick={() => toggleViewMode("list")}
            aria-label="List view"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
              viewMode === "list"
                ? "bg-ink text-paper shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            <List size={13} />
            <span className="hidden sm:inline">Editorial List</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Container */}
      <div ref={containerRef} onMouseMove={handleMouseMoveList} className="relative">
        {viewMode === "grid" ? (
          // 3D Tilt Card Grid View
          <div
            ref={gridContainerRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10"
          >
            {filteredProjects.map((project) => (
              <div key={project.name} data-project-item>
                <TiltCard
                  tiltStrength={18}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-5 shadow-lg transition-[border-color,box-shadow,background-color] duration-300 hover:border-signal/50 hover:shadow-2xl sm:p-6"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between font-mono text-xs text-ink-faint mb-3">
                    <span className="rounded bg-signal-soft px-2 py-0.5 font-bold text-signal">
                      {project.index}
                    </span>
                    <span className="uppercase tracking-wider">{project.tag}</span>
                    <span className="text-ink-soft">{project.year}</span>
                  </div>

                  {/* Realistic Mockup Window */}
                  <div className="h-60 sm:h-64 w-full my-2">
                    <ProjectMockup project={project} />
                  </div>

                  {/* Card Content & Action Bar */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-signal">
                        <ScrambleText text={project.name} />
                      </h3>
                      <p className="mt-2 line-clamp-2 font-sans text-xs sm:text-sm text-ink-soft">
                        {project.description}
                      </p>
                    </div>

                    {/* Stack Pills & CTA Buttons */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                        {project.stack.slice(0, 3).map((stk) => (
                          <span
                            key={stk}
                            className="rounded-md border border-line bg-paper-soft px-2 py-0.5 font-mono text-[10px] text-ink-faint"
                          >
                            {stk}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Deep Dive Modal Trigger */}
                        <button
                          data-cursor
                          data-cursor-text="EXPAND"
                          onClick={() => setModalProject(project)}
                          className="flex items-center gap-1.5 rounded-full border border-line bg-paper-soft px-3 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-signal hover:bg-signal hover:text-white"
                        >
                          <Eye size={12} />
                          <span>Deep Dive</span>
                        </button>

                        {/* Live Link */}
                        <a
                          data-cursor
                          data-cursor-text="VISIT"
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 hover:scale-110 hover:bg-signal"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        ) : (
          // Editorial List View with Floating Preview
          <div className="border-t border-line">
            {filteredProjects.map((project) => (
              <div
                key={project.name}
                data-project-item
                data-project-row
                onMouseEnter={() => handleMouseEnterList(project)}
                onMouseLeave={handleMouseLeaveList}
                className="group relative grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-line py-6 transition-colors duration-300 hover:bg-paper-soft/60 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-8 sm:px-4 sm:py-8"
              >
                <span className="font-mono text-xs text-ink-faint">
                  {project.index}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3
                      onClick={() => setModalProject(project)}
                      className="cursor-pointer truncate font-display text-2xl text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-5xl"
                    >
                      {project.name}
                    </h3>
                    <span className="hidden rounded bg-signal-soft px-2 py-0.5 font-mono text-[10px] text-signal font-semibold sm:inline-block">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                    {project.tag} · {project.url}
                  </p>
                </div>

                <div className="hidden max-w-[14rem] text-right font-mono text-[11px] text-ink-soft sm:block">
                  {project.stack.join(" · ")}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    data-cursor
                    onClick={() => setModalProject(project)}
                    className="hidden sm:flex items-center gap-1 rounded-full border border-line px-3 py-1 font-mono text-[10px] text-ink hover:border-signal hover:text-signal"
                  >
                    <Sparkles size={11} /> Deep Dive
                  </button>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-signal group-hover:text-signal"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}

            {/* List Mode Floating Preview Card */}
            <div
              ref={previewRef}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden h-64 w-80 overflow-hidden rounded-xl border border-line-strong bg-paper shadow-2xl lg:block"
            >
              {activeListProject && (
                <div className="h-full w-full p-2">
                  <ProjectMockup project={activeListProject} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
