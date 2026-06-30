"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileText,
  Upload,
  ArrowLeft,
  Mic,
  ShieldAlert,
  User,
} from 'lucide-react';
import { IconMicrophone, IconMessages, IconSparkles } from '@tabler/icons-react';
import { createSession } from '@/lib/api';

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionCreated: () => void;
}

type SessionType = 'star_conversational' | 'behavioral_deep_dive' | null;

const interviewerAgentMap: Record<string, number> = {
  Sarah: 1,
  Michael: 2,
  Emily: 3,
};


const interviewers = [
  { name: 'Sarah',   role: 'Career Coach' },
  { name: 'Michael', role: 'Senior Hiring Manager' },
  { name: 'Emily',   role: 'HR Director' },
];

const SESSION_TYPES = [
  {
    id: 'star_conversational' as SessionType,
    icon: IconMicrophone,
    title: 'STAR Conversational',
    subtitle: 'Voice & Video Interview',
    description:
      'Practice behavioral storytelling through a live voice and video mock session. The AI coach asks structured STAR-framework questions tailored to your target role.',
    badge: 'Most Popular',
    badgeColor: 'bg-zinc-900 text-white',
  },
  {
    id: 'behavioral_deep_dive' as SessionType,
    icon: IconMessages,
    title: 'Behavioral Deep Dive',
    subtitle: 'Text-First Q&A',
    description:
      'Work through situational and values-alignment questions at your own pace. Ideal for written communication practice and refining your answers before a live panel.',
    badge: null,
    badgeColor: '',
  },
];

