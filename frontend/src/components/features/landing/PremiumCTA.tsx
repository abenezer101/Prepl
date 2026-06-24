"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function PremiumCTA() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[1480px] mx-auto px-6 mb-12 md:mb-20 pb-4 relative z-10"
    >
      <div 
        className="w-full bg-background bg-cover bg-center bg-no-repeat border border-zinc-200/100 shadow-[0_24px_48px_-15px_rgba(0,0,0,0.03)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/mountain-bg.png')" }}
      >
        {/* Left Column: Minimal content */}
        <div className="flex-1 max-w-lg text-left relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 mb-4 leading-tight">
            Ready to walk in prepared?
          </h2>
          
          <p className="text-zinc-500 text-base md:text-lg mb-8 leading-relaxed font-normal">
            Calibrate a mock session to your target role, paste any job description, and get speech and structural feedback in seconds. Free to start.
          </p>
          
          {/* Signup Button Styled exactly like Navbar */}
          <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[3px] rounded-full inline-flex">
            <Link href="/signup" className="group p-[2px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_0_16px_rgba(96,165,250,0.12)] active:shadow-[0_0px_1px_rgba(0,0,0,0.06)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center block">
              <div className="bg-gradient-to-b from-white to-zinc-100 rounded-full flex gap-2 items-center justify-center px-6 py-2.5">
                <span className="font-semibold text-zinc-900 leading-none">Practice for free</span>
                <ArrowRight className="w-4 h-4 text-zinc-800" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Right Column: Candidate Image & Minimal Report Visual */}
        <div className="flex flex-col sm:flex-row items-stretch relative z-10 w-full md:w-auto shrink-0">
          {/* Candidate Image */}
          <div className="w-full sm:w-[190px] h-[240px] sm:h-auto rounded-t-2xl sm:rounded-l-2xl rounded-b-none sm:rounded-r-none overflow-hidden border border-zinc-200 shadow-sm shrink-0 bg-white relative z-10 sm:-translate-x-20">
            <img 
              src="/images/candidate.png" 
              alt="Candidate practicing on Prepl"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
            />
            <div className="absolute inset-0 ring-1 ring-black/5 rounded-t-2xl sm:rounded-l-2xl rounded-b-none sm:rounded-r-none pointer-events-none" />
          </div>

          {/* Calibration Session Card */}
          <div className="w-full sm:w-[320px] shrink-0 bg-white/70 backdrop-blur-xl border border-white/50 rounded-b-2xl sm:rounded-r-2xl rounded-t-none sm:rounded-l-none p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] text-left relative z-20 -mt-16 sm:mt-0 sm:-ml-20">
            <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 mb-4">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Calibration Session</span>
              <span className="text-xs font-bold text-zinc-950 font-mono">94% score</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-zinc-200/40">
                  <span className="text-zinc-500 font-medium">Communication pace</span>
                  <span className="text-zinc-800 font-mono font-semibold">128 wpm</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-zinc-200/40">
                  <span className="text-zinc-500 font-medium">Filler word frequency</span>
                  <span className="text-zinc-800 font-mono font-semibold">0.8%</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-0.5">
                  <span className="text-zinc-500 font-medium">STAR method structure</span>
                  <span className="text-zinc-800 font-mono font-semibold">Strong</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200/80 p-3 rounded-xl mt-2">
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                  Delivery is calm, structured, and matches top 5% candidate benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
