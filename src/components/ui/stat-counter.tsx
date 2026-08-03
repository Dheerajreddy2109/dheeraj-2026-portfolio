"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 1.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.round(counter.val).toString();
        },
      });
    },
    { scope: spanRef, dependencies: [value] }
  );

  return (
    <span className="font-feature-tnum">
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  );
}
