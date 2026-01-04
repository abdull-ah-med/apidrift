export const ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',

  // Google OAuth
  GOOGLE_OAUTH_CALLBACK: '/api/google-oauth/callback',
  GOOGLE_OAUTH_COMPLETE_SIGNUP: '/api/google-oauth/complete-signup',

  // Profile
  PROFILE: '/api/profile',

  // Health
  HEALTH: '/api/health',
} as const;
