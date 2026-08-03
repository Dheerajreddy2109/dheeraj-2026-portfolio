"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { RevealLines, RevealWords } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import Marquee from "@/components/ui/marquee";
import { profile, heroStack } from "@/lib/data";
import { useLenisScroll } from "@/components/providers/smooth-scroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  useGSAP(
    () => {
      gsap.to(scrollCueRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut",
        delay: 2.3,
      });

      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-8 pt-10 sm:px-10 lg:px-16 lg:pb-10 lg:pt-14"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
        <span>
          {profile.role} — {profile.location}
        </span>
        {profile.available && (
          <span className="flex items-center gap-2 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Available for work
          </span>
        )}
      </div>

      <div ref={contentRef} className="mt-10 flex-1 sm:mt-16">
        <RevealLines
          as="h1"
          trigger="mount"
          delay={1.35}
          stagger={0.12}
          lines={[
            "Full-stack builds,",
            <span key="accent" className="italic">
              animated like they mean it.
            </span>,
          ]}
          className="max-w-4xl text-balance font-display text-[15vw] font-medium leading-[0.98] text-ink sm:text-[9.5vw] md:text-[7.5vw] lg:text-[6vw]"
        />

        <RevealWords
          as="p"
          trigger="mount"
          delay={2.05}
          stagger={0.015}
          text="Next.js, Node.js, Express and MySQL under the hood — GSAP animation as the finish. Based in Hyderabad, shipping production platforms since 2024."
          className="mt-8 max-w-md text-balance font-sans text-base text-ink-soft sm:mt-10 sm:max-w-lg sm:text-lg"
        />

        <div className="mt-10 flex flex-wrap items-center gap-6 sm:mt-12">
          <Magnetic>
            <button
              data-cursor
              onClick={() => scrollTo("#work")}
              className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:bg-signal"
            >
              View the work
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              data-cursor
              data-cursor-text="MAIL"
              href={`mailto:${profile.email}`}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-300 hover:text-signal hover:decoration-signal"
            >
              {profile.email}
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-14 flex items-end justify-between gap-6 sm:mt-16">
        <Marquee items={heroStack} className="max-w-[68%] sm:max-w-[80%]" />
        <div
          ref={scrollCueRef}
          className="hidden flex-col items-center gap-3 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="h-10 w-px bg-line-strong" />
        </div>
      </div>
    </section>
  );
}
