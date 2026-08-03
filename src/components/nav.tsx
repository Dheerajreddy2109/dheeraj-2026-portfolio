"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Mail, Menu, X, Moon, SunMedium } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { sections, profile } from "@/lib/data";
import { useLenisScroll } from "@/components/providers/smooth-scroll";

const socials = [
  { icon: null, glyph: "GH", href: profile.github, label: "GitHub" },
  { icon: null, glyph: "IN", href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, glyph: null, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollTo, stop, start } = useLenisScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("section[id]"));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      if (menuOpen) {
        stop();
        gsap.set(menu, { display: "flex" });
        gsap.fromTo(
          menu,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          menu.querySelectorAll("[data-menu-item]"),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            delay: 0.1,
            ease: "power4.out",
          }
        );
      } else {
        start();
        gsap.to(menu, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(menu, { display: "none" }),
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  function goTo(id: string) {
    setMenuOpen(false);
    scrollTo(`#${id}`);
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center justify-between border-r border-line bg-paper/80 py-8 backdrop-blur-sm lg:flex">
        <button
          data-cursor
          data-cursor-text="TOP"
          onClick={() => goTo("hero")}
          className="font-display text-lg italic text-ink"
          aria-label="Back to top"
        >
          DR
        </button>

        <ul className="flex flex-col items-center gap-5">
          {sections.map((s) => (
            <li key={s.id} className="group relative">
              <button
                data-cursor
                onClick={() => goTo(s.id)}
                className="flex flex-col items-center gap-1.5 py-1"
                aria-label={s.label}
              >
                <span
                  className={`font-mono text-[11px] transition-colors ${
                    active === s.id
                      ? "text-signal"
                      : "text-ink-faint group-hover:text-ink"
                  }`}
                >
                  {s.index}
                </span>
                <span
                  className={`w-px transition-all ${
                    active === s.id
                      ? "h-5 bg-signal"
                      : "h-3 bg-line-strong group-hover:bg-ink-soft"
                  }`}
                />
              </button>
              <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-sm border border-line bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-5">
          <button
            data-cursor
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-ink-soft transition-colors hover:text-signal"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <SunMedium size={16} />
            ) : (
              <Moon size={16} />
            )}
          </button>
          <div className="flex flex-col items-center gap-4">
            {socials.map(({ icon: Icon, glyph, href, label }) => (
              <a
                key={label}
                data-cursor
                data-cursor-text={label.toUpperCase()}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="text-ink-soft transition-colors hover:text-signal"
              >
                {Icon ? (
                  <Icon size={15} />
                ) : (
                  <span className="font-mono text-[10px] font-bold tracking-tight">
                    {glyph}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-paper/85 px-5 backdrop-blur-sm lg:hidden">
        <button
          onClick={() => goTo("hero")}
          className="font-display text-lg italic text-ink"
        >
          Dheeraj Reddy
        </button>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-ink-soft"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <SunMedium size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-ink"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-50 flex-col justify-between bg-paper px-8 pb-10 pt-24 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {sections.map((s) => (
            <li key={s.id} className="overflow-hidden">
              <button
                data-menu-item
                onClick={() => goTo(s.id)}
                className="flex w-full items-baseline gap-4 border-b border-line py-4 text-left"
              >
                <span className="font-mono text-xs text-signal">
                  {s.index}
                </span>
                <span className="font-display text-3xl text-ink">
                  {s.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div data-menu-item className="flex items-center gap-6">
          {socials.map(({ icon: Icon, glyph, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="text-ink-soft"
            >
              {Icon ? (
                <Icon size={20} />
              ) : (
                <span className="font-mono text-xs font-bold tracking-tight">
                  {glyph}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
