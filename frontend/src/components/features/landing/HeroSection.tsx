"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'motion/react';
import { Terminal, Code2, Sparkles, ChevronRight } from 'lucide-react';

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
    <section className="relative w-full pt-2 flex flex-col overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
        className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none"
      >
         <Image 
           src="/images/hero-bg.webp" 
           alt="Hero Background" 
           fill 
           className="object-contain object-center"
           sizes="100vw"
           priority
           referrerPolicy="no-referrer"
         />
         {/* Gradient fade out at bottom */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </motion.div>

      <div className="px-6 max-w-[1200px] mx-auto text-center w-full pb-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto relative z-10"
        >
        {/* Top badge */}
        <motion.div variants={fadeInUp} className="mb-2">
          <div className="px-4 py-1.5 text-xs font-semibold tracking-widest text-stone-300 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-200" />
            Introducing Prepl
          </div>
        </motion.div>
        
        {/* Headline */}
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-white">Hire engineers</span> <br />
          <span className="text-stone-200 text-4xl md:text-5xl">while you sleep.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Prepl deploys autonomous agents to run candidates through a sandboxed replica of a professional development environment. A zero-effort screening pipeline that identifies true engineering signal.
        </motion.p>
        
        {/* Dual CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-8">
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-white/20 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/signup" className="w-full group p-[4px] rounded-full bg-gradient-to-b from-stone-200 to-stone-300 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(96,165,250,0.35)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-full px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-stone-900">Deploy Autonomous Screener</span>
                  <ChevronRight className="w-4 h-4 text-stone-900" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-zinc-800/40 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/signin" className="w-full group p-[4px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(96,165,250,0.2)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-full px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-white">Practice for Free</span>
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
         <div className="p-2 sm:p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 shadow-2xl backdrop-blur-xl">
            <div className="rounded-lg overflow-hidden bg-black border border-zinc-800 flex flex-col h-[500px] text-left">
               {/* Header Bar */}
               <div className="h-12 border-b border-zinc-800 bg-zinc-950 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                     <Terminal className="w-3.5 h-3.5" /> preview-sandbox-agent-04
                  </div>
                  <div className="w-12"></div>
               </div>
               {/* Body */}
               <div className="flex-1 flex overflow-hidden">
                  {/* Sidebar Code Context */}
                  <div className="w-1/3 border-r border-zinc-800 bg-zinc-950 p-4 hidden md:block">
                     <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold mb-4 uppercase tracking-wider">
                       <Code2 className="w-4 h-4" /> Filesystem
                     </div>
                     <div className="space-y-2 font-mono text-sm text-zinc-400">
                        <div className="text-white font-medium">src/</div>
                        <div className="pl-4">components/</div>
                        <div className="pl-8 text-stone-200 font-medium">App.tsx <span className="text-zinc-600 ml-2 text-xs">● Active</span></div>
                        <div className="pl-8">Button.tsx</div>
                        <div className="pl-4 text-white font-medium">hooks/</div>
                        <div className="pl-4">utils/</div>
                     </div>
                  </div>
                  {/* Main Viewer */}
                  <div className="flex-1 flex flex-col relative bg-zinc-900">
                     <div className="p-6 font-mono text-sm text-zinc-400 space-y-4">
                        <div className="animate-pulse flex items-center gap-2 text-stone-200"><Sparkles className="w-4 h-4"/> Agent analyzing code structure...</div>
                        <div className="text-green-400">▶ Executing tests... [PASS] 42/42</div>
                        <div>Evaluating system design choices...</div>
                        <div className="bg-black border border-zinc-800 p-4 rounded-lg mt-4 text-zinc-300">
                           <span className="text-stone-200 font-semibold">function</span> optimizeQuery(data: DataLayer[]) {'{'}
                           <br />&nbsp;&nbsp;<span className="text-zinc-600">{"// Excellent use of memoization and O(n) traversal."}</span>
                           <br />&nbsp;&nbsp;<span className="text-stone-200 font-semibold">return</span> data.reduce(...)
                           <br />{'}'}
                        </div>
                     </div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                 <div className="w-2 h-2 rounded-full bg-white"></div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">Senior React Engineer Role</div>
                                <div className="text-xs text-zinc-400">Candidate: Alex K. • Confidence Score: 94%</div>
                              </div>
                           </div>
                            <div className="bg-gradient-to-b from-white/10 to-transparent p-[3px] rounded-xl flex justify-center items-center">
                              <button className="group p-[3px] rounded-lg bg-gradient-to-b from-stone-200 to-stone-300 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] active:shadow-[0_0px_1px_rgba(0,0,0,0.3)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
                                <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-md px-3 py-1.5">
                                  <div className="flex gap-2 items-center justify-center">
                                    <span className="text-xs font-bold text-stone-900">Approve</span>
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
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-[1]"></div>
    </section>
  );
}