export default function NewSessionModal({ isOpen, onClose, onSessionCreated }: NewSessionModalProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [sessionType, setSessionType] = useState<SessionType>(null);
  const [formData, setFormData] = useState({
    jobDescription: '',
    resume: { name: 'Default_Resume.pdf', isDefault: true } as { name: string; isDefault: boolean },
    cv: '',
    difficulty: 'intermediate',
    interviewer: 'Sarah',
    questionCount: 10,
  });

  function resetAndClose() {
    setStep(1);
    setError('');
    setSessionType(null);
    onClose();
  }

  async function nextStep() {
    if (step === 1) {
      if (!sessionType) return; // must pick a type
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4); // loading
      setError('');
      try {
        if (!sessionType) throw new Error('Session type is required');
        const session = await createSession({
          session_type: sessionType,
          job_description: formData.jobDescription || null,
        });

        setStep(5); // ready
        // Store for the interview tab
        localStorage.setItem('currentInterviewId', session.session_id);
        localStorage.setItem('currentSessionType', sessionType);
        if (formData.jobDescription) {
          localStorage.setItem('currentJobDescription', formData.jobDescription);
        } else {
          localStorage.removeItem('currentJobDescription');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to create interview session.');
        setStep(3);
      }
    }
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  const springTransition = { duration: 0.18, ease: [0.23, 1, 0.32, 1] as const };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={springTransition}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden relative"
          >
            {/* Close */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-full transition-all z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress Bar */}
            <div className="h-0.5 bg-zinc-100">
              <motion.div
                className="h-full bg-zinc-900"
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <div className="p-6">

              {/* ── Step 1: Session Type ──────────────────────────────── */}
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <IconSparkles size={16} className="text-zinc-500" />
                      Choose Your Session Type
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Select the interview format that matches your preparation goal.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {SESSION_TYPES.map((type) => {
                      const Icon = type.icon;
                      const selected = sessionType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSessionType(type.id)}
                          className={`relative text-left p-5 rounded-xl border-2 transition-all cursor-pointer group ${
                            selected
                              ? 'border-zinc-900 bg-zinc-50 shadow-sm'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          {type.badge && (
                            <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${type.badgeColor}`}>
                              {type.badge}
                            </span>
                          )}
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                            selected ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                          }`}>
                            <Icon size={18} />
                          </div>
                          <div className="font-bold text-zinc-900 text-sm mb-0.5">{type.title}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${selected ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {type.subtitle}
                          </div>
                          <p className="text-[12px] text-zinc-500 leading-relaxed">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!sessionType}
                      className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-bold rounded-[5px] transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed text-sm"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Configure ─────────────────────────────────── */}
              {step === 2 && (
                <div>
                  <h2 className="text-base font-bold text-zinc-900 mb-6">
                    Calibrate Your Session
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                        Target Role / Job Description
                      </label>
                      <textarea
                        className="w-full h-24 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 outline-none transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
                        placeholder="Paste the job description or describe your target role (e.g., 'Senior Product Manager at a SaaS company')..."
                        value={formData.jobDescription}
                        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                        Resume / CV Context
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, resume: { name: 'My_Default_Resume.pdf', isDefault: true } })}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                            formData.resume?.isDefault
                              ? 'border-zinc-900 bg-zinc-900/[0.03] text-zinc-900 shadow-sm'
                              : 'border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            formData.resume?.isDefault ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
                          }`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="text-center">
                            <span className="text-[11px] font-bold block text-zinc-800">Use Saved Resume</span>
                            <span className="text-[9px] text-zinc-500 block truncate max-w-[120px]">From Settings</span>
                          </div>
                        </button>

                        <div className={`relative rounded-xl border-2 border-dashed transition-all ${
                          formData.resume && !formData.resume.isDefault
                            ? 'border-zinc-900 bg-zinc-900/[0.03] text-zinc-900 shadow-sm'
                            : 'border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300'
                        }`}>
                          <label className="cursor-pointer p-4 flex flex-col items-center justify-center gap-2 w-full h-full">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                              formData.resume && !formData.resume.isDefault ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
                            }`}>
                              <Upload className="w-4 h-4" />
                            </div>
                            <div className="text-center overflow-hidden w-full">
                              <span className="text-[11px] font-bold block text-zinc-800">Upload New</span>
                              <span className="text-[9px] text-zinc-500 truncate block px-2">
                                {formData.resume && !formData.resume.isDefault ? formData.resume.name : 'PDF or DOCX'}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button onClick={prevStep} className="px-6 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold rounded-[5px] transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-zinc-200">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button onClick={nextStep} className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-[5px] transition-all shadow-sm cursor-pointer text-sm">
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Agent + Settings ──────────────────────────── */}
              {step === 3 && (
                <div>
                  <h2 className="text-base font-bold text-zinc-900 mb-6 text-center">
                    Customize Your Coach
                  </h2>

                  {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Interviewer */}
                    <div>
                      <label className="block text-center text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-[0.15em]">
                        1. Select Your AI Coach
                      </label>
                      <div className="flex justify-center gap-6">
                        {interviewers.map((person) => (
                          <button
                            key={person.name}
                            onClick={() => setFormData({ ...formData, interviewer: person.name })}
                            className={`group flex flex-col items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                              formData.interviewer === person.name
                                ? 'bg-zinc-100 border border-zinc-200'
                                : 'border border-transparent hover:bg-zinc-50'
                            }`}
                          >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-inner ${
                              formData.interviewer === person.name
                                ? 'bg-zinc-900 text-white ring-4 ring-zinc-900/10 scale-105'
                                : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                            }`}>
                              <User className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                              <div className={`font-bold text-xs transition-colors ${formData.interviewer === person.name ? 'text-zinc-900' : 'text-zinc-700'}`}>
                                {person.name}
                              </div>
                              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter mt-0.5">
                                {person.role}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-zinc-100 mx-10" />

                    {/* Difficulty */}
                    <div>
                      <label className="block text-center text-[10px] font-bold text-zinc-500 mb-3 uppercase tracking-[0.15em]">
                        2. Evaluation Strictness
                      </label>
                      <div className="flex justify-center gap-4">
                        {['easy', 'intermediate', 'hard'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setFormData({ ...formData, difficulty: level })}
                            className={`flex-1 max-w-[130px] py-2.5 rounded-[5px] border transition-all font-bold text-xs capitalize cursor-pointer ${
                              formData.difficulty === level
                                ? 'border-zinc-900 bg-zinc-100 text-zinc-900'
                                : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 bg-zinc-50'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question Count */}
                    <div>
                      <label className="block text-center text-[10px] font-bold text-zinc-500 mb-3 uppercase tracking-[0.15em]">
                        3. Question Stack
                      </label>
                      <div className="flex justify-center gap-4">
                        {[5, 10, 15].map((count) => (
                          <button
                            key={count}
                            onClick={() => setFormData({ ...formData, questionCount: count })}
                            className={`flex-1 max-w-[130px] py-2.5 rounded-[5px] border transition-all font-bold text-xs cursor-pointer ${
                              formData.questionCount === count
                                ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                                : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 bg-zinc-50'
                            }`}
                          >
                            {count} Questions
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button onClick={prevStep} className="px-6 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold rounded-[5px] transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-zinc-200">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button onClick={nextStep} className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-[5px] transition-all shadow-sm cursor-pointer text-xs">
                      Launch Session
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 4: Loading ───────────────────────────────────── */}
              {step === 4 && (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="relative w-14 h-14 mb-6">
                    <div className="absolute inset-0 border-[3px] border-zinc-200 rounded-full" />
                    <div className="absolute inset-0 border-[3px] border-zinc-900 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Preparing session…</h3>
                  <p className="text-zinc-500 text-xs">Calibrating your interview scenario</p>
                </div>
              )}

              {/* ── Step 5: Ready to Launch ───────────────────────────── */}
              {step === 5 && (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 mb-6">
                    <Mic className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">
                    Session Ready
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-sm mb-2">
                    Your{' '}
                    {sessionType === 'star_conversational'
                      ? 'STAR conversational'
                      : 'behavioral deep dive'}{' '}
                    session is ready to launch.
                  </p>
                  <p className="text-zinc-400 text-xs mb-8">It will open in a new tab.</p>
                  <button
                    onClick={() => {
                      const id = localStorage.getItem('currentInterviewId');
                      if (id) window.open(`/interview/${id}`, '_blank');
                      resetAndClose();
                      setTimeout(onSessionCreated, 1500);
                    }}
                    className="px-12 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-[5px] transition-all shadow-sm uppercase tracking-widest cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Launch Interview
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
