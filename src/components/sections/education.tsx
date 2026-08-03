"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";
import { education, certifications, languages } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const columns = gridRef.current.querySelectorAll("[data-edu-col]");
      gsap.fromTo(
        columns,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const items = gridRef.current.querySelectorAll("[data-edu-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section id="education" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading index="05" title="Education" />

      <div ref={gridRef} className="grid gap-14 sm:grid-cols-3">
        <div data-edu-col className="opacity-0">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Degree
          </h3>
          <p className="font-display text-2xl text-ink sm:text-3xl">
            {education.degree}
          </p>
          <p className="mt-3 max-w-xs font-sans text-sm text-ink-soft">
            {education.school}
          </p>
          <p className="mt-3 font-mono text-xs text-ink-faint">
            {education.start} — {education.end}
          </p>
        </div>

        <div data-edu-col className="opacity-0">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Certifications
          </h3>
          <ul className="flex flex-col gap-4">
            {certifications.map((c) => (
              <li key={c.name} data-edu-item className="opacity-0">
                <p className="font-sans text-base text-ink">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-ink-faint">
                  {c.org}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div data-edu-col className="opacity-0">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
            Languages
          </h3>
          <ul className="flex flex-col gap-3">
            {languages.map((l) => (
              <li
                key={l.name}
                data-edu-item
                className="flex items-center justify-between border-b border-line pb-3 font-sans text-sm opacity-0"
              >
                <span className="text-ink">{l.name}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {l.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
