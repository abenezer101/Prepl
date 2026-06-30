"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

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

export default function SignInPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
      // Redirect handled by Supabase — no router.push needed
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#fbf8f3] flex flex-col lg:flex-row relative overflow-hidden text-zinc-900 selection:bg-stone-300/40 font-sans">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-gradient-to-r from-amber-200/30 to-amber-100/20 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[450px] h-[450px] bg-gradient-to-r from-zinc-200/50 to-amber-50/20 rounded-full filter blur-[100px]" />
      </div>

      {/* Brand & Testimonials Side (Left) */}
      <div className="hidden lg:flex w-1/2 h-full max-h-screen relative z-10 flex-col justify-between pt-8 pb-4 px-8 xl:pt-12 xl:pb-6 xl:px-12 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full filter blur-[60px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] bg-gradient-to-tr from-zinc-800/20 via-zinc-900/10 to-transparent rounded-full filter blur-[80px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-0 group">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">Prepl</span>
          </Link>
        </div>

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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors mb-5 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="w-full bg-white/40 border border-white/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.03)] border-zinc-200/30">
            
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-1">Welcome back</h1>
              <p className="text-zinc-500 text-xs sm:text-sm">Sign in to access your Prepl dashboard.</p>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {/* Google OAuth button (LIGHT style) */}
              <div className="bg-gradient-to-b from-zinc-200/60 to-transparent p-[3px] rounded-2xl inline-flex w-full">
                <button
                  id="google-signin-btn"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="group w-full p-[2px] rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-all duration-300 cursor-pointer text-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="bg-white text-zinc-800 rounded-[14px] py-3 flex gap-3 items-center justify-center hover:bg-zinc-50/80 transition-colors border border-zinc-200/40">
                    {isLoading ? (
                      <svg className="w-4 h-4 animate-spin text-zinc-800" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    )}
                    <span className="font-semibold text-sm leading-none text-zinc-800">
                      {isLoading ? 'Redirecting…' : 'Continue with Google'}
                    </span>
                  </div>
                </button>
              </div>

              <p className="text-center text-xs text-zinc-400 pt-1">
                Secure sign-in powered by Google OAuth
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-zinc-950 font-bold hover:text-zinc-700 underline underline-offset-4 transition-colors">
                Create one
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-zinc-400 leading-relaxed">
              By signing in, you agree to our{' '}
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
