export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BACKEND_URL = API_URL.replace('/api', '');

export interface ApiResponse<T = any> {
  data?: T;
  success?: boolean;
  error?: string;
  status: number;
  errors?: Record<string, string[]>;
}

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  // Ensure endpoints start with a slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${path}`;

  // Check if we need to fetch CSRF cookie first for mutating requests
  const isMutatingRequest = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method || 'GET');
  if (typeof window !== 'undefined' && isMutatingRequest) {
    // Only fetch CSRF on client side, Server Components don't typically need CSRF for APIs if strictly server-to-server
    // but Next.js Server Actions doing mutations might. We'll rely on Sanctum's stateful middleware.
    try {
      await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include'
      });
    } catch (e) {
      console.warn("Could not fetch CSRF cookie", e);
    }
  }

  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Always include cookies for session persistence
  };

  if (typeof window === 'undefined') {
    // We are on the server side in Next.js. We need to manually forward the cookies to Laravel.
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const cookieString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
      if (cookieString) {
        defaultOptions.headers = {
          ...defaultOptions.headers,
          'Cookie': cookieString,
        };
      }
    } catch (e) {
      // Ignore if next/headers is not available
    }
  }

  // If it's not FormData, default to application/json
  if (!(options.body instanceof FormData)) {
    defaultOptions.headers = {
      'Content-Type': 'application/json',
      ...defaultOptions.headers,
    };
  }

  try {
    const res = await fetch(url, defaultOptions);

    if (res.status === 204) {
      return { success: true, status: 204 };
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Handle standard Laravel error responses
      let errorMessage = data.message || 'API Error';
      
      if (res.status === 419) errorMessage = 'Session expired. Please refresh.';
      if (res.status === 401) errorMessage = 'Not quite 💜 Try our special date.';
      if (res.status === 403) errorMessage = 'Forbidden.';
      if (res.status === 429) errorMessage = 'Too many attempts. Try again later.';
      if (res.status >= 500) errorMessage = 'Backend service unavailable.';

      return { 
        error: errorMessage,
        status: res.status,
        errors: data.errors 
      };
    }

    // Sometimes Laravel resources wrap data in 'data' key
    return { 
      data: data.data !== undefined ? data.data : data, 
      status: res.status 
    };
  } catch (error: any) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    return { error: error.message || 'Network error', status: 500 };
  }
}
