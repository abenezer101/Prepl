"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  isLoading: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    userName: '',
    userEmail: '',
    userAvatar: null,
    isLoading: true,
  });

  useEffect(() => {
    // 1. Get the current session immediately (no network round-trip)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/signin');
        return;
      }
      const user = session.user;
      setState({
        user,
        session,
        userName:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'User',
        userEmail: user.email ?? '',
        userAvatar: user.user_metadata?.avatar_url ?? null,
        isLoading: false,
      });
    });

    // 2. Subscribe to future auth changes (token refresh, sign-out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setState({
          user: null,
          session: null,
          userName: '',
          userEmail: '',
          userAvatar: null,
          isLoading: false,
        });
        router.replace('/signin');
        return;
      }
      const user = session.user;
      setState({
        user,
        session,
        userName:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'User',
        userEmail: user.email ?? '',
        userAvatar: user.user_metadata?.avatar_url ?? null,
        isLoading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace('/signin');
  }, [router]);

  return { ...state, handleLogout };
}
