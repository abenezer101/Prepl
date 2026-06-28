"use client";

import React from 'react';
import { Mic, VideoOff, Plus } from 'lucide-react';
import { Interview } from '@/lib/api';

interface SessionListProps {
  interviews: Interview[];
  loading: boolean;
  onNewSession: () => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'in_progress':
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    default:
      return 'bg-zinc-100 text-zinc-600 border border-zinc-200';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
}

export default function SessionList({ interviews, loading, onNewSession }: SessionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base font-bold text-zinc-900">Past Practice Sessions</h2>
        <button
          onClick={onNewSession}
          className="lg:hidden py-1.5 px-3 bg-zinc-900 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors text-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          New Session
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-14">
          <div className="w-6 h-6 rounded-full border-2 border-zinc-200 border-t-zinc-900 animate-spin" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="space-y-2">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white p-3.5 rounded-lg border border-zinc-200/80 hover:border-zinc-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-between hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700 transition-colors">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 text-[13px]">
                    {interview.agent?.name || 'Interviewer'}{' '}
                    <span className="text-zinc-400 font-normal">·</span>{' '}
                    <span className="text-zinc-500 font-normal">
                      {interview.job_description?.slice(0, 60) || 'General Interview Practice'}
                      {interview.job_description && interview.job_description.length > 60 ? '…' : ''}
                    </span>
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 font-medium tabular-nums">
                    {new Date(interview.created_at).toLocaleDateString()} · {interview.number_of_questions || '?'} questions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                {interview.overall_score !== null && interview.overall_score !== undefined && (
                  <span className="text-[15px] font-bold text-zinc-900 tabular-nums">
                    {interview.overall_score}
                  </span>
                )}
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(interview.status)}`}
                >
                  {getStatusLabel(interview.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-center p-5">
          <VideoOff className="w-8 h-8 mb-3 text-zinc-300" />
          <p className="font-semibold text-zinc-600 text-xs">No interviews scheduled</p>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            Create your first custom practice session to get started.
          </p>
        </div>
      )}
    </div>
  );
}
