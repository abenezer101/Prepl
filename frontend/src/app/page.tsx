import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '../components/features/landing/HeroSection';
import { FeatureGrid } from '../components/features/landing/FeatureGrid';
import { SocialProof } from '../components/features/landing/SocialProof';
import { FAQSection } from '../components/features/landing/FAQSection';
import { FooterHero } from '../components/features/landing/FooterHero';
import { Navbar } from '../components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Prepl — Hire Engineers While You Sleep',
  description: 'Prepl deploys autonomous agents to run candidates through a sandboxed replica of a professional development environment. A zero-effort screening pipeline that identifies true engineering signal.',
};

export default function Page() {
  return (
    <div className="font-sans min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-stone-500/50">
      {/* Dark Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />

        <main className="w-full relative z-10 pt-24 pb-0 flex flex-col gap-24 md:gap-32">
          <HeroSection />
          <SocialProof />
          <FeatureGrid />
          <FAQSection />
          <FooterHero />
        </main>
      </div>
    </div>
  );
}
