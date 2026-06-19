import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FooterHero } from "@/components/features/landing/FooterHero";

export default function NotFound() {
  return (
    <div className="bg-black">
      <div className="relative min-h-screen flex flex-col">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
            <h1 className="text-white/80 text-lg xs:text-2xl sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-1 sm:mb-2">
              This page seems to have
            </h1>
            <h1 className="text-white/80 text-lg xs:text-2xl sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-8 sm:mb-12">
              slipped beyond our reach :/
            </h1>

            <div className="relative mb-8 sm:mb-12 w-full flex justify-center overflow-visible">
              <span className="four-oh-four text-[80px] xs:text-[100px] sm:text-[140px] md:text-[200px] lg:text-[260px] font-black text-white leading-none tracking-tighter select-none">
                404
              </span>
            </div>

            <Link
              href="/"
              className="liquid-glass text-white text-[10px] xs:text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full uppercase inline-block transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            >
              Return to Main Page
            </Link>
          </div>
        </div>
      </div>

      <FooterHero hideCta />
    </div>
  );
}
