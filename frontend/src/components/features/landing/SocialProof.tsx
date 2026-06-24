// src/components/SocialProof.tsx
"use client";

export function SocialProof() {
  return (
    <section className="pt-2 pb-12 border-y border-[#e8e5df] bg-[#f5f2eb]/30">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">Trusted by ultra-elite engineering teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-60 grayscale">
           <div className="text-xl font-bold font-sans tracking-tighter text-zinc-800">Acme Corp</div>
           <div className="text-xl font-bold font-serif italic text-zinc-800">Globex</div>
           <div className="text-xl font-black font-mono text-zinc-800">Initech</div>
           <div className="text-xl font-semibold tracking-widest uppercase text-zinc-800">Soylent</div>
           <div className="text-xl font-bold tracking-tight text-zinc-800">Massive Dynamic</div>
        </div>
      </div>
    </section>
  );
}
