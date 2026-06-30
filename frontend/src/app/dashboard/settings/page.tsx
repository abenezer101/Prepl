"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconUpload,
  IconCheck,
  IconMail,
  IconDeviceFloppy,
  IconSparkles,
  IconVolume,
  IconKeyboard,
  IconSubtitles,
  IconUser,
  IconAdjustments,
  IconCreditCard
} from '@tabler/icons-react';

type Tab = 'profile' | 'settings' | 'subscription';

const PREMIUM_FEATURES = [
  'Unlimited mock sessions',
  'Company-specific JD calibration',
  'Custom scenario generation',
  'Cross-session improvement charts',
];

export default function SettingsPage() {
  useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  // Resume upload states
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Accessibility / App settings states
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState(false);

  // Form handling states
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Load profile and settings on mount
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setName(profile.name ?? '');
        setGithub(profile.github_handle ?? '');
        setLinkedin(profile.linkedin_url ?? '');
        setResumeUrl(profile.resume_url ?? '');
        setCoverLetter(profile.cover_letter ?? '');
      }

      // Load app settings from localStorage
      setTtsEnabled(localStorage.getItem('accessibility_tts_enabled') === 'true');
      setCaptionsEnabled(localStorage.getItem('accessibility_captions_enabled') === 'true');
      setKeyboardLayout(localStorage.getItem('accessibility_keyboard_layout') === 'true');
    }
    loadData();
  }, []);

  async function handleSaveProfile() {
    setSaving(true);
    setError('');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let finalResumeUrl = resumeUrl;

      // Upload resume if a new file is chosen
      if (resumeFile) {
        const ext = resumeFile.name.split('.').pop();
        const path = `resumes/${user.id}/resume.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('user-assets')
          .upload(path, resumeFile, { upsert: true });
        
        if (uploadError) {
          console.error(uploadError);
        } else {
          const { data: urlData } = supabase.storage.from('user-assets').getPublicUrl(path);
          finalResumeUrl = urlData.publicUrl;
        }
      }

      // Save profile to Supabase
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: name,
          email: user.email,
          github_handle: github,
          linkedin_url: linkedin,
          resume_url: finalResumeUrl,
          cover_letter: coverLetter,
        });

      if (upsertError) throw upsertError;

      setResumeUrl(finalResumeUrl);
      setResumeFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile settings.');
    } finally {
      setSaving(false);
    }
  }

  const handleSaveSettings = () => {
    setSaving(true);
    localStorage.setItem('accessibility_tts_enabled', String(ttsEnabled));
    localStorage.setItem('accessibility_captions_enabled', String(captionsEnabled));
    localStorage.setItem('accessibility_keyboard_layout', String(keyboardLayout));
    
    // Simulate short delay for save feedback
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden px-6 py-6 w-full max-w-5xl">
      {/* ── Settings Header ─────────────────────────────────────────── */}
      <div className="mb-6 shrink-0">
        <h1 className="text-[28px] font-bold text-zinc-900 tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your account settings, preferences, and subscription.</p>
      </div>

      {/* ── Tabs Navigation ─────────────────────────────────────────── */}
      <div className="border-b border-zinc-200/80 mb-8 flex gap-8 shrink-0">
        {[
          { id: 'profile',      label: 'Profile',      icon: IconUser },
          { id: 'settings',     label: 'Settings',     icon: IconAdjustments },
          { id: 'subscription', label: 'Subscription', icon: IconCreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as Tab); setError(''); setSaved(false); }}
              className={`pb-3 text-sm font-semibold transition-all cursor-pointer border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                active
                  ? 'border-zinc-900 text-zinc-900 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <Icon size={16} stroke={active ? 2.5 : 1.8} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium shrink-0">
          {error}
        </div>
      )}

      {/* ── Tab Panels ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pr-2 pb-6 min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
        {/* Profile Tab Panel */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column Description */}
              <div className="md:col-span-1">
                <h3 className="text-base font-bold text-zinc-900">Profile Information</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Update your contact details and professional candidate context.
                </p>
              </div>

              {/* Right Column Fields */}
              <div className="md:col-span-2 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-750 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-750 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <IconMail size={16} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full pl-9 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-400 cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-750 mb-1.5 flex items-center gap-1.5">
                      <IconBrandGithub size={15} /> GitHub Handle
                    </label>
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <span className="px-3 py-2.5 text-xs text-zinc-500 border-r border-zinc-200 bg-zinc-100">github.com/</span>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="username"
                        className="flex-1 px-3.5 py-2.5 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-750 mb-1.5 flex items-center gap-1.5">
                      <IconBrandLinkedin size={15} /> LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-750 mb-1.5">Resume / CV</label>
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />

                  {resumeUrl && !resumeFile ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-2.5 text-xs font-medium text-emerald-700">
                        <IconCheck size={14} stroke={2.5} />
                        Resume uploaded successfully
                      </div>
                      <button
                        onClick={() => resumeInputRef.current?.click()}
                        className="text-xs font-bold text-emerald-700 underline cursor-pointer hover:text-emerald-800"
                      >
                        Replace File
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => resumeInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-zinc-200 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 hover:border-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer"
                    >
                      <IconUpload size={20} className="text-zinc-400" stroke={1.8} />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-zinc-700">
                          {resumeFile ? resumeFile.name : 'Click to upload resume'}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">PDF or DOCX · Max 10 MB</p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Cover Letter (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-750 mb-1.5 flex items-center gap-1.5">
                    Cover Letter <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Paste your cover letter here..."
                    rows={6}
                    className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] resize-y min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Save Profile Button */}
            <div className="border-t border-zinc-100 pt-5 flex items-center justify-end gap-4">
              {saved && (
                <span className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <IconCheck size={16} stroke={2.5} /> Profile changes saved
                </span>
              )}
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 disabled:bg-zinc-300 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.98]"
              >
                <IconDeviceFloppy size={16} />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab Panel */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column Description */}
              <div className="md:col-span-1">
                <h3 className="text-base font-bold text-zinc-900">Application Settings</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Configure visual aids and accessibility preferences for interview sessions.
                </p>
              </div>

              {/* Right Column Fields */}
              <div className="md:col-span-2 space-y-4">
                {[
                  {
                    key: 'tts',
                    label: 'Text-to-Speech',
                    description: 'Read interview questions aloud using your device\'s voice synthesizer.',
                    icon: IconVolume,
                    val: ttsEnabled,
                    set: setTtsEnabled
                  },
                  {
                    key: 'captions',
                    label: 'Real-Time Captions',
                    description: 'Transcribe your answers and interviewer questions on-screen.',
                    icon: IconSubtitles,
                    val: captionsEnabled,
                    set: setCaptionsEnabled
                  },
                  {
                    key: 'keyboard',
                    label: 'Keyboard-Only Navigation',
                    description: 'Optimize page layouts and interactive highlights for standard keyboard focus.',
                    icon: IconKeyboard,
                    val: keyboardLayout,
                    set: setKeyboardLayout
                  }
                ].map((pref) => {
                  const Icon = pref.icon;
                  return (
                    <div
                      key={pref.key}
                      className="bg-white border border-zinc-200 rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          pref.val ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900">{pref.label}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{pref.description}</p>
                        </div>
                      </div>

                      {/* Switch toggle */}
                      <button
                        onClick={() => pref.set(!pref.val)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-1 ${
                          pref.val ? 'bg-zinc-950' : 'bg-zinc-200'
                        }`}
                        role="switch"
                        aria-checked={pref.val}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                            pref.val ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Application Settings Button */}
            <div className="border-t border-zinc-100 pt-5 flex items-center justify-end gap-4">
              {saved && (
                <span className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <IconCheck size={16} stroke={2.5} /> Application settings saved
                </span>
              )}
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 disabled:bg-zinc-300 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.98]"
              >
                <IconDeviceFloppy size={16} />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}

        {/* Subscription Tab Panel */}
        {activeTab === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column Description */}
            <div className="md:col-span-1">
              <h3 className="text-base font-bold text-zinc-900">Subscription & Billing</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Review your current package, tier limits, and premium options.
              </p>
            </div>

            {/* Right Column Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Usage Card */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Plan</p>
                    <p className="text-lg font-black text-zinc-900 mt-0.5">Candidate Base (Free)</p>
                  </div>
                  <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 border border-zinc-200 text-xs font-bold uppercase tracking-wider rounded-full">
                    Free Tier
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-zinc-500 font-medium">Monthly usage</p>
                  <p className="text-xs font-bold text-zinc-900">0 / 3 sessions</p>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-950 rounded-full transition-all" style={{ width: '0%' }} />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1.5">Your free package resets on the 1st of next month.</p>
              </div>

              {/* Upgrade Banner Promo */}
              <div className="bg-zinc-950 border border-zinc-950 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded-full">
                    Recommended
                  </span>
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
                <button className="px-6 py-2.5 bg-white text-zinc-950 text-xs font-bold rounded-lg transition-all hover:bg-zinc-100 cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                  <IconSparkles size={13} />
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
