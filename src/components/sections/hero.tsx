"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Copy, Check, Sparkles, Code2 } from "lucide-react";
import { RevealLines, RevealWords } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import Marquee from "@/components/ui/marquee";
import ScrambleText from "@/components/ui/scramble-text";
import { profile, heroStack } from "@/lib/data";
import { useLenisScroll } from "@/components/providers/smooth-scroll";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState<string>("");
  const { scrollTo } = useLenisScroll();

  useEffect(() => {
    const updateTime = () => {
      setIstTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: true,
        }).format(new Date())
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  useGSAP(
    () => {
      // Bouncing scroll cue
      gsap.to(scrollCueRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut",
        delay: 2.3,
      });

      // Parallax scroll fade on hero content
      gsap.to(contentRef.current, {
        yPercent: -20,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating tech pills staggered entry
      if (techPillsRef.current) {
        const pills = techPillsRef.current.querySelectorAll("[data-hero-pill]");
        gsap.fromTo(
          pills,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            delay: 1.8,
            ease: "back.out(1.7)",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-8 pt-10 sm:px-10 lg:px-16 lg:pb-10 lg:pt-14"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span>
            {profile.role} · {profile.location}
          </span>
          {istTime && (
            <span className="hidden sm:inline-block text-ink font-semibold">
              [{istTime} IST]
            </span>
          )}
        </div>

        {profile.available && (
          <span className="flex items-center gap-2 rounded-full border border-line bg-paper-soft/60 px-3 py-1 text-ink shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for new opportunities
          </span>
        )}
      </div>

      {/* Main Kinetic Hero Content */}
      <div ref={contentRef} className="mt-8 flex-1 sm:mt-14">
        {/* Eyebrow Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft/70 px-3.5 py-1.5 font-mono text-xs text-ink-soft shadow-xs backdrop-blur-sm">
          <Sparkles size={13} className="text-signal animate-spin [animation-duration:8s]" />
          <span>Interactive 2026 Engineering Portfolio</span>
        </div>

        <RevealLines
          as="h1"
          trigger="mount"
          delay={1.35}
          stagger={0.14}
          lines={[
            "Full-stack builds,",
            <span key="accent" className="italic bg-gradient-to-r from-signal via-amber-600 to-signal bg-clip-text text-transparent">
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
          text="Next.js, Node.js, Express and MySQL under the hood — GSAP motion design as the finish. Based in Hyderabad, architecting & shipping production platforms since 2024."
          className="mt-6 max-w-md text-balance font-sans text-base text-ink-soft sm:mt-8 sm:max-w-xl sm:text-lg leading-relaxed"
        />

        {/* Interactive Floating Tech Stack Pills */}
        <div ref={techPillsRef} className="mt-8 flex flex-wrap items-center gap-2">
          {heroStack.map((tech) => (
            <span
              key={tech}
              data-hero-pill
              className="group flex items-center gap-1.5 rounded-full border border-line/80 bg-paper-soft/70 px-3.5 py-1.5 font-mono text-[11px] text-ink-soft backdrop-blur-sm transition-all duration-300 hover:border-signal hover:bg-signal/10 hover:text-signal"
            >
              <Code2 size={11} className="text-signal opacity-70 group-hover:rotate-12 transition-transform" />
              <ScrambleText text={tech} />
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-5 sm:mt-12">
          <Magnetic strength={0.35}>
            <button
              data-cursor
              data-cursor-text="EXPLORE"
              onClick={() => {
                sound.playClick();
                scrollTo("#work");
              }}
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-paper shadow-xl transition-all duration-300 hover:bg-signal hover:shadow-signal/25"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              data-cursor
              onClick={copyEmail}
              className="group flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink shadow-xs transition-all duration-300 hover:border-signal hover:text-signal"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="transition-transform group-hover:scale-110" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <button
              data-cursor
              onClick={() => {
                sound.playClick();
                scrollTo("#contact");
              }}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-300 hover:text-signal hover:decoration-signal"
            >
              Get in touch →
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Kinetic Marquee & Scroll Indicator */}
      <div className="mt-14 flex items-end justify-between gap-6 sm:mt-16">
        <Marquee items={heroStack} className="max-w-[72%] sm:max-w-[85%]" />
        <div
          ref={scrollCueRef}
          className="hidden flex-col items-center gap-3 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-signal to-line" />
        </div>
      </div>
    </section>
  );
}
