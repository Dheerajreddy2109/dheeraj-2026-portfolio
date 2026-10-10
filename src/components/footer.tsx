"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { useLenisScroll } from "@/components/providers/smooth-scroll";
import { sound } from "@/lib/sound";

export default function Footer() {
  const { scrollTo } = useLenisScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-8 border-t border-line px-6 py-12 sm:flex-row sm:justify-between sm:px-10 lg:px-16 bg-paper-soft/30 backdrop-blur-xs">
      <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
        <p className="font-mono text-xs text-ink-faint">
          © {year} Dheeraj Sai Charan Reddy — Architected &amp; Built with Next.js 16 &amp; GSAP.
        </p>
        <span className="hidden sm:inline text-line-strong">•</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-signal">
          <Sparkles size={11} /> 60 FPS Kinetic Polish
        </span>
      </div>

      <Magnetic strength={0.4}>
        <button
          data-cursor
          data-cursor-text="TOP"
          onClick={() => {
            sound.playClick();
            scrollTo("#hero");
          }}
          aria-label="Back to top"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-300 hover:border-signal hover:bg-signal hover:text-white shadow-xs"
        >
          <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </Magnetic>
    </footer>
  );
}
