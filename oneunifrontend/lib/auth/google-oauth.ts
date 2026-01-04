import { env } from '@/lib/config/env';
import { ENDPOINTS } from '@/lib/api/endpoint';

/**
 * Builds the Google OAuth 2.0 authorization URL.
 * Redirects the user to Google's consent screen.
 */
export function getGoogleOAuthUrl(): string {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  
  const redirectUri = `${env.apiUrl}${ENDPOINTS.GOOGLE_OAUTH_CALLBACK}`;
  
  const params = new URLSearchParams({
    redirect_uri: redirectUri,
    client_id: env.googleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  });

  return `${baseUrl}?${params.toString()}`;
}
