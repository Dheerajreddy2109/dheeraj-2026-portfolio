"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenisScroll } from "@/components/providers/smooth-scroll";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const { stop, start } = useLenisScroll();

  useGSAP(
    () => {
      stop();
      document.documentElement.style.overflow = "hidden";

      const counter = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          start();
          if (rootRef.current) rootRef.current.style.display = "none";
        },
      });

      tl.to(counter, {
        val: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.val)
              .toString()
              .padStart(2, "0");
          }
        },
      })
        .to(barRef.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(
          [counterRef.current, barRef.current],
          { opacity: 0, duration: 0.25, ease: "power1.out" },
          1.15
        )
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          1.2
        );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink text-paper"
    >
      <span
        ref={counterRef}
        className="font-feature-tnum font-mono text-sm tracking-[0.3em]"
      >
        00
      </span>
      <div className="mt-6 h-px w-40 overflow-hidden bg-paper/20 sm:w-56">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-signal" />
      </div>
      <span className="mt-6 font-display text-xl italic text-paper/70">
        Dheeraj Reddy
      </span>
    </div>
  );
}
