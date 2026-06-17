// src/components/SocialProof.tsx
"use client";

export function SocialProof() {
  return (
    <section className="pt-2 pb-12 border-y border-zinc-900 bg-zinc-950/50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">Trusted by ultra-elite engineering teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-60 grayscale">
           <div className="text-xl font-bold font-sans tracking-tighter text-white">Acme Corp</div>
           <div className="text-xl font-bold font-serif italic text-white">Globex</div>
           <div className="text-xl font-black font-mono text-white">Initech</div>
           <div className="text-xl font-semibold tracking-widest uppercase text-white">Soylent</div>
           <div className="text-xl font-bold tracking-tight text-white">Massive Dynamic</div>
        </div>
      </div>
    </section>
  );
}
