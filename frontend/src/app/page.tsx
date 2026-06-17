"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { HeroSection } from '../components/features/landing/HeroSection';
import { FeatureGrid } from '../components/features/landing/FeatureGrid';
import { SocialProof } from '../components/features/landing/SocialProof';
import { FAQSection } from '../components/features/landing/FAQSection';
import { FooterHero } from '../components/features/landing/FooterHero';
import Image from 'next/image';
import squareLogo from '../assets/images/square-logo.png';

const navSpring = { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 };

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-blue-900/50">
      {/* Dark Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* TopNavBar — Framer Motion animated for silky transitions */}
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-6">
          <motion.nav
            animate={{
              paddingTop: isScrolled ? 8 : 0,
              paddingBottom: isScrolled ? 8 : 16,
              paddingLeft: isScrolled ? 24 : 0,
              paddingRight: isScrolled ? 24 : 0,
              maxWidth: isScrolled ? 1150 : 1200,
              borderRadius: isScrolled ? 999 : 0,
              backgroundColor: isScrolled ? 'rgba(24,24,27,0.65)' : 'rgba(0,0,0,0)',
              borderColor: isScrolled ? 'rgba(63,63,70,0.5)' : 'rgba(0,0,0,0)',
              boxShadow: isScrolled
                ? '0 8px 32px rgba(0,0,0,0.45)'
                : '0 0px 0px rgba(0,0,0,0)',
              marginTop: isScrolled ? 24 : 16,
            }}
            transition={navSpring}
            style={{ backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)' }}
            className="border w-full flex justify-between items-center"
          >
            {/* Logo */}
            <div className="font-bold text-white tracking-tight cursor-pointer shrink-0 flex items-center gap-2">
              <motion.div
                animate={{ width: isScrolled ? 24 : 35, height: !isScrolled ? 24 : 35 }}
                transition={navSpring}
                className="flex items-center justify-center overflow-hidden"
              >
               <Image src={squareLogo} width={50} height={50} alt="logo" />
              </motion.div>
              <motion.span
                animate={{ fontSize: isScrolled ? '1.125rem' : '1.25rem' }}
                transition={navSpring}
                className="font-bold tracking-tight"
              >
                Prepl
              </motion.span>
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
                    className="font-medium text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1"
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
                      <div className="bg-zinc-900 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-zinc-800 py-2 w-48 overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <a 
                            key={subItem} 
                            href="#" 
                            className="block px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
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
              <Link href="/login" className="font-medium text-sm text-zinc-300 hover:text-white transition-colors cursor-pointer">
                Log In
              </Link>
              <div className="bg-gradient-to-b from-blue-800/20 to-transparent p-[4px] rounded-full inline-flex">
                <Link href="/login" className="group p-[4px] rounded-full bg-gradient-to-b from-blue-600 to-blue-700 shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.3)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center block">
                  <motion.div
                    animate={{ paddingLeft: isScrolled ? 16 : 20, paddingRight: isScrolled ? 16 : 20, paddingTop: isScrolled ? 6 : 8, paddingBottom: isScrolled ? 6 : 8 }}
                    transition={navSpring}
                    className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex gap-2 items-center justify-center"
                  >
                    <span className="font-semibold text-white text-sm">Get Started</span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.nav>
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
