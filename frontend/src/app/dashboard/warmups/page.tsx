"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { IconBriefcase, IconSparkles, IconArrowRight } from '@tabler/icons-react';
import { createSession } from '@/lib/api';

type Step = 'input' | 'preview' | 'loading';

export default function WarmupsPage() {
  useAuth();
  const [step, setStep]               = useState<Step>('input');
  const [jobDescription, setJd]       = useState('');
  const [error, setError]             = useState('');

  async function handleLaunch() {
    if (!jobDescription.trim()) return;
    setStep('loading');
    setError('');
    try {
      const session = await createSession({
        session_type: 'star_conversational',
        job_description: jobDescription,
      });
      localStorage.setItem('currentInterviewId', session.session_id);
      localStorage.setItem('currentSessionType', 'star_conversational');
      localStorage.setItem('currentJobDescription', jobDescription);
      window.open(`/interview/${session.session_id}`, '_blank');
      setJd('');
      setStep('input');
    } catch (err: any) {
      setError(err.message || 'Failed to create session. Please try again.');
      setStep('preview');
    }
  }

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <IconBriefcase size={20} className="text-zinc-500" stroke={1.8} />
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Custom Job Warmups</h1>
        </div>
        <p className="text-sm text-zinc-500 ml-[30px]">
          Paste any job description and launch an interview session calibrated specifically to that role.
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => { setJd(e.target.value); if (step === 'preview') setStep('input'); }}
          placeholder="Paste the full job description here — role title, responsibilities, requirements, company name…&#10;&#10;Example:&#10;Senior Marketing Manager at Acme Corp. Responsible for developing brand strategy, leading a team of 5, managing a $500K budget…"
          className="w-full h-52 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/5 transition-all resize-none"
        />

        {error && (
          <p className="mt-3 text-xs text-rose-600 font-medium">{error}</p>
        )}

        {/* What the AI Will Focus On */}
        {jobDescription.trim().length > 80 && step !== 'loading' && (
          <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <IconSparkles size={12} />
              AI will calibrate around
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Behavioral competencies, situational judgment, and domain knowledge specific to the responsibilities and requirements described above. Your session will be uniquely generated for this role.
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {step === 'loading' ? (
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
              <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin" />
              Creating your session…
            </div>
          ) : (
            <button
              onClick={() => jobDescription.trim().length > 0 ? (step === 'input' ? setStep('preview') : handleLaunch()) : null}
              disabled={!jobDescription.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-bold rounded-[5px] text-sm transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {step === 'input' ? 'Preview Session' : 'Launch Warmup'}
              <IconArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
