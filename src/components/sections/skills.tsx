"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Server, Database, Wrench, CheckCircle, Sparkles, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import ScrambleText from "@/components/ui/scramble-text";
import { skills } from "@/lib/data";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Code,
  Backend: Server,
  Databases: Database,
  "Tools & Ops": Wrench,
};

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
          { opacity: 0, y: 20, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(1.5)",
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
        title="Technical Stack & Arsenal"
        description="A curated toolkit honed across 8+ production web applications — specialized in modern React ecosystems, performant backends, and fluid GSAP animation."
      />

      <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:gap-10">
        {skills.map((group) => {
          const Icon = CATEGORY_ICONS[group.category] || Sparkles;
          return (
            <div key={group.category} data-skill-group>
              <TiltCard
                tiltStrength={12}
                className="flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-soft/40 p-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-signal/50 hover:shadow-xl sm:p-8"
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="mb-6 flex items-center justify-between border-b border-line/60 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-soft text-signal">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-display text-xl font-medium text-ink">
                        {group.category}
                      </h3>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                      {group.items.length} Techs
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const isHovered = hoveredSkill === item;
                      return (
                        <span
                          key={item}
                          data-chip
                          data-cursor
                          onMouseEnter={() => {
                            sound.playTick();
                            setHoveredSkill(item);
                          }}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2 font-sans text-xs sm:text-sm transition-all duration-300 ${
                            isHovered
                              ? "border-signal bg-signal text-white shadow-md shadow-signal/20 scale-105"
                              : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                          }`}
                        >
                          <CheckCircle
                            size={12}
                            className={`transition-colors ${
                              isHovered ? "text-white" : "text-signal opacity-60"
                            }`}
                          />
                          <ScrambleText text={item} triggerOnHover={false} />
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-line/50 pt-4 font-mono text-[10px] text-ink-faint">
                  <span>Production Tested</span>
                  <span className="text-emerald-500 font-semibold">● 100% Verified</span>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
