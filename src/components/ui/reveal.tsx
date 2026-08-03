"use client";

import { useRef, type ElementType, type ReactNode, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type BaseProps = {
  className?: string;
  lineClassName?: string;
  trigger?: "mount" | "scroll";
  start?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
};

function useRevealAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  {
    trigger = "scroll",
    start = "top 88%",
    delay = 0,
    stagger = 0.08,
  }: Partial<BaseProps>,
  deps: unknown[] = []
) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;
      const targets = scope.querySelectorAll("[data-reveal-unit]");
      if (!targets.length) return;

      gsap.set(targets, { yPercent: 115, opacity: 0, rotateZ: 1.2 });

      const anim = {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        stagger,
        duration: 1,
        ease: "power4.out",
        delay,
      };

      if (trigger === "mount") {
        gsap.to(targets, anim);
      } else {
        gsap.to(targets, {
          ...anim,
          scrollTrigger: {
            trigger: scope,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: scopeRef as RefObject<HTMLElement>, dependencies: deps }
  );
}

export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  trigger = "scroll",
  start = "top 88%",
  delay = 0,
  stagger = 0.08,
  as: Tag = "div",
}: BaseProps & { lines: ReactNode[] }) {
  const scopeRef = useRef<HTMLElement | null>(null);
  useRevealAnimation(scopeRef, { trigger, start, delay, stagger }, [lines.length]);

  return (
    <Tag ref={scopeRef as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <span data-reveal-unit className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealWords({
  text,
  className = "",
  trigger = "scroll",
  start = "top 88%",
  delay = 0,
  stagger = 0.02,
  as: Tag = "p",
}: BaseProps & { text: string }) {
  const scopeRef = useRef<HTMLElement | null>(null);
  useRevealAnimation(scopeRef, { trigger, start, delay, stagger }, [text]);

  const words = text.split(" ");

  return (
    <Tag ref={scopeRef as never} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.15em] align-top"
        >
          <span data-reveal-unit className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
