"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const navSpring = { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 } as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (pathname === '/' && id) {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
          borderColor: isScrolled ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.04)'
            : '0 0px 0px rgba(0,0,0,0)',
          marginTop: isScrolled ? 24 : 16,
        }}
        transition={navSpring}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(251,248,243,0.4)',
        }}
        className="border w-full flex justify-between items-center"
      >
        {/* Logo */}
        <Link href="/" className="font-bold text-zinc-900 tracking-tight cursor-pointer shrink-0 flex items-center gap-1">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
          </div>
          <span className="font-bold tracking-tight text-xl">
            Prepl
          </span>
        </Link>
        
        {/* Links */}
        <div className="hidden md:flex gap-8 items-center h-full">
          {[
            { name: 'How it Works', href: '/howitworks' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Blog', href: '/blog' },
            { name: 'Contact', href: '/contact' }
          ].map((item) => (
            <div key={item.name} className="relative group h-full py-4 -my-4 flex items-center">
              <Link
                href={item.href}
                className="font-medium text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center shrink-0">
          <Link href="/signin" className="font-medium text-base text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
            Sign In
          </Link>
          <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[3px] rounded-full inline-flex">
            <Link href="/signup" className="group p-[2px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_0_16px_rgba(96,165,250,0.12)] active:shadow-[0_0px_1px_rgba(0,0,0,0.06)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center block">
              <motion.div
                animate={{ paddingLeft: isScrolled ? 14 : 18, paddingRight: isScrolled ? 14 : 18, paddingTop: isScrolled ? 5 : 7, paddingBottom: isScrolled ? 5 : 7 }}
                transition={navSpring}
                className="bg-gradient-to-b from-white to-zinc-100 rounded-full flex gap-2 items-center justify-center"
              >
                <span className="font-semibold text-zinc-900 text-sm leading-none">Sign Up</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
