"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Send, Check, Copy, ExternalLink, Sparkles, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { RevealWords } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import TiltCard from "@/components/ui/tilt-card";
import { profile } from "@/lib/data";
import { sound } from "@/lib/sound";

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
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: true,
        }).format(new Date())
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Contact() {
  const time = useHyderabadClock();
  const wrapRef = useRef<HTMLDivElement>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useGSAP(
    () => {
      if (!wrapRef.current) return;
      const rows = wrapRef.current.querySelectorAll("[data-contact-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setFormSent(true);
        sound.playChime();
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSent(false), 6000);
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <SectionHeading
        index="06"
        title="Get in Touch"
        description="Have a web platform that needs to move fast? Open to high-impact contracts, full-time engineering roles, and innovative freelance collaborations."
      />

      <div ref={wrapRef} className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Direct Info & Quick Copy */}
        <div data-contact-row className="lg:col-span-6 flex flex-col justify-between gap-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1 font-mono text-xs text-signal font-semibold">
              <Sparkles size={12} />
              <span>Direct Inquiries</span>
            </div>

            <RevealWords
              as="p"
              text="Let's build something exceptional together — from clean scalable APIs to breathtaking interactive interfaces."
              className="text-balance font-display text-2xl font-light leading-snug text-ink sm:text-3xl md:text-4xl"
            />

            {/* Email Box */}
            <div className="mt-8 rounded-2xl border border-line bg-paper-soft/40 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-faint mb-2">
                Primary Contact
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor
                  data-cursor-text="MAIL"
                  className="font-display text-xl sm:text-2xl font-semibold text-ink transition-colors hover:text-signal break-all"
                >
                  {profile.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  data-cursor
                  className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-signal hover:text-signal"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status and Local Time */}
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line/60 pt-4 font-mono text-xs text-ink-faint">
                <span className="flex items-center gap-2 text-ink">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  {profile.location}
                </span>
                {time && (
                  <span className="flex items-center gap-1.5 text-signal font-semibold">
                    <Clock size={13} /> {time} IST
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-4 transition-all duration-300 hover:border-signal hover:shadow-md"
            >
              <div className="flex items-center justify-between text-ink-faint group-hover:text-signal">
                <span className="font-mono text-xs font-bold">GH</span>
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-3 font-mono text-xs text-ink font-medium">GitHub</p>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-4 transition-all duration-300 hover:border-signal hover:shadow-md"
            >
              <div className="flex items-center justify-between text-ink-faint group-hover:text-signal">
                <span className="font-mono text-xs font-bold">IN</span>
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-3 font-mono text-xs text-ink font-medium">LinkedIn</p>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              data-cursor
              className="group flex flex-col justify-between rounded-xl border border-line bg-paper p-4 transition-all duration-300 hover:border-signal hover:shadow-md col-span-2 sm:col-span-1"
            >
              <div className="flex items-center justify-between text-ink-faint group-hover:text-signal">
                <Phone size={14} />
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-3 font-mono text-xs text-ink font-medium">Call Direct</p>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Quick Inquiry Form */}
        <div data-contact-row className="lg:col-span-6">
          <TiltCard
            tiltStrength={12}
            className="rounded-2xl border border-line-strong bg-paper p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <h3 className="font-display text-xl font-medium text-ink">
                Send a Direct Message
              </h3>
              <span className="font-mono text-xs text-signal font-semibold">
                ● FAST RESPONSE
              </span>
            </div>

            {formSent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4 animate-bounce">
                  <Check size={28} />
                </div>
                <h4 className="font-display text-2xl font-semibold text-ink">
                  Message Dispatched!
                </h4>
                <p className="mt-2 max-w-xs font-sans text-sm text-ink-soft">
                  Thank you! Dheeraj will review your message and reply via email within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-faint mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full rounded-xl border border-line bg-paper-soft/60 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/60 focus:border-signal focus:outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-faint mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-line bg-paper-soft/60 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/60 focus:border-signal focus:outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-ink-faint mb-1.5">
                    Project Details / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your timeline, scope, or platform requirements..."
                    className="w-full rounded-xl border border-line bg-paper-soft/60 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/60 focus:border-signal focus:outline-hidden transition-colors resize-none"
                  />
                </div>

                <Magnetic strength={0.25} className="w-full pt-2">
                  {formError && (
                    <p className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-xs text-red-400">
                      ⚠ {formError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formLoading}
                    data-cursor
                    data-cursor-text="SEND"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper shadow-lg transition-all duration-300 hover:bg-signal hover:shadow-signal/25 disabled:opacity-50"
                  >
                    {formLoading ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send size={14} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            )}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
