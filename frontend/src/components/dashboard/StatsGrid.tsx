"use client";

import React from 'react';
import {
  ChevronRight,
  Activity,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Interview } from '@/lib/api';

interface StatsGridProps {
  interviews: Interview[];
}

export default function StatsGrid({ interviews }: StatsGridProps) {
  const latestCompleted = interviews.find((i) => i.status === 'completed');
  const completedCount = interviews.filter((i) => i.status === 'completed').length;
  const inProgressCount = interviews.filter((i) => i.status === 'in_progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
      {/* Latest Mock Interview */}
      <div className="bg-white p-4.5 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col min-h-[155px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-zinc-700 text-[13px]">Latest Mock Interview</h3>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>
        {latestCompleted ? (
          <div className="flex items-center gap-4.5">
            <div className="relative w-[68px] h-[68px] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 96 96" className="w-full h-full transform -rotate-90 overflow-visible">
                <circle
                  className="text-zinc-100"
                  cx="48" cy="48" fill="transparent" r="40"
                  stroke="currentColor" strokeWidth="6"
                />
                <circle
                  className="text-zinc-900"
                  cx="48" cy="48" fill="transparent" r="40"
                  stroke="currentColor"
                  strokeDasharray="251.32"
                  strokeDashoffset={251.32 - (251.32 * (latestCompleted.overall_score || 0) / 100)}
                  strokeWidth="6" strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-base font-bold text-zinc-900 tabular-nums">
                {latestCompleted.overall_score ?? '—'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5 font-semibold">
                {latestCompleted.agent?.name || 'Interviewer'}
              </p>
              <p className="text-[13px] font-bold text-zinc-900 line-clamp-2 leading-snug">
                {latestCompleted.job_description || 'General Interview'}
              </p>
              <span className="text-[10px] text-zinc-500 block mt-1.5 font-medium tabular-nums">
                {latestCompleted.completed_at
                  ? new Date(latestCompleted.completed_at).toLocaleDateString()
                  : 'Recently'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-3.5 text-zinc-500">
            <HelpCircle className="w-7 h-7 mb-2 opacity-40" />
            <p className="text-xs">No completed interviews yet</p>
          </div>
        )}
      </div>

      {/* Interview Tracker */}
      <div className="bg-white p-4.5 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-900" />
            <h3 className="font-semibold text-zinc-700 text-[13px]">Interview Tracker</h3>
          </div>
        </div>
        <div className="space-y-2.5 flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <p className="text-zinc-500 text-sm">Total Sessions</p>
            <span className="text-lg font-bold text-zinc-900 tabular-nums">{interviews.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-zinc-500 text-sm">Completed</p>
            <span className="text-base font-bold text-emerald-600 tabular-nums">{completedCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-zinc-500 text-sm">In Progress</p>
            <span className="text-base font-bold text-blue-600 tabular-nums">{inProgressCount}</span>
          </div>
        </div>
      </div>

      {/* AI Performance Feedback */}
      <div className="bg-white p-4.5 rounded-xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-zinc-900" />
          <h3 className="font-semibold text-zinc-700 text-[13px]">AI Performance Feedback</h3>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-zinc-500 text-xs leading-relaxed font-medium mb-3.5">
            Get instant feedback on your tone, pace, and response structure. Compare your metrics to see how you improve over time.
          </p>
          <button className="w-full py-2.5 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 text-xs font-bold rounded-lg transition-all cursor-pointer">
            View Progress Metrics
          </button>
        </div>
      </div>
    </div>
  );
}
