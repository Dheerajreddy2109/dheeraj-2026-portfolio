"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";
import { skills } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const groups = gsap.utils.toArray<HTMLElement>(
        "[data-skill-group]",
        gridRef.current
      );
      groups.forEach((group) => {
        const chips = group.querySelectorAll("[data-chip]");
        gsap.fromTo(
          chips,
          { opacity: 0, y: 14, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.045,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: gridRef }
  );

  return (
    <section id="skills" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="04"
        title="Skills"
        description="The stack I reach for by default — and the tools that keep a project running after launch."
      />

      <div ref={gridRef} className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category} data-skill-group>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  data-chip
                  data-cursor
                  className="rounded-full border border-line px-4 py-2 font-sans text-sm text-ink-soft transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
