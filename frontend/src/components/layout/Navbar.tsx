"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

const navSpring = { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 } as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-6"
    >
      <motion.nav
        initial={false}
        animate={{
          paddingTop: isScrolled ? 8 : 0,
          paddingBottom: isScrolled ? 8 : 14,
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
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <Image src="/images/square-logo.png" width={32} height={32} alt="logo" />
          </div>
          <span className="font-bold tracking-tight text-xl">
            Prepl
          </span>
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
              
              {/* Dropdown Menu - Glassmorphic background */}
              {item.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-zinc-950/75 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.55)] border border-zinc-800/60 py-2 w-48 overflow-hidden">
                    {item.dropdown.map((subItem) => (
                      <a 
                        key={subItem} 
                        href="#" 
                        className="block px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
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
        <div className="flex gap-3 items-center shrink-0">
          <Link href="/signin" className="font-medium text-base text-zinc-300 hover:text-white transition-colors cursor-pointer">
            Sign In
          </Link>
          <div className="bg-gradient-to-b from-stone-400/30 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/signup" className="group p-[3px] rounded-full bg-gradient-to-b from-stone-400 to-stone-500 shadow-[0_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] active:shadow-[0_0px_1px_rgba(0,0,0,0.3)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center block">
              <motion.div
                animate={{ paddingLeft: isScrolled ? 14 : 18, paddingRight: isScrolled ? 14 : 18, paddingTop: isScrolled ? 5 : 7, paddingBottom: isScrolled ? 5 : 7 }}
                transition={navSpring}
                className="bg-gradient-to-b from-stone-50 to-stone-200 rounded-full flex gap-2 items-center justify-center"
              >
                <span className="font-semibold text-stone-900 text-sm leading-none">Sign Up</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
