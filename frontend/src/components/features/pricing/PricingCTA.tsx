"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function PricingCTA() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-zinc-700" />
          Get Started
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl"
        >
          Ready to ace your next interview?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 md:text-lg"
        >
          Start practicing for free today. No credit card required. Calibrate and launch your first mock interview in under 2 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 px-6 py-3.5 text-sm font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] active:scale-[0.995]"
          >
            Start practicing now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 hover:bg-zinc-50 shadow-sm"
          >
            View pricing plans
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),transparent_60%)]" />
    </section>
  );
}
