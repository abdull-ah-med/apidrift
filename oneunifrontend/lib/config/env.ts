// Environment configuration for type safety and reusability

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5162',
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;
