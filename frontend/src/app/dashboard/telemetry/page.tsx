"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase, Session } from '@/lib/supabase';
import { IconChartLine } from '@tabler/icons-react';
import {
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend, PolarRadiusAxis,
} from 'recharts';

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="h-48 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl">
      <p className="text-xs text-zinc-400 font-medium">{message}</p>
    </div>
  );
}

export default function TelemetryPage() {
  useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading,  setLoading]  = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: true });

    setSessions(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  // Chart data
  const lineData = sessions.map((s, i) => ({
    session: `S${i + 1}`,
    score: s.overall_score ?? 0,
    date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const last5 = sessions.slice(-5);
  const avg = (key: keyof Session) =>
    last5.length ? Math.round(last5.reduce((acc, s) => acc + ((s[key] as number) ?? 0), 0) / last5.length) : 0;

  const radarData = [
    { category: 'Role Knowledge',  value: avg('role_knowledge_score') },
    { category: 'Communication',   value: avg('communication_score') },
    { category: 'Problem Solving', value: avg('problem_solving_score') },
    { category: 'Behavioral',      value: avg('behavioral_score') },
  ];

  const wpmData = sessions.map((s, i) => ({
    session: `S${i + 1}`,
    wpm: s.wpm_avg ?? 0,
  }));

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full">
      <div className="mb-8 flex items-center gap-2.5">
        <IconChartLine size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Performance Telemetry</h1>
          <p className="text-sm text-zinc-500">Track your improvement across all dimensions over time.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">

          {/* Overall Score Over Time */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="text-sm font-bold text-zinc-900 mb-4">Overall Score Over Time</h2>
            {lineData.length < 2 ? (
              <EmptyChart message="Complete at least 2 sessions to see your score trend." />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#71717a' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#71717a' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e4e4e7', fontSize: 12 }}
                    formatter={(v: any) => [`${v}`, 'Score']}
                  />
                  <Line
                    type="monotone" dataKey="score" stroke="#18181b"
                    strokeWidth={2} dot={{ fill: '#18181b', r: 4 }} activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Radar + WPM side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Competency Radar */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-sm font-bold text-zinc-900 mb-1">Competency Radar</h2>
              <p className="text-[11px] text-zinc-500 mb-4">Averaged across your last 5 sessions</p>
              {last5.length === 0 ? (
                <EmptyChart message="Complete at least 1 session to see your radar." />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData} outerRadius={80}>
                    <PolarGrid stroke="#f4f4f5" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#71717a' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="You" dataKey="value" stroke="#18181b" fill="#18181b" fillOpacity={0.08} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* WPM Bar Chart */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-sm font-bold text-zinc-900 mb-1">Speech Pace (WPM)</h2>
              <p className="text-[11px] text-zinc-500 mb-4">Ideal range: 110–180 WPM</p>
              {wpmData.filter(d => d.wpm > 0).length === 0 ? (
                <EmptyChart message="WPM data will appear here after sessions with voice tracking." />
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={wpmData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                    <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#71717a' }} />
                    <YAxis domain={[0, 250]} tick={{ fontSize: 11, fill: '#71717a' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: '1px solid #e4e4e7', fontSize: 12 }}
                      formatter={(v: any) => [`${v} WPM`, 'Pace']}
                    />
                    <ReferenceLine y={110} stroke="#10b981" strokeDasharray="4 4" label={{ value: '110', position: 'right', fontSize: 9, fill: '#10b981' }} />
                    <ReferenceLine y={180} stroke="#10b981" strokeDasharray="4 4" label={{ value: '180', position: 'right', fontSize: 9, fill: '#10b981' }} />
                    <Bar dataKey="wpm" fill="#18181b" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
