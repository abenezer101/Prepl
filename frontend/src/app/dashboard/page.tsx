"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase, Session } from '@/lib/supabase';
import { Interview } from '@/lib/api';
import StatsGrid from '@/components/dashboard/StatsGrid';
import SessionList from '@/components/dashboard/SessionList';
import NewSessionModal from '@/components/dashboard/NewSessionModal';

// Map Supabase Session → Interview shape expected by existing StatsGrid/SessionList
function sessionToInterview(s: Session): Interview {
  return {
    id: s.id,
    status: s.status,
    created_at: s.created_at,
    completed_at: s.completed_at ?? undefined,
    number_of_questions: 0,
    job_description: s.job_description ?? undefined,
    overall_score: s.overall_score ?? undefined,
    agent: s.agent_name ? { name: s.agent_name } : undefined,
  };
}

export default function DashboardPage() {
  const { userName, isLoading: authLoading } = useAuth();
  const [sessions,       setSessions]       = useState<Session[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [isModalOpen,    setIsModalOpen]    = useState(false);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setSessions([]); return; }

      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data ?? []);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) fetchSessions();
  }, [authLoading, fetchSessions]);

  // Listen for sidebar "New Session" events
  useEffect(() => {
    function handleNewSession() { setIsModalOpen(true); }
    window.addEventListener('dashboard:new-session', handleNewSession);
    return () => window.removeEventListener('dashboard:new-session', handleNewSession);
  }, []);

  const interviews: Interview[] = sessions.map(sessionToInterview);

  return (
    <div className="px-4 pt-2 pb-2 lg:px-6 lg:pt-3 lg:pb-4 w-full">

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Welcome, {userName}!
        </h1>
      </div>

      <div className="space-y-8">
        <StatsGrid interviews={interviews} />
        <SessionList
          interviews={interviews}
          loading={loading}
          onNewSession={() => setIsModalOpen(true)}
        />
      </div>

      <NewSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSessionCreated={fetchSessions}
      />
    </div>
  );
}
