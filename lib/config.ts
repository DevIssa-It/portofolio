/**
 * Application Configuration
 * Single Source of Truth for environment and integration settings
 */

export const APP_CONFIG = {
  github: {
    defaultUsername: process.env.GITHUB_USERNAME || 'DevIssa-It',
    apiToken: process.env.GITHUB_TOKEN || '',
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    requiredTopic: process.env.GITHUB_REQUIRED_TOPIC || '',
    apiBaseUrl: 'https://api.github.com',
  },
  database: {
    isConfigured: Boolean(process.env.DATABASE_URL),
  },
} as const
