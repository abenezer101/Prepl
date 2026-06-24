import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FooterHero } from "@/components/features/landing/FooterHero";

export default function NotFound() {
  return (
    <div className="font-sans min-h-screen bg-[#fbf8f3] text-zinc-900 relative overflow-x-hidden selection:bg-stone-300/40">
      {/* Light Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        {/* Ambient Subtle Glows */}
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-gradient-to-r from-zinc-200/40 to-transparent rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-gradient-to-r from-amber-100/30 to-transparent rounded-full filter blur-[100px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
          <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-white border border-zinc-200/60 px-3 py-1 rounded-full mb-6">
            Error 404
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-tight max-w-2xl">
            This page slipped beyond our reach
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12 font-normal">
            The path you are looking for has either moved or doesn't exist. Let's get you back on track.
          </p>

          <div className="relative mb-12 w-full flex justify-center">
            <span className="text-[120px] xs:text-[150px] sm:text-[180px] md:text-[220px] font-black text-zinc-900/5 leading-none tracking-tighter select-none font-sansplomb">
              404
            </span>
          </div>

          <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[3px] rounded-full inline-flex">
            <Link href="/" className="group p-[2px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_0_16px_rgba(96,165,250,0.12)] active:shadow-[0_0px_1px_rgba(0,0,0,0.06)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
              <div className="bg-gradient-to-b from-white to-zinc-100 rounded-full flex gap-2 items-center justify-center px-8 py-3">
                <span className="font-semibold text-zinc-900 leading-none">Return to Main Page</span>
              </div>
            </Link>
          </div>
        </main>

        <FooterHero hideCta />
      </div>
    </div>
  );
}
