"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { IconAccessible, IconVolume, IconKeyboard, IconSubtitles } from '@tabler/icons-react';

interface Setting {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const SETTINGS: Setting[] = [
  {
    key: 'tts_enabled',
    label: 'Text-to-Speech',
    description: 'Interview questions will be read aloud using your browser\'s speech engine. Useful for visual impairments or focus-based practice.',
    icon: IconVolume,
  },
  {
    key: 'captions_enabled',
    label: 'Real-Time Captions',
    description: 'Enable live captions during your interview session. All speech is transcribed instantly on-screen.',
    icon: IconSubtitles,
  },
  {
    key: 'keyboard_layout',
    label: 'Keyboard-Only Mode',
    description: 'Enhances focus rings, skip-links, and keyboard navigation across the entire dashboard for full accessibility without a mouse.',
    icon: IconKeyboard,
  },
];

export default function AccessibilityPage() {
  useAuth();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    tts_enabled: false,
    captions_enabled: false,
    keyboard_layout: false,
  });
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored: Record<string, boolean> = {};
    SETTINGS.forEach((s) => {
      stored[s.key] = localStorage.getItem(`accessibility_${s.key}`) === 'true';
    });
    setToggles(stored);
  }, []);

  function toggle(key: string) {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`accessibility_${key}`, String(next[key]));
      return next;
    });
    setSaved(false);
  }

  function savePreferences() {
    SETTINGS.forEach((s) => {
      localStorage.setItem(`accessibility_${s.key}`, String(toggles[s.key]));
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full max-w-2xl">
      <div className="mb-8 flex items-center gap-2.5">
        <IconAccessible size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Accessibility Hub</h1>
          <p className="text-sm text-zinc-500">Configure your experience for equal access to all preparation tools.</p>
        </div>
      </div>

      <div className="space-y-3">
        {SETTINGS.map((setting) => {
          const Icon = setting.icon;
          const active = toggles[setting.key];
          return (
            <div
              key={setting.key}
              className="bg-white border border-zinc-200 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  <Icon size={18} stroke={1.8} />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{setting.label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{setting.description}</p>
                </div>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggle(setting.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-1 ${
                  active ? 'bg-zinc-900' : 'bg-zinc-200'
                }`}
                role="switch"
                aria-checked={active}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={savePreferences}
          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-[5px] text-sm transition-all shadow-sm cursor-pointer"
        >
          Save Preferences
        </button>
        {saved && (
          <span className="text-xs text-emerald-600 font-bold">✓ Preferences saved</span>
        )}
      </div>
    </div>
  );
}
