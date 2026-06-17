// src/components/FooterHero.tsx
"use client";
import { motion } from 'motion/react';
import { ArrowRight, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Documentation", href: "#" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Partners", href: "#" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Community", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Status", href: "#" },
    ]
  }
];

export function FooterHero() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white relative overflow-hidden mt-16 pt-32 pb-12">
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
            className="w-full bg-white border border-zinc-300 text-zinc-900 rounded-xl px-5 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium placeholder:text-zinc-400 shadow-sm"
          />
          <div className="w-full sm:w-auto shrink-0 bg-gradient-to-b from-zinc-200/50 to-transparent p-[4px] rounded-[16px] inline-flex">
            <button className="w-full group p-[4px] rounded-[12px] bg-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:shadow-[0_0px_1px_rgba(0,0,0,0.1)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
              <div className="bg-zinc-900 group-hover:bg-black rounded-[8px] px-5 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-bold text-white">Get API Token</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 border-t border-zinc-200 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-fuchsia-500 to-orange-500 flex flex-col items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">Prepl</span>
            </div>
            <p className="text-zinc-500 font-medium mb-8 max-w-sm">
              Building the autonomous recruiting layer for modern HR teams. AI-native, developer-first, and uncompromisingly fast.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-zinc-200 rounded-full text-zinc-500 hover:text-orange-500 hover:border-orange-500 transition-colors">
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
                    <Link href={link.href} className="text-zinc-500 hover:text-orange-500 transition-colors font-medium text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-200 text-sm font-medium text-zinc-500 gap-4">
          <div className="flex flex-wrap items-center gap-6 text-center md:text-left justify-center">
            <span>© 2026 Prepl Inc. All rights reserved.</span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <span className="flex items-center gap-1.5 hover:text-orange-500 cursor-pointer transition-colors">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               All systems operational
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

