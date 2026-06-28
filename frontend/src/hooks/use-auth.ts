"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  userName: string;
  userEmail: string;
  isLoading: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    userName: '',
    userEmail: '',
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/signin');
      return;
    }

    setState({
      userName: localStorage.getItem('userName') || 'User',
      userEmail: localStorage.getItem('userEmail') || '',
      isLoading: false,
    });
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.replace('/signin');
  }

  return { ...state, handleLogout };
}
