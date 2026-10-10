"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Languages as LangIcon, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import { education, certifications, languages } from "@/lib/data";
import { sound } from "@/lib/sound";

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
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
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
      <SectionHeading
        index="05"
        title="Education & Credentials"
        description="Formal computer science foundation complemented by verified certifications in enterprise full-stack development."
      />

      <div ref={gridRef} className="grid gap-8 sm:grid-cols-3">
        {/* Degree Card */}
        <div data-edu-col>
          <TiltCard
            tiltStrength={12}
            className="flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-signal/50 sm:p-8"
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-line/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-soft text-signal">
                    <GraduationCap size={16} />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    Formal Degree
                  </h3>
                </div>
                <span className="font-mono text-xs text-signal font-semibold">
                  {education.start}–{education.end}
                </span>
              </div>

              <p className="font-display text-2xl font-medium text-ink leading-tight sm:text-3xl">
                {education.degree}
              </p>
              <p className="mt-3 font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                {education.school}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-line/80 bg-paper p-3 font-mono text-[11px] text-ink-faint">
              Four-year B.Tech curriculum covering data structures, relational DBMS, and software architecture.
            </div>
          </TiltCard>
        </div>

        {/* Certifications Card */}
        <div data-edu-col>
          <TiltCard
            tiltStrength={12}
            className="flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-signal/50 sm:p-8"
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-line/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Award size={16} />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    Certifications
                  </h3>
                </div>
                <span className="font-mono text-xs text-blue-500 font-semibold">
                  Verified
                </span>
              </div>

              <ul className="flex flex-col gap-4">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    onMouseEnter={() => sound.playTick()}
                    className="rounded-xl border border-line bg-paper p-3.5 transition-transform duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-ink">
                          {c.name}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-ink-faint">
                          {c.org}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 font-mono text-[10px] text-ink-faint">
              Industry credentials spanning backend architectures and algorithms.
            </div>
          </TiltCard>
        </div>

        {/* Languages Card */}
        <div data-edu-col>
          <TiltCard
            tiltStrength={12}
            className="flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-signal/50 sm:p-8"
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-line/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <LangIcon size={16} />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    Languages
                  </h3>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-semibold">
                  Multilingual
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3 font-sans text-sm"
                  >
                    <span className="text-ink font-medium">{l.name}</span>
                    <span className="rounded-full bg-paper-soft px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 font-mono text-[10px] text-ink-faint">
              Comfortable leading technical communication across international and domestic teams.
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
