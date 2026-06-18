"use client";

import { Navbar } from "@/components/layout/Navbar";
import { FooterHero } from "@/components/features/landing/FooterHero";
import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface RowValue {
  value: string | boolean;
}

const rows: { feature: string; free: string | boolean; premium: string | boolean; enterprise: string | boolean }[] = [
  { feature: "Mock practice sessions per month", free: "3", premium: "Unlimited", enterprise: "Unlimited" },
  { feature: "Full AI interviewer (voice + video)", free: true, premium: true, enterprise: true },
  { feature: "Post-session performance report", free: true, premium: true, enterprise: true },
  { feature: "Behavioral analysis (MediaPipe)", free: true, premium: true, enterprise: true },
  { feature: "Growth recommendations", free: true, premium: true, enterprise: true },
  { feature: "Universal accessibility suite", free: true, premium: true, enterprise: true },
  { feature: "Session calibration", free: "Target role or pasted JD", premium: "Any target company", enterprise: "Custom frameworks" },
  { feature: "Historical tracking", free: false, premium: true, enterprise: true },
  { feature: "Custom session generation", free: false, premium: true, enterprise: true },
  { feature: "Company-specific calibration", free: false, premium: true, enterprise: true },
  { feature: "Multi-industry practice tracks", free: false, premium: true, enterprise: true },
  { feature: "Cross-session improvement analytics", free: false, premium: true, enterprise: true },
  { feature: "Comparison to anonymized benchmarks", free: false, premium: true, enterprise: true },
  { feature: "Export reports", free: false, premium: true, enterprise: "Custom exports" },
  { feature: "Priority session generation", free: false, premium: true, enterprise: "Dedicated infra" },
  { feature: "SSO / SAML authentication", free: false, premium: false, enterprise: true },
  { feature: "Dedicated account manager", free: false, premium: false, enterprise: true },
  { feature: "Custom integrations & API access", free: false, premium: false, enterprise: true },
  { feature: "White-label / branded experience", free: false, premium: false, enterprise: true },
  { feature: "Custom evaluation frameworks", free: false, premium: false, enterprise: true },
  { feature: "SLA agreement & priority support", free: false, premium: false, enterprise: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800/50 border border-zinc-700/30">
        <X className="w-3.5 h-3.5 text-zinc-600" />
      </span>
    );
  }
  return <span className="text-sm text-zinc-300">{value}</span>;
}

export function PricingPageClient() {
  return (
    <div className="font-sans min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-stone-500/50">
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="w-full relative z-10 pt-32 pb-0 flex flex-col gap-24 md:gap-32">
          <section className="w-full px-4 md:px-6">
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">
                  <Sparkles className="h-3.5 w-3.5 text-stone-200" />
                  Full Comparison
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
                  Free vs Premium vs Enterprise
                </h2>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  Every feature, every tier. No hidden limits.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm overflow-hidden"
              >
                <div className="hidden md:grid grid-cols-4 gap-0 border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Feature</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400 text-center">Free</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-200 text-center">Premium</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-200 text-center">Enterprise</div>
                </div>
                <div className="divide-y divide-zinc-800/50">
                  {rows.map((row, i) => (
                    <div key={row.feature} className="px-4 md:px-6 py-4 hover:bg-zinc-900/40 transition-colors">
                      <div className="md:grid md:grid-cols-4 md:gap-0">
                        <div className="text-sm text-zinc-300 font-medium mb-2 md:mb-0 md:flex md:items-center">{row.feature}</div>
                        <div className="flex items-center gap-3 md:justify-center text-sm md:text-base">
                          <span className="md:hidden text-xs uppercase tracking-wider text-zinc-500 w-16 shrink-0">Free</span>
                          <Cell value={row.free} />
                        </div>
                        <div className="flex items-center gap-3 md:justify-center text-sm md:text-base">
                          <span className="md:hidden text-xs uppercase tracking-wider text-zinc-500 w-16 shrink-0">Premium</span>
                          <Cell value={row.premium} />
                        </div>
                        <div className="flex items-center gap-3 md:justify-center text-sm md:text-base">
                          <span className="md:hidden text-xs uppercase tracking-wider text-zinc-500 w-16 shrink-0">Enterprise</span>
                          <Cell value={row.enterprise} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-10 text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-5 py-2 text-sm text-zinc-400">
                  <Phone className="w-4 h-4 text-stone-200" />
                  Need Enterprise?{" "}
                  <Link href="/contact" className="text-stone-200 hover:text-white font-semibold underline underline-offset-4 transition-colors">
                    Contact our sales team
                  </Link>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-xs text-zinc-600 mt-6"
              >
                $19/month vs. $100–$500+ for a single hour with a human coach. Infinitely scalable, available 24/7.
              </motion.p>
            </div>
          </section>

          <FooterHero />
        </main>
      </div>
    </div>
  );
}
