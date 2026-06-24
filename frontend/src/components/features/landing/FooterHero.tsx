// src/components/FooterHero.tsx
"use client";
import { motion } from 'motion/react';
import { ArrowRight, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "How it Works", href: "/howitworks" },
      { name: "Pricing", href: "/pricing" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ]
  }
];

export function FooterHero({ hideCta }: { hideCta?: boolean }) {
  return (
    <footer className="w-full bg-[#fbf8f3] relative overflow-hidden mt-0 pb-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      {!hideCta && (
      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10 mb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6"
        >
          Fire your resume parser.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-600 font-medium mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Connect Prepl to your ATS today. Access the most capable autonomous recruiting pipeline in one simple integration.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="w-full bg-white border border-zinc-200 text-zinc-900 rounded-xl px-5 py-3.5 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all font-medium placeholder:text-zinc-400 shadow-sm"
          />
          <div className="w-full sm:w-auto shrink-0 bg-gradient-to-b from-zinc-950/5 to-transparent p-[4px] rounded-[16px] inline-flex">
            <button className="w-full group p-[4px] rounded-[12px] bg-gradient-to-b from-zinc-200 to-zinc-300 shadow-[0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] active:shadow-[0_0px_1px_rgba(0,0,0,0.06)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
              <div className="bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-[8px] px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-bold text-zinc-900">Get API Token</span>
                  <ArrowRight className="w-4 h-4 text-zinc-900" />
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-t border-zinc-200"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-2 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-1 mb-6">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">Prepl</span>
            </Link>
            <p className="text-zinc-600 font-medium mb-8 max-w-sm">
              Building the AI-native interview coaching platform for modern candidates. Calibrate mock sessions, practice speaking, and get hired with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 hover:border-zinc-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 hover:border-zinc-900 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 hover:border-zinc-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-bold text-zinc-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative w-full overflow-hidden h-[120px] md:h-[200px] lg:h-[260px] flex items-end justify-center"
      >
        <span
          className="text-[28vw] font-black tracking-[0.15em] leading-none select-none whitespace-nowrap text-zinc-900/10"
        >
          prepl
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-t border-zinc-200"
      >
        <div className="max-w-[1200px] mx-auto px-2">
        <div className="flex flex-col md:flex-row justify-between items-center py-1.5 text-xs font-medium text-zinc-500 mt-[15px]">
          <div className="flex flex-wrap items-center gap-6 text-center md:text-left justify-center">
            <span>© 2026 Prepl Inc. </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
        </div>
      </motion.div>
    </footer>
  );
}
