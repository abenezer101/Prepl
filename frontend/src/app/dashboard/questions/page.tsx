"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase, VettedQuestion } from '@/lib/supabase';
import { IconHelpCircle } from '@tabler/icons-react';

export default function QuestionsPage() {
  useAuth();
  const [questions, setQuestions] = useState<VettedQuestion[]>([]);
  const [loading,   setLoading]   = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from('vetted_questions')
      .select('*')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });
    setQuestions(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div className="px-4 pt-2 pb-6 lg:px-6 lg:pt-3 w-full">
      <div className="mb-8 flex items-center gap-2.5">
        <IconHelpCircle size={20} className="text-zinc-500" stroke={1.8} />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Vetted Questions</h1>
          <p className="text-sm text-zinc-500">Interview prompts where you struggled — saved for focused review and practice.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      ) : questions.length === 0 ? (
        <div className="py-20 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <IconHelpCircle size={40} className="text-zinc-300 mb-3" stroke={1.5} />
          <p className="font-semibold text-zinc-600 text-sm">No saved questions yet</p>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            After your sessions, questions you want to revisit will be saved here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white border border-zinc-200 rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-3">
              {/* Question */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Question</p>
                <p className="text-sm font-semibold text-zinc-900 leading-snug">{q.question_text}</p>
              </div>
              {/* My Answer */}
              {q.user_answer && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">My Answer</p>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">{q.user_answer}</p>
                </div>
              )}
              {/* AI Feedback */}
              {q.ai_feedback && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">AI Feedback</p>
                  <p className="text-xs text-zinc-600 leading-relaxed">{q.ai_feedback}</p>
                </div>
              )}
              <p className="text-[9px] text-zinc-400 font-medium mt-auto">
                Saved {new Date(q.saved_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
