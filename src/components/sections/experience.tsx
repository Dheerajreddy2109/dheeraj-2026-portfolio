"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";
import { experience } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      const items = gsap.utils.toArray<HTMLElement>(
        "[data-achievement]",
        listRef.current
      );
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: listRef }
  );

  return (
    <section
      id="experience"
      className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <SectionHeading index="03" title="Experience" />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h3 className="font-display text-3xl text-ink sm:text-4xl">
              {experience.role}
            </h3>
            <p className="mt-2 font-mono text-sm text-ink-soft">
              {experience.org}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-faint">
              {experience.location}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-soft">
              {experience.start} — {experience.end}
            </p>
          </div>
        </div>

        <div ref={listRef} className="relative lg:col-span-8 lg:pl-4">
          <div className="absolute left-0 top-0 h-full w-px bg-line" />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal"
          />

          <ul className="flex flex-col gap-10 pl-8">
            {experience.achievements.map((item) => (
              <li key={item} data-achievement className="relative opacity-0">
                <span className="absolute -left-9 top-1.5 h-2 w-2 rounded-full bg-signal" />
                <p className="max-w-xl text-balance font-sans text-base text-ink-soft sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
