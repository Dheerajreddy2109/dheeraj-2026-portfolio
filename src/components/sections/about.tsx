"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/section-heading";
import { RevealWords } from "@/components/ui/reveal";
import StatCounter from "@/components/ui/stat-counter";
import { profile, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const dlRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      if (!dlRef.current) return;
      const rows = dlRef.current.querySelectorAll("[data-stat-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dlRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: dlRef }
  );

  return (
    <section id="about" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading index="01" title="About" />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <RevealWords
            as="p"
            text={profile.summary}
            className="max-w-2xl text-balance font-display text-2xl font-light leading-snug text-ink sm:text-3xl md:text-4xl"
          />
        </div>
        <div className="lg:col-span-5 lg:pl-8">
          <dl ref={dlRef} className="divide-y divide-line border-y border-line">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-stat-row
                className="flex items-baseline justify-between gap-6 py-6 opacity-0"
              >
                <dt className="max-w-[10rem] font-mono text-xs uppercase tracking-wider text-ink-soft">
                  {stat.label}
                </dt>
                <dd className="font-display text-4xl text-ink sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
