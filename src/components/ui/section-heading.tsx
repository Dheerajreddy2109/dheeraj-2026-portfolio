"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealLines } from "./reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: lineRef }
  );

  return (
    <div className="mb-14 md:mb-20">
      <div className="mb-5 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
        <span className="text-signal">{index}</span>
        <span>/ 06</span>
      </div>
      <RevealLines
        as="h2"
        lines={[title]}
        className="font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl md:text-6xl"
      />
      {description && (
        <p className="mt-5 max-w-xl text-balance font-sans text-ink-soft">
          {description}
        </p>
      )}
      <div
        ref={lineRef}
        className="mt-8 h-px w-full origin-left scale-x-0 bg-line-strong"
      />
    </div>
  );
}
