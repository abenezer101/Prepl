"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Briefcase, GraduationCap, Network, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cases = [
  {
    icon: GraduationCap,
    category: "For Candidates & Graduates",
    title: "Beat the market with calibrated prep",
    description: "Built for recent graduates and job seekers targeting specific roles. Calibrate sessions directly to job descriptions for real practice.",
    longDescription: "Practice with our adaptive AI interviewer that listens to your tone, monitors body language, and dynamically adjusts the interview path. Instantly sync target job descriptions to practice exact role requirements.",
    metric: "92% Placement Rate",
    metricDetail: "from prep to offer",
    ctaText: "Calibrate Your Prep",
    ctaHref: "/signup",
    benefits: [
      "Target-role calibrated mock tracks",
      "Practice STAR behavioral scenarios",
      "Receive real-time speech analytics",
      "Reduce live interview anxiety to zero"
    ],
    accent: "bg-white border-zinc-200/80 shadow-sm"
  },
  {
    icon: Briefcase,
    category: "For Startups & Builders",
    title: "Scale your core team on autopilot",
    description: "Designed for technical founders and solo builders who need to automate first-round technical screenings without recruiters or time drain.",
    longDescription: "Set up autonomous coding sandboxes and behavioral rounds that screen candidates automatically. Prepl grades code correctness, systems design reasoning, and communication skills in real time.",
    metric: "120+ Hours Saved",
    metricDetail: "per technical role",
    ctaText: "Launch Auto-Screening",
    ctaHref: "/signup",
    benefits: [
      "Save 100+ recruitment screening hours",
      "Calibrate coding sandboxes dynamically",
      "Standardize communication benchmarks",
      "Secure objectivity with MediaPipe vision"
    ],
    accent: "bg-white border-zinc-200/80 shadow-sm"
  },
  {
    icon: Network,
    category: "For Universities & Accelerators",
    title: "Plug in career readiness network nodes",
    description: "Integrates with career hubs and accelerators to prepare student cohorts for active hiring tracks.",
    longDescription: "Equip cohorts with custom career readiness dashboards. Integrate with LMS systems like Moodle and Canvas to track prep completion, behavioral scoring, and connect candidates with employers.",
    metric: "10x Prep Capacity",
    metricDetail: "across student cohorts",
    ctaText: "Request Integration",
    ctaHref: "/contact",
    benefits: [
      "Onboard graduating classes at scale",
      "Provide objective readiness dashboards",
      "Connect candidates directly to employer roles",
      "Seamless integration with partner networks"
    ],
    accent: "bg-white border-zinc-200/80 shadow-sm"
  }
];

export function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".uc-card");
      if (!cards.length) return;

      // Cards after the first start off-screen below
      gsap.set(cards.slice(1), { yPercent: 110 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: "top 30px",
          end: `+=${cases.length * 80}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        // Slide the new card up into view
        tl.to(cards[i], { yPercent: 0, duration: 1, ease: "none" }, (i - 1));

        // Push previous cards up + scale down
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              scale: 1 - depth * 0.04,
              y: -depth * 30,
              duration: 1,
              ease: "none",
            },
            i - 1,
          );
        }
      }
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full relative z-10 -mt-24 md:-mt-32 -mb-20 md:-mb-28">
      {/* ── Mobile Section Title ── */}
      <div className="md:hidden max-w-4xl mx-auto px-6 text-center pt-16 pb-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mt-4 mb-4">
          Tailored to your context
        </h2>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto">
          Whether you are preparing for your next role, scaling a technical team, or running cohort readiness at scale.
        </p>
      </div>

      {/* ── Desktop: pinned stack ── */}
      <div ref={desktopContainerRef} className="hidden md:flex w-full h-[800px] flex-col items-center justify-start pt-12 pb-4">
        {/* ── Desktop Section Title ── */}
        <div className="max-w-4xl mx-auto px-6 text-center pb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950 mt-4 mb-4">
            Tailored to your context
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto">
            Whether you are preparing for your next role, scaling a technical team, or running cohort readiness at scale.
          </p>
        </div>

        <div className="relative w-full px-6" style={{ height: 600 }}>
          {cases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`uc-card absolute inset-0 border rounded-lg p-10 md:p-12 flex flex-col md:flex-row gap-10 items-stretch ${item.accent}`}
                style={{
                  zIndex: 10 + idx,
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                }}
              >
                {/* Left: copy and CTA */}
                <div className="flex-[1.3] flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-zinc-800" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-950 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                      {item.longDescription}
                    </p>
                  </div>
                  <Link
                    href={item.ctaHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors mt-6 w-fit"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Right: metrics and checklist */}
                <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-200/60 pt-6 md:pt-0 md:pl-10 flex flex-col justify-between text-left">
                  <div className="mb-6 p-5 bg-zinc-50 rounded-xl border border-zinc-100/80">
                    <div className="text-3xl font-extrabold text-zinc-950 tracking-tight">{item.metric}</div>
                    <div className="text-[11px] font-medium text-zinc-500 mt-1 uppercase tracking-wider font-mono">{item.metricDetail}</div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-4">Core Capabilities</h4>
                    <ul className="space-y-3.5">
                      {item.benefits.map((b, bi) => (
                        <li key={bi} className="flex gap-3 items-start text-xs md:text-sm font-medium text-zinc-700">
                          <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: simple vertical stack ── */}
      <div className="md:hidden w-full px-6 py-16 flex flex-col gap-8">
        {cases.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`border rounded-lg p-8 flex flex-col justify-between ${item.accent}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-zinc-800" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-950 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                  {item.longDescription}
                </p>
                
                <div className="mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="text-2xl font-extrabold text-zinc-950 tracking-tight">{item.metric}</div>
                  <div className="text-[10px] font-medium text-zinc-500 mt-1 uppercase tracking-wider font-mono">{item.metricDetail}</div>
                </div>
              </div>
              <div className="border-t border-zinc-200/60 pt-6 mt-2">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono mb-3">Core Capabilities</h4>
                <ul className="space-y-3 mb-6">
                  {item.benefits.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 items-start text-xs font-medium text-zinc-600">
                      <div className="w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={item.ctaHref}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
