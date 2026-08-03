"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { RevealWords } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import { profile } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useHyderabadClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Contact() {
  const time = useHyderabadClock();
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapRef.current) return;
      const rows = wrapRef.current.querySelectorAll("[data-contact-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <section id="contact" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading index="06" title="Contact" />

      <div ref={wrapRef} className="flex flex-col gap-12">
        <RevealWords
          as="p"
          text="Have a project that needs to move? I'm currently open to freelance work and full-time roles."
          className="max-w-3xl text-balance font-display text-3xl font-light leading-snug text-ink sm:text-4xl md:text-5xl"
        />

        <div data-contact-row className="w-fit opacity-0">
          <Magnetic strength={0.25}>
            <a
              data-cursor
              data-cursor-text="SAY HI"
              href={`mailto:${profile.email}`}
              className="group inline-flex max-w-full items-baseline gap-3 break-all border-b-2 border-ink pb-2 font-display text-xl text-ink transition-colors duration-300 hover:border-signal hover:text-signal sm:text-3xl md:text-5xl lg:text-6xl"
            >
              {profile.email}
            </a>
          </Magnetic>
        </div>

        <div
          data-contact-row
          className="flex flex-wrap items-center gap-x-10 gap-y-6 font-mono text-xs uppercase tracking-wider text-ink-soft opacity-0"
        >
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 transition-colors duration-300 hover:text-signal"
          >
            <Phone size={14} /> {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-signal"
          >
            <span className="font-bold">GH</span> {profile.githubLabel}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-signal"
          >
            <span className="font-bold">IN</span> {profile.linkedinLabel}
          </a>
          <span className="flex items-center gap-2">
            {profile.location}
            {time && <span className="text-ink-faint">· {time} IST</span>}
          </span>
        </div>
      </div>
    </section>
  );
}
