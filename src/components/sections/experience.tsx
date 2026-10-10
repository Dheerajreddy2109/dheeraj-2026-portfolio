"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";
import { experience } from "@/lib/data";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACHIEVEMENT_TAGS = [
  "End-to-End Ownership",
  "GSAP ScrollTrigger Motion",
  "Reusable React Libraries",
  "Node.js / Express REST APIs",
  "MySQL Optimization & Schemas",
  "Cloud & Production Deployment",
];

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
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
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
    <section id="experience" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="03"
        title="Experience & Deliverables"
        description="Over two years shipping commercial web applications, bridging creative motion design and full-stack backend reliability."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Sticky Role Card */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <TiltCard
              tiltStrength={14}
              className="rounded-2xl border border-line bg-paper-soft/50 p-6 shadow-sm backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                <Briefcase size={14} />
                <span>Current Role</span>
              </div>

              <h3 className="font-display text-3xl font-medium text-ink sm:text-4xl">
                {experience.role}
              </h3>
              <p className="mt-2 font-mono text-sm text-ink-soft">
                {experience.org}
              </p>

              <div className="mt-4 flex flex-col gap-2 font-mono text-xs text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-signal" /> {experience.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-signal" /> {experience.start} — {experience.end}
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-line/80 bg-paper p-3 font-mono text-xs text-ink-soft">
                <div className="flex items-center gap-2 text-emerald-500 font-semibold mb-1">
                  <Award size={14} /> Solo &amp; Team Delivery
                </div>
                <p className="text-[11px] text-ink-faint">
                  Autonomous ownership from Figma specs to MySQL schema &amp; live deployment.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Timeline Achievements */}
        <div ref={listRef} className="relative lg:col-span-8 lg:pl-6">
          <div className="absolute left-0 top-0 h-full w-px bg-line" />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-signal via-amber-500 to-signal"
          />

          <div className="flex flex-col gap-8 pl-8">
            {experience.achievements.map((item, idx) => (
              <div
                key={item}
                data-achievement
                onMouseEnter={() => sound.playTick()}
                className="group relative rounded-2xl border border-line bg-paper p-5 shadow-xs transition-all duration-300 hover:border-signal/50 hover:shadow-lg sm:p-6"
              >
                {/* Glowing Node on Timeline */}
                <span className="absolute -left-[2.35rem] top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-paper bg-signal transition-transform duration-300 group-hover:scale-125 shadow-xs" />

                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-signal-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal font-semibold">
                    {ACHIEVEMENT_TAGS[idx % ACHIEVEMENT_TAGS.length]}
                  </span>
                </div>

                <p className="max-w-xl text-balance font-sans text-sm sm:text-base text-ink leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
