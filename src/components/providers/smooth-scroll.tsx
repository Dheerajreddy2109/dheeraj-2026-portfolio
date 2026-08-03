"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollToTarget = string | number | HTMLElement;

const LenisContext = createContext<{
  scrollTo: (target: ScrollToTarget, options?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
}>({
  scrollTo: () => { },
  stop: () => { },
  start: () => { },
});

export function useLenisScroll() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      document.documentElement.classList.add("has-fine-pointer");
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: ScrollToTarget, options?: Record<string, unknown>) => {
    lenisRef.current?.scrollTo(target, { offset: 0, duration: 1.4, ...options });
  };
  const stop = () => lenisRef.current?.stop();
  const start = () => lenisRef.current?.start();

  return (
    <LenisContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
