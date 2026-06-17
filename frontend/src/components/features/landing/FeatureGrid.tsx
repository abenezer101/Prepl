// src/components/FeatureGrid.tsx
"use client";
import { motion, Variants } from 'motion/react';
import { Terminal, BrainCircuit, RefreshCw } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function FeatureGrid() {
  return (
    <section className="px-6 max-w-[1200px] mx-auto w-full pt-16">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">Precision hiring, engineered.</motion.h2>
        <motion.p variants={fadeInUp} className="text-lg text-zinc-600 font-medium">We replaced the technical interview with a scalable, bias-free autonomous environment.</motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Card 1: The Dev Sandbox */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          className="group relative md:col-span-2 rounded-[32px] bg-white border border-zinc-200 p-8 md:p-12 overflow-hidden hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10 w-full h-full">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-orange-500 flex items-center justify-center mb-6 border border-yellow-200">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">The Dev Sandbox</h3>
              <p className="text-zinc-600 leading-relaxed font-medium">
                High-fidelity, sandboxed work environments. Candidates build real features in a fully configured browser IDE instead of solving abstract algorithmic riddles on a whiteboard.
              </p>
            </div>
            <div className="flex-1 w-full relative h-[250px] md:h-[300px]">
              <div className="absolute inset-0 bg-zinc-50 rounded-2xl border border-zinc-200 p-6 font-mono text-xs md:text-sm text-zinc-500 shadow-inner overflow-hidden flex flex-col justify-center">
                <div className="flex gap-4 mb-6 border-b border-zinc-200 pb-3">
                  <span className="text-zinc-900 font-semibold">index.js</span>
                  <span className="text-zinc-400">styles.css</span>
                </div>
                <div className="leading-relaxed">
                  <div className="text-fuchsia-500 font-semibold inline">import</div> <span className="text-orange-500">React</span> <div className="text-fuchsia-500 font-semibold inline">from</div> <span className="text-emerald-600">'react'</span>;<br/><br/>
                  <div className="text-orange-500 font-semibold inline">export default function</div> <span className="text-zinc-900">App() {'{'}</span><br/>
                  <span className="pl-4 text-orange-500 font-semibold">return</span> <span className="text-fuchsia-600">{'<div className="sandbox">...</div>'}</span>;<br/>
                  <span className="text-zinc-900">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: The Autonomous Recruiter */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          className="group relative rounded-[32px] bg-white border border-zinc-200 p-8 md:p-10 overflow-hidden hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-orange-500 flex items-center justify-center mb-6 border border-yellow-200 relative z-10">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 relative z-10">The Autonomous Recruiter</h3>
          <p className="text-zinc-600 leading-relaxed font-medium mb-8 relative z-10 text-sm md:text-base">
            24/7 autonomous agent orchestration evaluates candidates dynamically, assessing system design and logic without wasting engineering hours.
          </p>
          <div className="w-full bg-zinc-50 rounded-xl border border-zinc-200 p-5 relative z-10 shadow-sm space-y-4">
             <div className="flex items-start gap-3">
               <div className="w-6 h-6 rounded bg-zinc-900 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">AI</div>
               <div className="text-xs text-zinc-600 bg-white rounded-lg rounded-tl-none p-3 border border-zinc-200">Analyzing time complexity... Found O(n²), probing for optimization strategy.</div>
             </div>
             <div className="flex items-start gap-3 flex-row-reverse">
               <div className="w-6 h-6 rounded bg-gradient-to-br from-fuchsia-500 to-orange-500 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">DEV</div>
               <div className="text-xs text-zinc-700 bg-orange-50 rounded-lg rounded-tr-none p-3 border border-orange-200">"I'll refactor using a hash map to bring it down to O(n)."</div>
             </div>
          </div>
        </motion.div>

        {/* Card 3: The Candidate Flywheel */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          className="group relative rounded-[32px] bg-white border border-zinc-200 p-8 md:p-10 overflow-hidden hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-orange-500 flex items-center justify-center mb-6 border border-yellow-200 relative z-10">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 relative z-10">The Candidate Flywheel</h3>
          <p className="text-zinc-600 leading-relaxed font-medium mb-8 relative z-10 text-sm md:text-base">
            Give candidates an interactive practice portal. Turn rejected applicants into an educated, active talent pipeline mapped to your tech stack.
          </p>
          <div className="w-full flex bg-zinc-50 rounded-xl border border-zinc-200 overflow-hidden relative z-10 shadow-sm h-36">
             <div className="w-1/2 bg-white p-4 border-r border-zinc-200 flex flex-col justify-center items-center text-center">
                <div className="text-2xl md:text-3xl font-bold text-zinc-900">85%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-zinc-500 font-semibold mt-2">Ranked Score</div>
             </div>
             <div className="w-1/2 bg-white p-4 flex flex-col justify-center items-center text-center">
                <div className="text-lg font-bold text-zinc-900 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">Practice</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-zinc-500 font-semibold mt-3">Next Session</div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
