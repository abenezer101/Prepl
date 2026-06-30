import { createBrowserClient } from '@supabase/ssr';

// ── Supabase browser client (PKCE enabled, session auto-refresh) ──────────────

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// ── Helper: get current authenticated user id ─────────────────────────────────

export async function getCurrentUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

// ── Helper: get bearer token for backend requests ─────────────────────────────

export async function getAccessToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

// ── Types matching the Supabase schema ────────────────────────────────────────

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  github_handle: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  agent_name: string | null;
  job_description: string | null;
  session_type: 'star_conversational' | 'behavioral_deep_dive' | null;
  status: 'pending' | 'in_progress' | 'completed';
  overall_score: number | null;
  role_knowledge_score: number | null;
  communication_score: number | null;
  problem_solving_score: number | null;
  behavioral_score: number | null;
  wpm_avg: number | null;
  transcript: string | null;
  created_at: string;
  completed_at: string | null;
  recommendations?: Recommendation[];
}

export interface Recommendation {
  id: string;
  session_id: string;
  category: string | null;
  recommendation: string | null;
  priority: number | null;
  created_at: string;
}

export interface VettedQuestion {
  id: string;
  user_id: string;
  session_id: string | null;
  question_text: string | null;
  user_answer: string | null;
  ai_feedback: string | null;
  saved_at: string;
}

export interface SavedSession {
  id: string;
  user_id: string;
  session_id: string;
  note: string | null;
  saved_at: string;
  session?: Session;
}
