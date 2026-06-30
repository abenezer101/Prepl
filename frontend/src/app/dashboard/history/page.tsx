"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase, Session } from '@/lib/supabase';
import { IconHistory, IconChevronDown, IconChevronUp, IconMicrophone, IconMessages } from '@tabler/icons-react';

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-zinc-400 text-sm font-bold">—</span>;
  const color = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600';
  return <span className={`text-base font-black tabular-nums ${color}`}>{score}</span>;
}

export default function HistoryPage() {
  useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data } = await supabase
      .from('sessions')
      .select('*, recommendations(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setSessions(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const getStatusColor = (s: string) =>
    s === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    s === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
    'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full">
      <div className="mb-8 flex items-center gap-2.5">
        <IconHistory size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Session History</h1>
          <p className="text-sm text-zinc-500">All your past practice sessions with scores and feedback.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="py-20 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <IconHistory size={40} className="text-zinc-300 mb-3" stroke={1.5} />
          <p className="font-semibold text-zinc-600 text-sm">No sessions yet</p>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">Complete your first mock interview to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="bg-white border border-zinc-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-400">
                    {s.session_type === 'star_conversational'
                      ? <IconMicrophone size={18} stroke={1.8} />
                      : <IconMessages size={18} stroke={1.8} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 text-[13px] truncate">
                      {s.job_description?.slice(0, 70) || 'General Practice Session'}
                      {s.job_description && s.job_description.length > 70 ? '…' : ''}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium tabular-nums">
                      {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {s.agent_name && ` · ${s.agent_name}`}
                      {s.session_type && ` · ${s.session_type === 'star_conversational' ? 'STAR Conversational' : 'Behavioral Deep Dive'}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <ScoreBadge score={s.overall_score ?? null} />
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(s.status)}`}>
                    {s.status.replace('_', ' ')}
                  </span>
                  {expanded === s.id
                    ? <IconChevronUp size={14} className="text-zinc-400" />
                    : <IconChevronDown size={14} className="text-zinc-400" />}
                </div>
              </button>

              {/* Expanded Detail */}
              {expanded === s.id && (
                <div className="border-t border-zinc-100 px-4 py-4 bg-zinc-50/60">
                  {/* Score Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Role Knowledge',   value: s.role_knowledge_score },
                      { label: 'Communication',    value: s.communication_score },
                      { label: 'Problem Solving',  value: s.problem_solving_score },
                      { label: 'Behavioral',       value: s.behavioral_score },
                    ].map((m) => (
                      <div key={m.label} className="bg-white border border-zinc-200 rounded-lg p-3 text-center">
                        <div className="text-xl font-black text-zinc-900 tabular-nums">
                          {m.value ?? '—'}
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {s.recommendations && s.recommendations.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Growth Recommendations</p>
                      <ul className="space-y-1.5">
                        {s.recommendations.map((r) => (
                          <li key={r.id} className="flex items-start gap-2 text-xs text-zinc-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                            {r.recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
