const BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1')
  : 'http://localhost:8000/api/v1';

export interface User {
  email: string;
  name?: string;
  surname?: string;
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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const fullUrl = `${BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(token ? { Authorization: `Token ${token}` } : {}),
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

  if (res.status === 204) {
    console.groupEnd();
    return null as T;
  }

  let data: any;
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
    const message =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      (Object.values(data as Record<string, unknown[]>)?.[0] as unknown[])?.[0] as string ||
      'Something went wrong';
    throw new Error(message);
  }

  return data as T;
}

/* --- Authentication API --- */

export interface LoginResponse {
  token: string;
  user?: User;
}

export async function login({ email, password }: Record<string, string>): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout(): Promise<null> {
  return request<null>('/auth/logout/', { method: 'POST' });
}

export async function register({ email, password, name, surname }: Record<string, string>): Promise<any> {
  return request<any>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, surname }),
  });
}

export async function getMe(): Promise<User> {
  return request<User>('/auth/me/', { method: 'GET' });
}

/* --- Interviews API --- */

export async function listInterviews(): Promise<Interview[]> {
  return request<Interview[]>('/interviews/', { method: 'GET' });
}

export interface CreateInterviewParams {
  agent_id: number;
  job_description?: string | null;
  number_of_questions?: number;
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

export async function startInterview(id: string): Promise<any> {
  return request<any>(`/interviews/${id}/start/`, { method: 'POST' });
}

export async function completeInterview(id: string): Promise<any> {
  return request<any>(`/interviews/${id}/complete/`, { method: 'POST' });
}
