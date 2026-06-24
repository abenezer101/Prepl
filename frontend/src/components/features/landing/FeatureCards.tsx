"use client";

import { motion } from "motion/react";
import { Bot, BarChart3, Shield } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

function FeatureCard({ title, description, icon, gradient, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col justify-start items-start w-full max-w-[260px] md:max-w-[300px] group mx-auto"
    >
      <div
        className="absolute inset-0 w-full h-[260px] md:h-[300px] opacity-60 group-hover:opacity-90 rounded-[40px] pointer-events-none transition-all duration-500 group-hover:scale-110"
        style={{ background: gradient, filter: "blur(45px)" }}
      />
      <div
        className="relative self-stretch h-[260px] md:h-[300px] rounded-[40px] z-10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-zinc-200/50"
        style={{
          background: `linear-gradient(#ffffff, #ffffff) padding-box, ${gradient} border-box`,
          border: "8px solid transparent",
        }}
      >
        <div className="w-full h-full p-7 flex flex-col justify-between">
          <div className="text-zinc-800">{icon}</div>
          <div>
            <h3 className="text-zinc-900 font-semibold text-xl mb-3 tracking-tight">{title}</h3>
            <p className="text-zinc-600 text-[14px] leading-[1.6] font-normal selection:bg-black/10">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const cards = [
  {
    title: "AI Interviewer",
    icon: <Bot size={32} strokeWidth={2.5} />,
    delay: 0.1,
    description:
      "Autonomous AI agents conduct high-fidelity, voice + video interviews in a sandboxed environment. Zero human overhead.",
    gradient: "linear-gradient(137deg, #1E3A5F 0%, #4A90D9 45%, #7BB8F5 100%)",
  },
  {
    title: "Smart Analytics",
    icon: <BarChart3 size={32} strokeWidth={2.5} />,
    delay: 0.2,
    description:
      "Deep performance insights with cross-session trend analysis, anonymized benchmarks, and actionable growth recommendations.",
    gradient: "linear-gradient(137deg, #0F2B45 0%, #2563EB 45%, #60A5FA 100%)",
  },
  {
    title: "Secure Sandbox",
    icon: <Shield size={32} strokeWidth={2.5} />,
    delay: 0.3,
    description:
      "Candidates run code in an isolated, full-featured development environment. Real signal without the security risk.",
    gradient: "linear-gradient(137deg, #1A1A3E 0%, #3B82F6 45%, #818CF8 100%)",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-[#fbf8f3] flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3 lg:gap-3 w-full max-w-[936px]">
        {cards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
