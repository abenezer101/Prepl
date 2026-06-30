import { supabase, getAccessToken } from '@/lib/supabase';

const BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1')
  : 'http://localhost:8000/api/v1';

// ── Types ────────────────────────────────────────────────────────────────────

export interface User {
  email: string;
  name?: string;
  id?: string;
}

export interface Interview {
  id: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  completed_at?: string;
  number_of_questions: number;
  job_description?: string;
  overall_score?: number;
  agent?: {
    name: string;
    prompt?: string;
  };
  qa_pairs?: Array<{
    id?: string;
    order?: number;
    question?: string | { text: string };
  }>;
}

// ── Core request helper ───────────────────────────────────────────────────────

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Always use the Supabase access token — never the old fake localStorage token
  const accessToken = await getAccessToken();
  const fullUrl = `${BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  console.group(`🌐 API Request: ${options.method ?? 'GET'} ${fullUrl}`);
  if (options.body) {
    try {
      console.log('Body:', JSON.parse(options.body as string));
    } catch {
      console.log('Body (raw):', options.body);
    }
  }

  let res: Response;
  try {
    res = await fetch(fullUrl, { ...options, headers });
  } catch (networkErr) {
    console.error('❌ Network error (fetch failed — server unreachable or CORS blocked):', networkErr);
    console.groupEnd();
    throw new Error('Failed to reach the server. Check your network or connection.');
  }

  console.log(`Response status: ${res.status} ${res.statusText}`);

  // 401 = expired/invalid token — sign out and redirect
  if (res.status === 401) {
    console.warn('⚠️ 401 Unauthorized — signing out');
    console.groupEnd();
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      window.location.href = '/signin';
    }
    throw new Error('Session expired. Please sign in again.');
  }

  if (res.status === 204) {
    console.groupEnd();
    return null as T;
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch (parseErr) {
    console.error('❌ Failed to parse JSON response:', parseErr);
    console.groupEnd();
    throw new Error('Unexpected response from server (not JSON).');
  }

  console.log('Response data:', data);
  console.groupEnd();

  if (!res.ok) {
    const errData = data as Record<string, unknown>;
    const message =
      (errData?.detail as string) ||
      ((errData?.non_field_errors as string[])?.[0]) ||
      ((Object.values(errData)?.[0] as string[])?.[0]) ||
      'Something went wrong';
    throw new Error(message);
  }

  return data as T;
}

// ── Authentication ────────────────────────────────────────────────────────────

export async function getMe(): Promise<User> {
  return request<User>('/auth/me');
}

// ── Sessions API ──────────────────────────────────────────────────────────────

export interface CreateSessionParams {
  job_description?: string | null;
  session_type: 'star_conversational' | 'behavioral_deep_dive';
}

export interface CreateSessionResponse {
  session_id: string;
  livekit_token: string;
  livekit_url: string;
  room_name: string;
}

export async function createSession(params: CreateSessionParams): Promise<CreateSessionResponse> {
  return request<CreateSessionResponse>('/sessions/create', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function completeSession(sessionId: string): Promise<void> {
  return request<void>(`/sessions/${sessionId}/complete`, { method: 'POST' });
}

// ── Legacy Interview API (kept for backward compat during migration) ──────────

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface CreateInterviewParams {
  agent_id: number;
  job_description?: string | null;
  number_of_questions?: number;
}

export async function listInterviews(): Promise<Interview[]> {
  return request<Interview[]>('/interviews/', { method: 'GET' });
}

export async function createInterview({ agent_id, job_description, number_of_questions }: CreateInterviewParams): Promise<Interview> {
  return request<Interview>('/interviews/', {
    method: 'POST',
    body: JSON.stringify({ agent_id, job_description, number_of_questions }),
  });
}

export async function getInterview(id: string): Promise<Interview> {
  return request<Interview>(`/interviews/${id}/`, { method: 'GET' });
}

export async function startInterview(id: string): Promise<unknown> {
  return request<unknown>(`/interviews/${id}/start/`, { method: 'POST' });
}

export async function completeInterview(id: string): Promise<unknown> {
  return request<unknown>(`/interviews/${id}/complete/`, { method: 'POST' });
}
