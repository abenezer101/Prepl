"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Plus, 
  LayoutDashboard, 
  HelpCircle, 
  BarChart2, 
  Activity, 
  Mic, 
  VideoOff, 
  X, 
  FileText, 
  Upload, 
  ChevronRight,
  LogOut,
  Sparkles,
  ArrowLeft,
  Settings,
  HelpCircle as HelpIcon,
  ShieldAlert
} from 'lucide-react';
import Image from 'next/image';
import { 
  listInterviews, 
  createInterview, 
  startInterview, 
  Interview 
} from '@/lib/api';

const interviewerAgentMap: Record<string, number> = {
  'Sarah': 1,
  'Michael': 2,
  'Emily': 3,
};

const interviewers = [
  { name: 'Sarah', role: 'Technical Recruiter', icon: 'woman' },
  { name: 'Michael', role: 'Engineering Lead', icon: 'man' },
  { name: 'Emily', role: 'HR Director', icon: 'face' }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [pastInterviews, setPastInterviews] = useState<Interview[]>([]);
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [createError, setCreateError] = useState('');
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('Guest');

  const [formData, setFormData] = useState({
    jobDescription: '',
    resume: { name: 'Default_Resume.pdf', isDefault: true } as { name: string; isDefault: boolean; [key: string]: any },
    cv: '',
    difficulty: 'intermediate',
    interviewer: 'Sarah',
    questionCount: 10
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/signin');
        return;
      }
      setUserName(localStorage.getItem('userName') || 'User');
      setUserEmail(localStorage.getItem('userEmail') || 'Guest');
      fetchInterviews();
    }
  }, [router]);

  async function fetchInterviews() {
    setLoadingInterviews(true);
    try {
      const data = await listInterviews();
      setPastInterviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch interviews:', err);
      setPastInterviews([]);
    } finally {
      setLoadingInterviews(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.replace('/signin');
  };

  const nextStep = async () => {
    if (modalStep === 1) {
      setModalStep(2);
    } else if (modalStep === 2) {
      setModalStep(3); // loading state
      setCreateError('');

      try {
        const agentId = interviewerAgentMap[formData.interviewer] || 1;
        const interview = await createInterview({
          agent_id: agentId,
          job_description: formData.jobDescription || null,
          number_of_questions: formData.questionCount,
        });

        console.log('✅ Interview created:', interview);
        localStorage.setItem('currentInterviewId', interview.id);

        try {
          await startInterview(interview.id);
          console.log('✅ Interview started');
        } catch (startErr) {
          console.warn('⚠️ Could not start interview:', startErr);
        }

        setModalStep(4); // ready state
      } catch (err: any) {
        console.error('❌ Failed to create interview:', err);
        setCreateError(err.message || 'Failed to create interview session.');
        setModalStep(2);
      }
    }
  };

  const prevStep = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setCreateError('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
      default: return 'bg-zinc-100 text-zinc-600 border border-zinc-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  const latestCompleted = pastInterviews.find(i => i.status === 'completed');

  return (
    <div className="bg-[#fbf8f3] text-zinc-900 min-h-screen selection:bg-stone-300/40 font-sans relative overflow-x-hidden">
      {/* Light Ambient Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      {/* Header */}
      <header className="h-16 bg-white/80 border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <Image src="/images/square-logo.png" width={32} height={32} alt="logo" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">Prepl</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden hover:border-zinc-300 transition-all cursor-pointer text-zinc-500 hover:text-zinc-900"
            >
              <User className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-white border border-zinc-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden"
                >
                  <div className="p-5 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-blue-600">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-bold text-zinc-900">
                        {userName}
                      </span>
                      <span className="text-xs text-zinc-500 truncate">
                        {userEmail}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-zinc-200"></div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-zinc-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className="w-64 h-[calc(100vh-64px)] bg-white/40 border-r border-zinc-200 sticky top-16 hidden lg:block p-6">
          <div className="mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10 cursor-pointer text-sm"
            >
              <Plus className="w-4 h-4" />
              New Session
            </button>
          </div>
          <nav className="space-y-1">
            <a className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-medium transition-all text-sm" href="#">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-8 lg:p-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">
            Welcome, {userName}!
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Latest Mock Interview */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col min-h-[180px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-zinc-700 text-sm">Latest Mock Interview</h3>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </div>
              {latestCompleted ? (
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 96 96" className="w-full h-full transform -rotate-90 overflow-visible">
                      <circle className="text-zinc-200" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6"></circle>
                      <circle className="text-blue-500" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.32" strokeDashoffset={251.32 - (251.32 * (latestCompleted.overall_score || 0) / 100)} strokeWidth="6" strokeLinecap="round"></circle>
                    </svg>
                    <span className="absolute text-xl font-bold text-zinc-900">{latestCompleted.overall_score ?? '—'}</span>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">{latestCompleted.agent?.name || 'Interviewer'}</p>
                    <p className="text-base font-bold text-zinc-900 line-clamp-2 leading-tight">
                      {latestCompleted.job_description || 'General Interview'}
                    </p>
                    <span className="text-[10px] text-zinc-600 block mt-1.5 font-medium">
                      {latestCompleted.completed_at ? new Date(latestCompleted.completed_at).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-4 text-zinc-600">
                  <HelpCircle className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs">No completed interviews yet</p>
                </div>
              )}
            </div>

            {/* Tracker */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-zinc-700 text-sm">Interview Tracker</h3>
                </div>
              </div>
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500 text-sm">Total Sessions</p>
                  <span className="text-xl font-bold text-zinc-900">{pastInterviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500 text-sm">Completed</p>
                  <span className="text-base font-bold text-emerald-600">{pastInterviews.filter(i => i.status === 'completed').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500 text-sm">In Progress</p>
                  <span className="text-base font-bold text-blue-600">{pastInterviews.filter(i => i.status === 'in_progress').length}</span>
                </div>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <h3 className="font-semibold text-zinc-700 text-sm">AI Performance Feedback</h3>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-zinc-500 text-xs leading-relaxed font-medium mb-4">
                  Get instant feedback on your tone, pace, and response structure. Compare your metrics to see how you improve.
                </p>
                <button className="w-full py-2.5 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 text-xs font-bold rounded-xl transition-all cursor-pointer">
                  View Progress Metrics
                </button>
              </div>
            </div>
          </div>

          {/* Past Sessions List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900">Past Practice Sessions</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="lg:hidden py-1.5 px-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-700 transition-colors text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                New Session
              </button>
            </div>
            
            {loadingInterviews ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-blue-500 animate-spin"></div>
              </div>
            ) : pastInterviews.length > 0 ? (
              <div className="space-y-3">
                {pastInterviews.map((interview) => (
                  <div 
                    key={interview.id} 
                    className="bg-white p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-blue-600 transition-colors">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm">
                          {interview.agent?.name || 'Interviewer'} • <span className="text-zinc-500 font-normal">{interview.job_description?.slice(0, 60) || 'General Interview Practice'}{interview.job_description && interview.job_description.length > 60 ? '…' : ''}</span>
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1 font-medium">
                          {new Date(interview.created_at).toLocaleDateString()} · {interview.number_of_questions || '?'} questions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {interview.overall_score !== null && interview.overall_score !== undefined && (
                        <span className="text-base font-bold text-blue-600">{interview.overall_score}</span>
                      )}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(interview.status)}`}>
                        {getStatusLabel(interview.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-500 text-center p-6">
                <VideoOff className="w-10 h-10 mb-4 text-zinc-400" />
                <p className="font-semibold text-zinc-600 text-sm">No interviews scheduled</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">Create your first custom practice session to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* NEW SESSION CONFIGURATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-full transition-all z-20 cursor-pointer border border-transparent hover:border-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6">
                {modalStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      Configure Practice Session
                    </h2>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">Job Description / Target Role</label>
                        <textarea
                          className="w-full h-24 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm overflow-y-auto text-zinc-900 placeholder:text-zinc-400"
                          placeholder="Paste target job descriptions to focus calibration..."
                          value={formData.jobDescription}
                          onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">Upload Resume / CV Context</label>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Use Default Option */}
                          <button
                            onClick={() => setFormData({ ...formData, resume: { name: 'My_Default_Resume.pdf', isDefault: true } })}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${formData.resume?.isDefault
                              ? 'border-blue-500 bg-blue-500/5 text-blue-600 shadow-sm'
                              : 'border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${formData.resume?.isDefault ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}`}>
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="text-center">
                              <span className="text-[11px] font-bold block text-zinc-800">Use Default</span>
                              <span className="text-[9px] text-zinc-500 block truncate max-w-[120px]">My_Resume.pdf</span>
                            </div>
                          </button>

                          {/* Upload Option (Mock) */}
                          <div className={`relative rounded-xl border-2 border-dashed transition-all group ${formData.resume && !formData.resume.isDefault
                            ? 'border-blue-500 bg-blue-500/5 text-blue-600 shadow-sm'
                            : 'border-zinc-200 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300'
                          }`}>
                            <label className="cursor-pointer p-4 flex flex-col items-center justify-center gap-2 w-full h-full">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${formData.resume && !formData.resume.isDefault ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}`}>
                                <Upload className="w-4 h-4" />
                              </div>
                              <div className="text-center overflow-hidden w-full">
                                <span className="text-[11px] font-bold block text-zinc-800">Upload New</span>
                                <span className="text-[9px] text-zinc-500 truncate block px-2">
                                  {formData.resume && !formData.resume.isDefault ? formData.resume.name : "PDF or DOCX"}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wider">Curriculum Vitae (Optional)</label>
                        <textarea
                          className="w-full h-20 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm overflow-y-auto text-zinc-800 placeholder:text-zinc-400"
                          placeholder="Paste additional career highlights..."
                          value={formData.cv}
                          onChange={(e) => setFormData({ ...formData, cv: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={nextStep}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/15 cursor-pointer text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {modalStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6 uppercase tracking-wider text-center">Customize Agent Behavior</h2>

                    {createError && (
                      <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-medium flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{createError}</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Interviewer */}
                      <div>
                        <label className="block text-center text-[10px] font-bold text-zinc-600 mb-4 uppercase tracking-[0.2em]">1. Select Your AI Agent</label>
                        <div className="flex justify-center gap-6">
                          {interviewers.map((person) => (
                            <button
                              key={person.name}
                              onClick={() => setFormData({ ...formData, interviewer: person.name })}
                              className={`group flex flex-col items-center gap-3 p-3 rounded-2xl transition-all duration-300 cursor-pointer ${formData.interviewer === person.name
                                ? 'bg-blue-50 border border-blue-200'
                                : 'border border-transparent hover:bg-zinc-100/50'
                              }`}
                            >
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner ${formData.interviewer === person.name
                                ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 scale-105'
                                : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                              }`}>
                                <User className="w-6 h-6" />
                              </div>
                              <div className="text-center">
                                <div className={`font-bold text-xs transition-colors ${formData.interviewer === person.name ? 'text-blue-600' : 'text-zinc-700'}`}>{person.name}</div>
                                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter mt-0.5">{person.role}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-zinc-200 mx-10"></div>

                      {/* Difficulty */}
                      <div>
                        <label className="block text-center text-[10px] font-bold text-zinc-600 mb-3 uppercase tracking-[0.2em]">2. Evaluation Rubric Strictness</label>
                        <div className="flex justify-center gap-4">
                          {['easy', 'intermediate', 'hard'].map((level) => (
                            <button
                              key={level}
                              onClick={() => setFormData({ ...formData, difficulty: level })}
                              className={`flex-1 max-w-[130px] py-2.5 rounded-xl border transition-all font-bold text-xs capitalize cursor-pointer ${formData.difficulty === level
                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                : 'border-zinc-200 hover:border-zinc-300 text-zinc-500 bg-zinc-50'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Questions */}
                      <div>
                        <label className="block text-center text-[10px] font-bold text-zinc-600 mb-3 uppercase tracking-[0.2em]">3. Question Stack Count</label>
                        <div className="flex justify-center gap-4">
                          {[5, 10, 15].map((count) => (
                            <button
                              key={count}
                              onClick={() => setFormData({ ...formData, questionCount: count })}
                              className={`flex-1 max-w-[130px] py-2.5 rounded-xl border transition-all font-bold text-xs cursor-pointer ${formData.questionCount === count
                                ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/10'
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
                      <button
                        onClick={prevStep}
                        className="px-6 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-zinc-200"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/15 cursor-pointer text-xs"
                      >
                        Start Calibration
                      </button>
                    </div>
                  </div>
                )}

                {modalStep === 3 && (
                  <div className="py-16 flex flex-col items-center justify-center">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Preparing practice session...</h3>
                    <p className="text-zinc-500 animate-pulse text-xs">Creating practice scenario...</p>
                  </div>
                )}

                {modalStep === 4 && (
                  <div className="py-16 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6 animate-bounce">
                      <Mic className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">Audio Session Ready</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-8">
                      Your voice mock interview is ready. Connect and start practicing.
                    </p>
                    <button
                      onClick={() => {
                        window.open('/interview', '_blank');
                        resetModal();
                        setTimeout(fetchInterviews, 1500);
                      }}
                      className="px-14 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl transition-all shadow-2xl shadow-blue-500/20 uppercase tracking-widest cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Interview
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
