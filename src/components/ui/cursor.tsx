"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  const enabled = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });

    let lastX = 0;
    let lastY = 0;

    function move(e: MouseEvent) {
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.hypot(dx, dy);

      if (speed > 4 && !hovering) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = Math.min(1.4, 1 + speed * 0.008);
        const squeeze = Math.max(0.7, 1 - speed * 0.005);

        gsap.to(ring, {
          rotation: angle,
          scaleX: stretch,
          scaleY: squeeze,
          duration: 0.15,
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.25,
          overwrite: "auto",
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-text") || "");
        gsap.to(ring, { rotation: 0, scaleX: 1, scaleY: 1, duration: 0.2 });
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
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
    }
    function onUp() {
      gsap.to(ring, { scale: 1, duration: 0.2 });
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
  }, [enabled, hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-signal will-change-transform shadow-xs"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border will-change-transform transition-[width,height,background-color,border-color] duration-300 ease-out ${
          hovering
            ? "h-16 w-16 border-transparent bg-ink text-paper shadow-xl"
            : "h-8 w-8 border-ink-soft/40 bg-transparent"
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
