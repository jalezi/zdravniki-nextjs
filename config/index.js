export const NEXT_URL =
  process.env.VERCEL_URL ??
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  'http://localhost:3000';

export const BASE_URL = NEXT_URL.includes('http')
  ? NEXT_URL
  : `https://${NEXT_URL}`;
