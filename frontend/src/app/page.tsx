"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroSection } from '../components/features/landing/HeroSection';
import { FeatureGrid } from '../components/features/landing/FeatureGrid';
import { SocialProof } from '../components/features/landing/SocialProof';
import { FAQSection } from '../components/features/landing/FAQSection';
import { FooterHero } from '../components/features/landing/FooterHero';
import Image from 'next/image';

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white text-zinc-900 relative overflow-x-hidden selection:bg-yellow-200/50">
      {/* Light Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* TopNavBar */}
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out flex justify-center px-4 md:px-6 ${
          isScrolled ? 'pt-4 md:pt-6' : 'pt-0'
        }`}>
          <nav
            className={`transition-all duration-500 ease-in-out border flex justify-between items-center w-full ${
              isScrolled 
                ? 'bg-white/70 backdrop-blur-xl py-2 px-6 rounded-full border-zinc-200 shadow-[0_8px_32px_rgba(0,0,0,0.05)] max-w-[1000px]' 
                : 'bg-transparent py-4 lg:py-4 px-2 lg:px-0 rounded-full border-transparent max-w-[1200px]'
            }`}
          >
            {/* Logo */}
            <div className="font-bold text-zinc-900 tracking-tight cursor-pointer shrink-0 flex items-center gap-2">
              <div className={`rounded-lg bg-gradient-to-br from-fuchsia-500 via-orange-500 to-yellow-500 flex items-center justify-center transition-all duration-500 ease-in-out ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}`}>
                 <Image src="/images/square-logo.png" alt="Logo" width={20} height={20} />
              </div>
              <span className={`transition-all duration-500 ease-in-out font-bold tracking-tight ${isScrolled ? 'text-lg' : 'text-xl'}`}>Prepl</span>
            </div>
            
            {/* Links */}
            <div className="hidden md:flex gap-8 items-center h-full">
              {[
                { 
                  name: 'Features',
                  dropdown: ['AI Screening', 'Real-time Analytics', 'Custom Rubrics', 'Integrations']
                },
                { name: 'How it Works' },
                { name: 'Pricing' },
                { 
                  name: 'Resources',
                  dropdown: ['Blog', 'Customer Stories', 'Help Center', 'API Docs']
                },
                { name: 'FAQ' }
              ].map((item) => (
                <div key={item.name} className="relative group h-full py-4 -my-4 flex items-center">
                  <a
                    href="#"
                    className={`font-medium hover:text-zinc-900 transition-colors duration-300 flex items-center gap-1 ${
                      isScrolled ? 'text-sm text-zinc-600' : 'text-sm text-zinc-500'
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg className="w-3.5 h-3.5 mt-0.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </a>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-zinc-200 py-2 w-48 overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <a 
                            key={subItem} 
                            href="#" 
                            className="block px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50/50 transition-colors"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 items-center shrink-0">
              <Link href="/login" className={`font-medium hover:text-zinc-900 transition-colors cursor-pointer ${
                isScrolled ? 'text-sm text-zinc-600' : 'text-sm text-zinc-600'
              }`}>
                Log In
              </Link>
              <div className="bg-gradient-to-b from-zinc-200/50 to-transparent p-[4px] rounded-full inline-flex transition-all duration-500">
                <Link href="/login" className="group p-[4px] rounded-full bg-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:shadow-[0_0px_1px_rgba(0,0,0,0.1)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center block">
                  <div className={`bg-zinc-900 hover:bg-black rounded-full flex gap-2 items-center justify-center transition-all duration-500 ease-in-out ${
                    isScrolled ? 'px-4 py-1.5' : 'px-5 py-2'
                  }`}>
                    <span className="font-semibold text-white text-sm">Get Started</span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <main className="w-full relative z-10 pt-32 pb-0 flex flex-col gap-24 md:gap-32">
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
