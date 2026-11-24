const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
    requestId?: string;
  };
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('aigurukul_access_token');
      if (token && !headers['Authorization'] && !headers['authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch {
      // Ignore localStorage access errors
    }
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Includes HttpOnly cookies (access_token & refresh_token)
    });

    const json = (await res.json().catch(() => null)) as ApiResponse<T>;

    if (!res.ok) {
      if (res.status === 401 && typeof window !== 'undefined') {
        try {
          localStorage.removeItem('aigurukul_access_token');
          localStorage.removeItem('aigurukul_user');
        } catch {
          // ignore
        }
      }
      return {
        success: false,
        error: json?.error || {
          code: res.status === 401 ? 'UNAUTHORIZED' : 'HTTP_ERROR',
          message: (json as any)?.message || `Request failed with status ${res.status}`,
        },
      };
    }

    return json || { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Unable to connect to AI Gurukul API server',
      },
    };
  }
}
