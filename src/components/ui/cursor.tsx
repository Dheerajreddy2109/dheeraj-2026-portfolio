"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (mq.matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    function move(e: MouseEvent) {
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-text") || "");
      }
    }
    function onOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (target) {
        setHovering(false);
        setLabel("");
      }
    }
    function onDown() {
      gsap.to([ring], { scale: 0.85, duration: 0.2 });
    }
    function onUp() {
      gsap.to([ring], { scale: 1, duration: 0.2 });
    }

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-signal will-change-transform"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border will-change-transform transition-[width,height,background-color,border-color] duration-300 ease-out ${
          hovering
            ? "h-16 w-16 border-transparent bg-ink text-paper"
            : "h-8 w-8 border-ink-soft/50 bg-transparent"
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
