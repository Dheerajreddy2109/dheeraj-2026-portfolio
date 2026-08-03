"use client";

import { ArrowUp } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { useLenisScroll } from "@/components/providers/smooth-scroll";

export default function Footer() {
  const { scrollTo } = useLenisScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-8 border-t border-line px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-16">
      <p className="font-mono text-xs text-ink-faint">
        © {year} Dheeraj Reddy — designed &amp; built by hand, with GSAP.
      </p>
      <Magnetic strength={0.5}>
        <button
          data-cursor
          onClick={() => scrollTo("#hero")}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
        >
          <ArrowUp size={16} />
        </button>
      </Magnetic>
    </footer>
  );
}
