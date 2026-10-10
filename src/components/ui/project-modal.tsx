"use client";

import { useEffect, useRef, useCallback } from "react";
import { X, ExternalLink, CheckCircle2, Layers, Calendar, Terminal } from "lucide-react";
import gsap from "gsap";
import type { Project } from "@/lib/data";
import ProjectMockup from "./project-mockup";
import Magnetic from "./magnetic";
import { sound } from "@/lib/sound";
import { useLenisScroll } from "@/components/providers/smooth-scroll";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useLenisScroll();

  const handleClose = useCallback(() => {
    sound.playClick();
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) {
      onClose();
      return;
    }

    gsap.to(modal, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    sound.playClick();

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    // Stop Lenis while modal is active and lock body scroll
    stop();
    document.documentElement.style.overflow = "hidden";

    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      modal,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.5)" }
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleClose, stop, start]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6 lg:p-10 overscroll-contain"
    >
      <div
        ref={modalRef}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-line-strong bg-paper p-6 shadow-2xl sm:p-8 md:p-10 [scrollbar-width:thin] [scrollbar-color:var(--signal)_var(--paper-soft)]"
      >
        {/* Close Button */}
        <div className="absolute right-5 top-5 z-20">
          <Magnetic strength={0.4}>
            <button
              onClick={handleClose}
              data-cursor
              aria-label="Close modal"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper-soft text-ink transition-colors duration-200 hover:border-signal hover:bg-signal hover:text-white"
            >
              <X size={18} />
            </button>
          </Magnetic>
        </div>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
          <span className="rounded bg-signal-soft px-2.5 py-1 text-signal font-semibold">
            {project.index} / 08
          </span>
          <span>{project.tag}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {project.year}
          </span>
        </div>

        <h2
          id="modal-title"
          className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl md:text-5xl"
        >
          {project.name}
        </h2>

        {/* Live CTA Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-cursor-text="VISIT"
            className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-all duration-300 hover:shadow-lg hover:shadow-signal/25"
          >
            Visit Live Platform
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="font-mono text-xs text-ink-faint">
            URL: <span className="text-ink font-semibold">{project.url}</span>
          </span>
        </div>

        {/* Grid Preview & Technical Deep-Dive */}
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          {/* Mockup Preview Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="h-64 sm:h-72 w-full">
              <ProjectMockup project={project} interactive />
            </div>

            {/* Quick Metrics */}
            {project.mockupStats && (
              <div className="grid grid-cols-3 gap-2 rounded-xl border border-line bg-paper-soft/50 p-3">
                {project.mockupStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                      {stat.label}
                    </p>
                    <p className="font-display text-sm font-bold text-ink sm:text-base">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Narrative Column */}
          <div className="md:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                <Terminal size={14} className="text-signal" /> Technical Problem &amp; Scope
              </h3>
              <p className="mt-2 font-sans text-sm sm:text-base text-ink-soft leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                <Layers size={14} className="text-signal" /> Architecture &amp; Role
              </h3>
              <p className="mt-2 font-sans text-sm sm:text-base text-ink-soft leading-relaxed">
                {project.role}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-2">
                Engineering Highlights
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-8 border-t border-line pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint mb-3">
            Technologies &amp; Libraries Used
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-line bg-paper-soft px-3 py-1 font-mono text-xs text-ink transition-colors hover:border-signal"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
