"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase, SavedSession } from '@/lib/supabase';
import { IconBookmark, IconExternalLink } from '@tabler/icons-react';

export default function SavedPage() {
  useAuth();
  const [saved,   setSaved]   = useState<SavedSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from('saved_sessions')
      .select('*, session:sessions(*)')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });
    setSaved(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full">
      <div className="mb-8 flex items-center gap-2.5">
        <IconBookmark size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Saved Sessions</h1>
          <p className="text-sm text-zinc-500">Bookmarked sessions and highlights you want to revisit.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      ) : saved.length === 0 ? (
        <div className="py-20 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <IconBookmark size={40} className="text-zinc-300 mb-3" stroke={1.5} />
          <p className="font-semibold text-zinc-600 text-sm">No saved sessions yet</p>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            Bookmark sessions from your history to keep your best performances here for final review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((s) => (
            <div key={s.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-3">
              {/* Score */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-zinc-900 tabular-nums">
                  {s.session?.overall_score ?? '—'}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded-full">
                  {s.session?.session_type === 'star_conversational' ? 'STAR' : 'Behavioral'}
                </span>
              </div>

              {/* Role */}
              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                {s.session?.job_description || 'General Practice Session'}
              </p>

              {/* Note */}
              {s.note && (
                <p className="text-[11px] text-zinc-500 italic border-l-2 border-zinc-200 pl-2 leading-relaxed">
                  "{s.note}"
                </p>
              )}

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100">
                <p className="text-[9px] text-zinc-400 font-medium">
                  {s.saved_at ? new Date(s.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </p>
                <a
                  href={`/dashboard/history`}
                  className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  View Report <IconExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
