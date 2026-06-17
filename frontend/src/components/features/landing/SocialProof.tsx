// src/components/SocialProof.tsx
"use client";

export function SocialProof() {
  return (
    <section className="py-12 border-y border-zinc-200 bg-zinc-50/50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">Trusted by ultra-elite engineering teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-60 grayscale">
           <div className="text-xl font-bold font-sans tracking-tighter text-zinc-900">Acme Corp</div>
           <div className="text-xl font-bold font-serif italic text-zinc-900">Globex</div>
           <div className="text-xl font-black font-mono text-zinc-900">Initech</div>
           <div className="text-xl font-semibold tracking-widest uppercase text-zinc-900">Soylent</div>
           <div className="text-xl font-bold tracking-tight text-zinc-900">Massive Dynamic</div>
        </div>
      </div>
    </section>
  );
}
