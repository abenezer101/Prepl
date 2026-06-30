"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { IconCreditCard, IconSparkles, IconCheck } from '@tabler/icons-react';

const FREE_FEATURES = [
  '3 mock sessions per month',
  'Full AI voice/video interviewer',
  'Post-session performance report',
  'Behavioral analysis',
  'Growth recommendations',
  'Universal accessibility suite',
];

const PREMIUM_FEATURES = [
  'Unlimited mock sessions',
  'Company-specific calibration',
  'Custom session generation',
  'Multi-industry practice tracks',
  'Historical performance tracking',
  'Cross-session improvement analytics',
  'Benchmark comparisons',
  'Export reports & priority generation',
];

export default function BillingPage() {
  const { userName } = useAuth();

  // For MVP, plan is always "free" — wire Stripe later
  const currentPlan = 'free';
  const sessionsUsed = 0;
  const sessionsTotal = 3;

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full max-w-3xl">
      <div className="mb-8 flex items-center gap-2.5">
        <IconCreditCard size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Premium Billing</h1>
          <p className="text-sm text-zinc-500">Your current plan and upgrade options.</p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Plan</p>
            <p className="text-xl font-black text-zinc-900 mt-0.5">
              {currentPlan === 'free' ? 'Candidate Base' : 'Candidate Premium'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            currentPlan === 'free'
              ? 'bg-zinc-100 text-zinc-600 border border-zinc-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {currentPlan === 'free' ? 'Free' : 'Premium · $19/mo'}
          </span>
        </div>

        {/* Sessions remaining */}
        {currentPlan === 'free' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-zinc-600 font-medium">Sessions this month</p>
              <p className="text-xs font-bold text-zinc-900 tabular-nums">{sessionsUsed} / {sessionsTotal}</p>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all"
                style={{ width: `${(sessionsUsed / sessionsTotal) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-1.5">
              {sessionsTotal - sessionsUsed} sessions remaining. Resets on the 1st of each month.
            </p>
          </div>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Free */}
        <div className={`bg-white border rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${currentPlan === 'free' ? 'border-zinc-900 ring-1 ring-zinc-900/5' : 'border-zinc-200'}`}>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Candidate Base</p>
            <p className="text-2xl font-black text-zinc-900">Free <span className="text-sm font-normal text-zinc-500">/ month</span></p>
          </div>
          <ul className="space-y-2 mb-6">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-zinc-600">
                <IconCheck size={13} className="text-zinc-900 mt-0.5 shrink-0" stroke={2.5} />
                {f}
              </li>
            ))}
          </ul>
          {currentPlan === 'free' && (
            <div className="w-full py-2.5 text-center text-xs font-bold text-zinc-400 bg-zinc-50 border border-zinc-200 rounded-[5px]">
              Current Plan
            </div>
          )}
        </div>

        {/* Premium */}
        <div className="bg-zinc-900 border border-zinc-900 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded-full">Most Popular</span>
          </div>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Candidate Premium</p>
            <p className="text-2xl font-black">$19 <span className="text-sm font-normal text-zinc-400">/ month</span></p>
          </div>
          <ul className="space-y-2 mb-6">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                <IconCheck size={13} className="text-emerald-400 mt-0.5 shrink-0" stroke={2.5} />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className="w-full py-2.5 bg-white text-zinc-900 text-xs font-bold rounded-[5px] transition-all hover:bg-zinc-100 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <IconSparkles size={13} />
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
