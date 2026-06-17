// src/components/HeroSection.tsx
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Code2, Sparkles, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';

interface Variants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen pt-20 flex flex-col justify-center overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-yellow-200/40 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-orange-200/40 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-fuchsia-200/30 blur-[120px]" />
        {/* Soft white fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>

      <div className="px-6 max-w-[1200px] mx-auto text-center w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto relative z-10"
        >
        {/* Top badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 backdrop-blur-md text-xs font-semibold tracking-widest text-orange-600 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Introducing Prepl
          </div>
        </motion.div>
        
        {/* Headline */}
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-900 leading-[1.1]">
          Hire engineers <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-orange-500 to-yellow-500">while you sleep.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Prepl deploys autonomous agents to run candidates through a sandboxed replica of a professional development environment. A zero-effort screening pipeline that identifies true engineering signal.
        </motion.p>
        
        {/* Dual CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-24">
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-zinc-200/50 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/login" className="w-full group p-[4px] rounded-full bg-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:shadow-[0_0px_1px_rgba(0,0,0,0.1)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-zinc-900 group-hover:bg-black rounded-full px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-white">Deploy Autonomous Screener</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-zinc-100 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/login" className="w-full group p-[4px] rounded-full bg-white border border-zinc-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-zinc-50 active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-white group-hover:bg-zinc-50 rounded-full px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-zinc-900">Practice for Free</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The Hero Asset - Product Blueprint Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full relative max-w-5xl mx-auto z-10"
      >
         <div className="p-2 sm:p-4 rounded-3xl bg-white/50 border border-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl">
            <div className="rounded-2xl overflow-hidden bg-white border border-zinc-200 flex flex-col h-[500px] text-left">
               {/* Header Bar */}
               <div className="h-12 border-b border-zinc-200 bg-zinc-50 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                     <Terminal className="w-3.5 h-3.5" /> preview-sandbox-agent-04
                  </div>
                  <div className="w-12"></div>
               </div>
               {/* Body */}
               <div className="flex-1 flex overflow-hidden">
                  {/* Sidebar Code Context */}
                  <div className="w-1/3 border-r border-zinc-200 bg-zinc-50 p-4 hidden md:block">
                     <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                       <Code2 className="w-4 h-4" /> Filesystem
                     </div>
                     <div className="space-y-2 font-mono text-sm text-zinc-500">
                        <div className="text-zinc-900 font-medium">src/</div>
                        <div className="pl-4">components/</div>
                        <div className="pl-8 text-orange-500 font-medium">App.tsx <span className="text-zinc-400 ml-2 text-xs">● Active</span></div>
                        <div className="pl-8">Button.tsx</div>
                        <div className="pl-4 text-zinc-900 font-medium">hooks/</div>
                        <div className="pl-4">utils/</div>
                     </div>
                  </div>
                  {/* Main Viewer */}
                  <div className="flex-1 flex flex-col relative bg-white">
                     <div className="p-6 font-mono text-sm text-zinc-500 space-y-4">
                        <div className="animate-pulse flex items-center gap-2 text-orange-500"><Sparkles className="w-4 h-4"/> Agent analyzing code structure...</div>
                        <div className="text-emerald-500">▶ Executing tests... [PASS] 42/42</div>
                        <div>Evaluating system design choices...</div>
                        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg mt-4 text-zinc-600">
                           <span className="text-fuchsia-500 font-semibold">function</span> optimizeQuery(data: DataLayer[]) {'{'}
                           <br />&nbsp;&nbsp;<span className="text-zinc-400">// Excellent use of memoization and O(n) traversal.</span>
                           <br />&nbsp;&nbsp;<span className="text-fuchsia-500 font-semibold">return</span> data.reduce(...)
                           <br />{'}'}
                        </div>
                     </div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="rounded-xl bg-white border border-zinc-200 p-4 shadow-xl flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                 <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900">Senior React Engineer Role</div>
                                <div className="text-xs text-zinc-500">Candidate: Alex K. • Confidence Score: 94%</div>
                              </div>
                           </div>
                           <div className="bg-gradient-to-b from-zinc-200/50 to-transparent p-[3px] rounded-xl flex justify-center items-center">
                             <button className="group p-[3px] rounded-lg bg-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
                               <div className="bg-zinc-900 group-hover:bg-black rounded-md px-3 py-1.5">
                                 <div className="flex gap-2 items-center justify-center">
                                   <span className="text-xs font-bold text-white">Approve</span>
                                 </div>
                               </div>
                             </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
      </div>
    </section>
  );
}
