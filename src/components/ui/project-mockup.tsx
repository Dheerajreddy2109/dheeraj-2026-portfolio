"use client";

import { Lock, ShieldAlert, Cpu, Activity, LayoutGrid, Terminal, Globe2, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectMockupProps {
  project: Project;
  interactive?: boolean;
}

export default function ProjectMockup({ project }: ProjectMockupProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-line-strong/60 bg-paper-strong/40 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-signal/40">
      {/* Browser Chrome Header */}
      <div className="flex h-8 items-center justify-between border-b border-line bg-paper/90 px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex max-w-[65%] items-center gap-1.5 truncate rounded-md bg-paper-soft/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-faint">
          <Lock size={10} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="truncate">{project.url}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-ink-faint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
          <span className="hidden sm:inline">LIVE</span>
        </div>
      </div>

      {/* Simulated Screen Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden p-4">
        {/* Ambient Gradient Glow */}
        <div
          className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
        />

        {project.index === "01" && (
          // SAP Security Expert Community UI
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-signal font-semibold">
                SAP GRC &amp; Security Portal
              </span>
              <span className="rounded bg-signal-soft px-1.5 py-0.5 font-mono text-[9px] text-signal font-medium">
                v2.4 Production
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2.5 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-signal/20 text-signal flex items-center justify-center font-bold text-[9px]">
                    GR
                  </div>
                  <div>
                    <p className="font-semibold text-ink line-clamp-1">S/4HANA Role Redesign &amp; SoD Remediation Guide</p>
                    <p className="text-[10px] text-ink-faint">Discussion • 42 replies • 1.8k views</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2.5 shadow-sm opacity-80">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-[9px]">
                    AU
                  </div>
                  <div>
                    <p className="font-semibold text-ink line-clamp-1">Fiori Catalog Authorizations Architecture</p>
                    <p className="text-[10px] text-ink-faint">Knowledge Base • 8 min read</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint pt-1">
              <span>Next.js + Express API</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">AWS Clustered</span>
            </div>
          </div>
        )}

        {project.index === "02" && (
          // SuccessWikis Founder Magazine UI
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-500 font-semibold">
                Founder Stories &amp; Growth Breakdowns
              </span>
              <span className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[9px] text-blue-500">
                Featured
              </span>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/90 p-3 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex items-center gap-1.5 text-blue-500 font-mono text-[9px] mb-1">
                <Sparkles size={11} />
                <span>CASE STUDY #148</span>
              </div>
              <p className="font-display text-sm font-semibold text-ink leading-tight">
                How Bootstrapped SaaS Teams Scale to $10M ARR
              </p>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-ink-faint">
                <span>By Editorial Team</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>Fast React Search</span>
              <span>PHP/MySQL CMS</span>
            </div>
          </div>
        )}

        {project.index === "03" && (
          // ClyftAI SaaS Dashboard UI
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 font-semibold flex items-center gap-1.5">
                <Activity size={12} /> SoD Risk Matrix Analyzer
              </span>
              <span className="font-mono text-[10px] text-emerald-500 font-semibold">Risk: LOW (1.4%)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2 text-center">
                <p className="font-mono text-[9px] text-ink-faint">SAP Users</p>
                <p className="font-display text-base font-bold text-ink">4,820</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2 text-center">
                <p className="font-mono text-[9px] text-ink-faint">Violations</p>
                <p className="font-display text-base font-bold text-amber-500">12</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2 text-center">
                <p className="font-mono text-[9px] text-ink-faint">Mitigated</p>
                <p className="font-display text-base font-bold text-emerald-500">98%</p>
              </div>
            </div>
            <div className="rounded border border-line/60 bg-paper/60 p-2">
              <div className="flex justify-between font-mono text-[9px] text-ink-faint mb-1">
                <span>GSAP Dynamic Timeline</span>
                <span>60 FPS Scrub</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          </div>
        )}

        {project.index === "04" && (
          // ThreatSenseAI Cybersecurity Radar UI
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-rose-500 font-semibold flex items-center gap-1.5">
                <ShieldAlert size={12} /> SOC Alert Telemetry
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-rose-500 animate-pulse font-bold">
                ● ACTIVE DEFENSE
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink text-[11px]">Suspicious Privilege Escalation</p>
                  <p className="font-mono text-[9px] text-ink-faint">Node: prod-east-db-04 • Blocked</p>
                </div>
                <span className="rounded bg-rose-500 text-white px-1.5 py-0.5 font-mono text-[8px] font-bold">
                  CRITICAL
                </span>
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink text-[11px]">Firewall Anomaly Ingress</p>
                  <p className="font-mono text-[9px] text-ink-faint">IP: 194.26.29.x • Quarantined</p>
                </div>
                <span className="rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 font-mono text-[8px] font-bold">
                  MEDIUM
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>React + GSAP Motion</span>
              <span className="text-signal">Zero Latency UI</span>
            </div>
          </div>
        )}

        {project.index === "05" && (
          // S4access Enterprise Portal
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1.5">
                <Globe2 size={12} /> Enterprise Advisory Firm
              </span>
              <span className="font-mono text-[9px] text-ink-faint">140+ Consultants</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2.5">
                <p className="font-mono text-[9px] text-ink-faint">Completed Audits</p>
                <p className="font-display text-xl font-bold text-ink">300+</p>
                <p className="font-mono text-[8px] text-cyan-600 dark:text-cyan-400 mt-1">Global Engagements</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2.5">
                <p className="font-mono text-[9px] text-ink-faint">Lighthouse Score</p>
                <p className="font-display text-xl font-bold text-emerald-500">98/100</p>
                <p className="font-mono text-[8px] text-ink-faint mt-1">Next.js Optimized</p>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>Responsive Architecture</span>
              <span>Conversion Funnels</span>
            </div>
          </div>
        )}

        {project.index === "06" && (
          // The Sase Tech Cloud Security
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-500 font-semibold flex items-center gap-1.5">
                <Cpu size={12} /> SASE Cloud Network Edge
              </span>
              <span className="rounded bg-purple-500/10 px-1.5 py-0.5 font-mono text-[9px] text-purple-500">
                Encrypted
              </span>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/80 p-3 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-ink font-medium">Edge POP Gateways</span>
                <span className="text-emerald-500 font-bold">120 Active</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-ink font-medium">Zero Trust Tunnel</span>
                <span className="text-purple-500 font-bold">mTLS 1.3</span>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>Interactive GSAP Pin</span>
              <span>Network Topology</span>
            </div>
          </div>
        )}

        {project.index === "07" && (
          // Loooped.in Workdesk
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                <LayoutGrid size={12} /> Workdesk Sprint Board
              </span>
              <span className="font-mono text-[9px] text-ink-faint">Docker Containerized</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2">
                <span className="font-mono text-[8px] uppercase tracking-wider text-amber-500">In Progress</span>
                <p className="font-semibold text-ink text-[10px] mt-1 line-clamp-1">API JWT Auth Middleware</p>
                <div className="mt-1 h-1 w-full bg-amber-500/30 rounded" />
              </div>
              <div className="rounded-lg border border-line/60 bg-paper/80 p-2">
                <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-500">Done</span>
                <p className="font-semibold text-ink text-[10px] mt-1 line-clamp-1">MySQL Docker Orchestration</p>
                <div className="mt-1 h-1 w-full bg-emerald-500 rounded" />
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>TypeScript React</span>
              <span>Express + MySQL API</span>
            </div>
          </div>
        )}

        {project.index === "08" && (
          // WebAnatomy Hybrid Platform
          <div className="flex flex-1 flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between border-b border-line/60 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-teal-500 font-semibold flex items-center gap-1.5">
                <Terminal size={12} /> Web Engineering Platform
              </span>
              <span className="font-mono text-[9px] text-emerald-500">Online</span>
            </div>
            <div className="rounded-lg border border-line/60 bg-paper/80 p-2.5 font-mono text-[10px] space-y-1.5">
              <div className="flex justify-between text-ink-faint">
                <span>Frontend:</span>
                <span className="text-ink font-medium">Next.js SSR</span>
              </div>
              <div className="flex justify-between text-ink-faint">
                <span>Service Layer:</span>
                <span className="text-ink font-medium">PHP Microservices</span>
              </div>
              <div className="flex justify-between text-ink-faint">
                <span>Runtime:</span>
                <span className="text-teal-500 font-medium">Docker Multi-Container</span>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>High Concurrency</span>
              <span>Zero-Downtime Deploy</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Pill Details */}
      <div className="flex items-center justify-between border-t border-line bg-paper-soft/40 px-3.5 py-2 font-mono text-[10px] text-ink-soft">
        <span className="text-signal font-semibold">{project.year}</span>
        <span className="truncate max-w-[60%] text-right">{project.stack.slice(0, 3).join(" • ")}</span>
      </div>
    </div>
  );
}
