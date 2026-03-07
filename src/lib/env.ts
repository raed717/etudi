// Environment variable validation
// Throws at build time if required env vars are missing

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  // App
  NODE_ENV: process.env.NODE_ENV ?? "development",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  // Database — uncomment when wired up
  // DATABASE_URL: requireEnv("DATABASE_URL"),

  // Auth — uncomment when wired up
  // AUTH_SECRET: requireEnv("AUTH_SECRET"),
} as const;
