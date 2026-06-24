"use client";
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { FooterHero } from '../../components/features/landing/FooterHero';
import { PremiumCTA } from '../../components/features/landing/PremiumCTA';
import { ArrowRight, Settings, MessageSquare, LineChart, Code2, ShieldCheck, Heart } from 'lucide-react';

const acts = [
  {
    number: "Act 1",
    phase: "Onboarding & Calibration",
    title: "Synthesizing your personalized track",
    icon: Settings,
    bgColor: "bg-white",
    description: "Prepl doesn't use generic, static question banks. Every session is compiled fresh from multiple data sources.",
    steps: [
      {
        subtitle: "Context Ingestion",
        text: "The user describes their target role and uploads a job description, company details, or resume."
      },
      {
        subtitle: "Multimodal Analysis",
        text: "Prepl's ingestion layer parses past portfolios, GitHub repositories, and JD requirements."
      },
      {
        subtitle: "Dynamic Calibration",
        text: "The platform synthesizes a unique interview track calibrated to the specific seniority, function, and company culture."
      }
    ]
  },
  {
    number: "Act 2",
    phase: "The Live Mock Session",
    title: "Conversational adaptation on the fly",
    icon: MessageSquare,
    bgColor: "bg-zinc-50/70 border-zinc-200/80",
    description: "Step into a browser-based multimodal room. The AI interviewer behaves exactly like a senior human evaluator.",
    steps: [
      {
        subtitle: "Multimodal Greeting & Calibration",
        text: "Engage via voice and video. A quick icebreaker calibrates your background audio/video signals and baseline speech pace."
      },
      {
        subtitle: "Adaptive Interrogation",
        text: "The agent doesn't run scripts. It probes vague replies, follows up on technical assertions, and challenges trade-offs."
      },
      {
        subtitle: "Technical Sandboxing",
        text: "For technical tracks, Prepl activates an isolated, secure coding sandbox to assess systems logic and reasoning in real time."
      }
    ]
  },
  {
    number: "Act 3",
    phase: "Intelligence & Growth Loop",
    title: "Actionable performance telemetry",
    icon: LineChart,
    bgColor: "bg-white",
    description: "Receive deep performance analytics immediately after completing your mock or official screening.",
    steps: [
      {
        subtitle: "Competency Breakdown",
        text: "Review structured ratings across role-specific domain knowledge, problem-solving, and STAR-method alignment."
      },
      {
        subtitle: "MediaPipe Behavioral Mapping",
        text: "Analyze local non-verbal indicators including visual focus, speech pacing consistency, and composure under pressure."
      },
      {
        subtitle: "Personalized Growth Action",
        text: "Get the top 3 actionable growth recommendations to focus on before stepping into your live interview."
      }
    ]
  }
];

export default function HowItWorksPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  } as const;

  return (
    <div className="font-sans min-h-screen bg-[#fbf8f3] text-zinc-900 relative overflow-x-hidden selection:bg-stone-300/40">
      {/* Light Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="w-full relative z-10 pt-32 pb-20 flex-1">
          {/* Header */}
          <div className="max-w-[1200px] mx-auto px-6 text-center mb-20">
            <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-white border border-zinc-200/60 px-3 py-1 rounded-full">
              Product Walkthrough
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 mt-6 mb-6 leading-tight max-w-4xl mx-auto">
              Behind the Prepl flywheel
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore the step-by-step choreography of how our AI-native engine calibrates tracks, runs adaptive sessions, and builds career readiness.
            </p>
          </div>

          {/* Core Acts Timeline */}
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-16"
            >
              {acts.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className={`border border-zinc-200/80 rounded-3xl p-8 md:p-12 ${act.bgColor} shadow-[0_12px_24px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row gap-12`}
                  >
                    {/* Left Panel: Act Metadata */}
                    <div className="lg:w-1/3 text-left">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-mono font-bold text-zinc-400 bg-zinc-100 border border-zinc-200/40 px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {act.number}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500">
                          {act.phase}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-4 leading-snug">
                        {act.title}
                      </h2>
                      <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                        {act.description}
                      </p>
                      
                      <div className="mt-8 hidden lg:block">
                        <div className="w-12 h-12 rounded-2xl bg-[#fbf8f3] border border-zinc-200 shadow-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-zinc-800" />
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Step Choreography */}
                    <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-zinc-200/60 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center">
                      <div className="space-y-8">
                        {act.steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex gap-4 items-start text-left">
                            <div className="w-6 h-6 rounded-full bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-zinc-900 text-sm md:text-base mb-1">
                                {step.subtitle}
                              </h4>
                              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-normal">
                                {step.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Global Premium CTA */}
          <div className="flex flex-col gap-0 w-full mt-24 mb-4">
            <PremiumCTA />
            <FooterHero hideCta={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
