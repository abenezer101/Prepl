"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { FooterHero } from '@/components/features/landing/FooterHero';
import { Mail, Send, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage(err.message || 'An error occurred while sending your message. Please try again later.');
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  } as const;

  return (
    <div className="font-sans min-h-screen bg-[#fbf8f3] text-zinc-900 relative overflow-x-hidden selection:bg-stone-300/40">
      {/* Light Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        {/* Ambient Glows */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-gradient-to-r from-zinc-200/50 to-transparent rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[30%] right-[10%] w-[450px] h-[450px] bg-gradient-to-r from-amber-100/40 to-transparent rounded-full filter blur-[100px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="w-full relative z-10 pt-32 pb-20 flex-1">
          {/* Header */}
          <div className="max-w-[1200px] mx-auto px-6 text-center mb-16">
            <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-white border border-zinc-200/60 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 mt-6 mb-6 leading-tight max-w-4xl mx-auto">
              How can we help you?
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions about team screening, student cohorts, or calibrations? Reach out and we will get back to you shortly.
            </p>
          </div>

          {/* Combined Form and Info Card */}
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="border border-zinc-200/80 rounded-3xl bg-white shadow-[0_24px_48px_-15px_rgba(0,0,0,0.02)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left Column: Contact Form (7 cols) */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 border-zinc-200/40">
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-zinc-950 mb-2 text-left">
                    Send a Message
                  </h2>
                  <p className="text-zinc-500 text-sm mb-8 text-left leading-relaxed">
                    Fill out the form below and our team will review and reply within 24 hours.
                  </p>

                      <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        {status === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-rose-50 border border-rose-100 text-rose-950 rounded-xl p-4 text-sm font-medium leading-relaxed"
                          >
                            {errorMessage}
                          </motion.div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Name input */}
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all"
                            />
                          </div>

                          {/* Email input */}
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com"
                              className="w-full bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        {/* Subject Selector */}
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                            Inquiry Type
                          </label>
                          <select
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all appearance-none cursor-pointer"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Startups & Builders">Startups & Team Screening</option>
                            <option value="Universities & Accelerators">Universities & LMS Integration</option>
                            <option value="Partnerships">Partnerships</option>
                          </select>
                        </div>

                        {/* Message input */}
                        <div className="space-y-2">
                          <label htmlFor="message" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us about your needs..."
                            className="w-full bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                          <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[3px] rounded-full inline-flex w-full sm:w-auto">
                            <button 
                              type="submit" 
                              disabled={status === 'submitting' || status === 'success'}
                              className={`group p-[2px] rounded-full bg-gradient-to-b shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer text-center block w-full sm:w-auto ${
                                status === 'success' 
                                  ? 'from-emerald-300 to-emerald-400 hover:shadow-[0_0_16px_rgba(16,185,129,0.12)]' 
                                  : 'from-zinc-300 to-zinc-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                              } ${
                                (status === 'submitting' || status === 'success') ? 'opacity-90 cursor-not-allowed scale-[0.995]' : 'active:scale-[0.995]'
                              }`}
                            >
                              <div className={`bg-gradient-to-b rounded-full flex gap-2 items-center justify-center px-8 py-3 transition-all duration-300 ${
                                status === 'success' ? 'from-emerald-50 to-emerald-100/90' : 'from-white to-zinc-100'
                              }`}>
                                <span className={`font-semibold text-sm leading-none transition-colors duration-300 ${
                                  status === 'success' ? 'text-emerald-950' : 'text-zinc-900'
                                }`}>
                                  {status === 'submitting' && 'Sending Message...'}
                                  {status === 'success' && 'Sent'}
                                  {(status === 'idle' || status === 'error') && 'Send Message'}
                                </span>
                                {status === 'success' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700 animate-in zoom-in-50 duration-300" />
                                ) : (
                                  <Send className="w-4 h-4 text-zinc-800" />
                                )}
                              </div>
                            </button>
                          </div>
                        </div>
                      </form>
                </div>
              </div>

              {/* Right Column: Contact Info (5 cols) */}
              <div className="lg:col-span-5 p-8 md:p-12 bg-zinc-50/50 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-zinc-200/60 flex flex-col justify-between text-left">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-950 mb-2">
                      Contact Information
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Connect with our engineering and integration support teams.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Email Card */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-zinc-800" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 text-sm mb-1">
                          General Support
                        </h4>
                        <p className="text-zinc-500 text-sm font-medium">
                          hello@prepl.dev
                        </p>
                      </div>
                    </div>
                    {/* Help Center Card */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center shrink-0">
                        <HelpCircle className="w-5 h-5 text-zinc-800" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 text-sm mb-1">
                          FAQs
                        </h4>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                          Find instant answers in our FAQs.
                        </p>
                        <Link href="/#faq" className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-zinc-700 transition-colors mt-2">
                          <span>Browse FAQs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Branding Footer */}
                <div className="border-t border-zinc-200/60 pt-8 mt-8 lg:mt-0">
                  <div className="flex items-center">
                    {/*logo*/}
                    <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      <Image src="/images/square-logo.png" width={40} height={40} alt="logo" style={{ width: 'auto', height: 'auto' }} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-800 uppercase tracking-wider font-mono">
                        Powered by Prepl
                      </h5>
                      <p className="text-[10px] text-zinc-400 font-medium">
                      Practice. Improve. Get hired.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <FooterHero hideCta={true} />
      </div>
    </div>
  );
}
