"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Terminal, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('token', 'dev-token');
    localStorage.setItem('userEmail', email || 'dev@prepl.ai');
    localStorage.setItem('userName', name || email.split('@')[0] || 'Dev User');
    router.push('/dashboard');
  };
  return (
    <div className="h-screen bg-[#fbf8f3] flex flex-col lg:flex-row relative overflow-hidden text-zinc-900 selection:bg-stone-300/40">
      {/* Light Ambient Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      {/* Brand Side - hidden on mobile */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-between p-12 border-r border-zinc-200">
        <div>
          <Link href="/" className="flex items-center gap-1.5 text-zinc-900">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <span className="text-xl font-bold tracking-tight">Prepl</span>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <Terminal className="w-7 h-7 text-zinc-700" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight leading-[1.1]">
            Practice smarter.<br />
            <span className="text-zinc-500">Get hired faster.</span>
          </h2>
          <p className="text-zinc-600 text-base max-w-md leading-relaxed">
            Join thousands of active job seekers who practice and improve their conversational skills using mock interview tracks.
          </p>
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <Sparkles className="w-4 h-4 text-zinc-700" />
            <span>Free forever tier. Calibrate to any role.</span>
          </div>
        </div>

        <p className="text-zinc-400 text-sm">© 2026 Prepl Inc.</p>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile back button */}
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Create your account</h1>
            <p className="text-zinc-500 text-sm sm:text-base">Start practicing mock interviews today.</p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm text-sm">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-zinc-200"></div>
              <span className="flex-shrink-0 mx-3 text-zinc-400 text-xs">or sign up with email</span>
              <div className="flex-grow border-t border-zinc-200"></div>
            </div>

            <form className="space-y-3" onSubmit={handleSignUp}>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 focus:border-zinc-400 transition-all bg-white text-zinc-900 placeholder-zinc-400 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 focus:border-zinc-400 transition-all bg-white text-zinc-900 placeholder-zinc-400 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/40 focus:border-zinc-400 transition-all bg-white text-zinc-900 placeholder-zinc-400 text-sm"
                />
              </div>

              <div className="bg-gradient-to-b from-zinc-950/5 to-transparent p-[2px] rounded-xl">
                <button className="w-full py-3 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 font-semibold text-white shadow-[0_3px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] transition-all duration-300 active:scale-[0.995] text-sm">
                  Create Account
                </button>
              </div>
            </form>
          </div>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/signin" className="text-zinc-900 font-medium hover:text-zinc-700 transition-colors">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-zinc-400 leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline hover:text-zinc-600 transition-colors">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-zinc-600 transition-colors">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
