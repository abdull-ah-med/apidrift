import { env } from '@/lib/config/env';
import { ENDPOINTS } from '@/lib/api/endpoint';

// ============ Types ============

export type Role = 'student' | 'mentor';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface CompleteSignupPayload {
  role: Role;
}

export interface CompleteSignupResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// ============ API Functions ============

/**
 * Register a new user with email/password.
 */
export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

/**
 * Login with email/password.
 */
export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

/**
 * Refresh access token using refresh token.
 */
export async function refreshToken(): Promise<AuthTokens> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.REFRESH}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
}

/**
 * Logout the current user.
 */
export async function logout(): Promise<void> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.LOGOUT}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

/**
 * Get the current authenticated user.
 */
export async function getMe(): Promise<User> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.ME}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  return response.json();
}

/**
 * Complete Google OAuth signup with role selection.
 */
export async function completeGoogleSignup(payload: CompleteSignupPayload): Promise<CompleteSignupResponse> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.GOOGLE_OAUTH_COMPLETE_SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signup completion failed' }));
    throw new Error(error.message || 'Signup completion failed');
  }

  return response.json();
}
