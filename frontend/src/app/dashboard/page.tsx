"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { listInterviews, Interview } from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';
import StatsGrid from '@/components/dashboard/StatsGrid';
import SessionList from '@/components/dashboard/SessionList';
import NewSessionModal from '@/components/dashboard/NewSessionModal';

export default function DashboardPage() {
  const { userName, isLoading: authLoading } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInterviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listInterviews();
      setInterviews(Array.isArray(data) ? data : []);
    } catch {
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchInterviews();
    }
  }, [authLoading, fetchInterviews]);

  // Listen for sidebar "New Session" events from the layout
  useEffect(() => {
    function handleNewSession() {
      setIsModalOpen(true);
    }
    window.addEventListener('dashboard:new-session', handleNewSession);
    return () => window.removeEventListener('dashboard:new-session', handleNewSession);
  }, []);

  return (
    <div className="px-4 pt-2 pb-2 lg:px-6 lg:pt-3 lg:pb-4 w-full">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight">
        Welcome, {userName}!
      </h1>

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
        onSessionCreated={fetchInterviews}
      />
    </div>
  );
}
