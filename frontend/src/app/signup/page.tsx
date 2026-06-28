"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const testimonials = [
  {
    quote: "Prepl completely transformed my interview prep. The real-time speech pacing feedback helped me stop rambling and speak with confidence.",
    author: "Sarah Jenkins",
    role: "Software Engineer at Google"
  },
  {
    quote: "The mock interview AI felt incredibly realistic. It asked deep technical follow-ups that pushed me to structure my system design answers correctly.",
    author: "Marcus Chen",
    role: "Senior Product Manager"
  },
  {
    quote: "I used Prepl for 2 weeks before my executive interviews. The detailed metrics on filler words and tone variation was a game-changer.",
    author: "Elena Rostova",
    role: "Director of Engineering"
  }
];

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('token', 'dev-token');
    localStorage.setItem('userEmail', email || 'dev@prepl.ai');
    localStorage.setItem('userName', name || email.split('@')[0] || 'Dev User');
    router.push('/dashboard');
  };

  return (
    <div className="h-screen w-full bg-[#fbf8f3] flex flex-col lg:flex-row relative overflow-hidden text-zinc-900 selection:bg-stone-300/40 font-sans">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        {/* Grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        {/* Floating gradient blurs behind the glass card */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-gradient-to-r from-amber-200/30 to-amber-100/20 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[450px] h-[450px] bg-gradient-to-r from-zinc-200/50 to-amber-50/20 rounded-full filter blur-[100px]" />
      </div>

      {/* Brand & Illustration Side (Left) */}
      <div className="hidden lg:flex w-1/2 h-full max-h-screen relative z-10 flex-col justify-between pt-8 pb-4 px-8 xl:pt-12 xl:pb-6 xl:px-12 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white overflow-hidden">
        {/* Abstract shapes inside the brand side */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full filter blur-[60px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] bg-gradient-to-tr from-zinc-800/20 via-zinc-900/10 to-transparent rounded-full filter blur-[80px]" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-0 group">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">Prepl</span>
          </Link>
        </div>

        {/* Testimonials Component */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow max-w-lg mx-auto w-full my-4 min-h-[260px]">
          <div className="w-full relative flex items-center justify-center min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ x: 40, opacity: 0, filter: 'blur(8px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ x: -40, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-4 flex flex-col items-center absolute w-full"
              >
                <p className="text-zinc-200 text-base sm:text-lg xl:text-xl font-medium italic leading-relaxed font-sans max-w-md">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </p>
                <div className="space-y-0.5">
                  <h4 className="text-white font-bold text-sm xl:text-base font-sans">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="text-zinc-500 text-xs xl:text-sm font-sans font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Testimonial Indicators (Dots) */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === idx ? 'bg-white w-4' : 'bg-zinc-700 hover:bg-zinc-600'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex justify-between items-center text-xs text-zinc-500">
          <span>© 2026 Prepl Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="w-full lg:w-1/2 h-full max-h-screen relative z-10 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative"
        >
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Glassmorphic card container */}
          <div className="w-full bg-white/40 border border-white/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.03)] border-zinc-200/30">
            
            <div className="mb-5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-1">Create account</h1>
              <p className="text-zinc-500 text-xs sm:text-sm">Enter your details to start practicing mock interviews today.</p>
            </div>

            <div className="space-y-4">
              {/* Google Button */}
              <button 
                onClick={handleSignUp}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-50/80 text-zinc-700 hover:text-zinc-900 font-semibold py-2.5 px-4 rounded-2xl border border-zinc-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 active:scale-[0.99] text-sm"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign Up with Google
              </button>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-zinc-200/80"></div>
                <span className="flex-shrink-0 mx-4 text-zinc-400 text-xs font-semibold uppercase tracking-wider font-mono">or email</span>
                <div className="flex-grow border-t border-zinc-200/80"></div>
              </div>

              <form className="space-y-3" onSubmit={handleSignUp}>
                {/* Full Name field */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-zinc-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all bg-white/60 text-zinc-950 placeholder-zinc-400 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-zinc-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all bg-white/60 text-zinc-950 placeholder-zinc-400 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-zinc-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all bg-white/60 text-zinc-950 placeholder-zinc-400 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-1">
                  <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[3px] rounded-2xl inline-flex w-full">
                    <button 
                      type="submit" 
                      className="group w-full p-[2px] rounded-2xl bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_2px_6px_rgba(0,0,0,0.06)] active:scale-[0.99] transition-all duration-300 cursor-pointer text-center"
                    >
                      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white rounded-[14px] py-3 flex gap-2 items-center justify-center hover:from-zinc-800 hover:to-zinc-900 transition-colors">
                        <span className="font-semibold text-sm leading-none">Create Account</span>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <p className="mt-4 text-center text-sm text-zinc-500">
              Already have an account?{' '}
              <Link href="/signin" className="text-zinc-950 font-bold hover:text-zinc-700 underline underline-offset-4 transition-colors">
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-zinc-400 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="underline hover:text-zinc-600 transition-colors">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-zinc-600 transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
