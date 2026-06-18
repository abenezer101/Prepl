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
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300"
        >
          <Sparkles className="h-3.5 w-3.5 text-stone-200" />
          Get Started
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Ready to transform your hiring?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg"
        >
          Start your free trial today. No credit card required. Deploy your first autonomous screener in under 5 minutes.
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
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-stone-200 to-stone-300 px-6 py-3.5 text-sm font-bold text-stone-900 shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.35)] active:scale-[0.995]"
          >
            Start free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
          >
            Book a demo
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
    </section>
  );
}
