'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import { UserDTO, RegisterRequestDTO, LoginRequestDTO, AuthResponseData } from '@ai-gurukul/types';

const TOKEN_KEY = 'aigurukul_access_token';
const USER_KEY = 'aigurukul_user';
const AUTH_EVENT = 'aigurukul_auth_state_changed';

function getStoredUser(): UserDTO | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserDTO) : null;
  } catch {
    return null;
  }
}

function notifyAuthState(user: UserDTO | null) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { user } }));
  }
}

export function useAuth() {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Synchronize auth state on mount and subscribe to cross-component auth events
  useEffect(() => {
    // 1. Initial hydrate from localStorage immediately (no wait for network)
    const cached = getStoredUser();
    if (cached) {
      setUser(cached);
      setLoading(false);
    }

    // 2. Synchronize whenever another component (or tab) logs in / registers / logs out
    const handleAuthChange = () => {
      const current = getStoredUser();
      setUser(current);
    };

    window.addEventListener(AUTH_EVENT, handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    const cached = getStoredUser();

    // If there is no token and no cached user, seeker is unauthenticated
    if (!token && !cached) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const res = await apiClient<{ user: UserDTO }>('/auth/me');

    if (res.success && res.data?.user) {
      const activeUser = res.data.user;
      setUser(activeUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(activeUser));
      }
    } else {
      // If server explicitly returns Unauthorized or invalid token, clear expired credentials
      if (
        res.error?.code === 'UNAUTHORIZED' ||
        res.error?.code === 'AUTHENTICATION_ERROR' ||
        res.error?.message?.toLowerCase().includes('token')
      ) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          notifyAuthState(null);
        }
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async (dto: LoginRequestDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const res = await apiClient<AuthResponseData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    if (res.success && res.data?.user) {
      const authenticatedUser = res.data.user;
      if (typeof window !== 'undefined') {
        if (res.data.tokens?.accessToken) {
          localStorage.setItem(TOKEN_KEY, res.data.tokens.accessToken);
        }
        localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
        notifyAuthState(authenticatedUser);
      }
      setUser(authenticatedUser);
      setLoading(false);
      return true;
    } else {
      setError(res.error?.message || 'Authentication failed');
      setLoading(false);
      return false;
    }
  };

  const register = async (dto: RegisterRequestDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const res = await apiClient<AuthResponseData>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    if (res.success && res.data?.user) {
      const newUser = res.data.user;
      if (typeof window !== 'undefined') {
        if (res.data.tokens?.accessToken) {
          localStorage.setItem(TOKEN_KEY, res.data.tokens.accessToken);
        }
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        notifyAuthState(newUser);
      }
      setUser(newUser);
      setLoading(false);
      return true;
    } else {
      setError(res.error?.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors during logout
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      notifyAuthState(null);
    }
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    loading,
    error,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
  };
}
