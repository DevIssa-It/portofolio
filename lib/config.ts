/**
 * Application Configuration
 * Single Source of Truth for environment and integration settings
 */

const defaultExcludedRepos = [
  'devissa-it',
  'skillswap',
  'swot',
  'books-management-api',
  'skills-introduction-to-github',
  'kalkulator-statistik-sederhana',
  'aplikasi-pendaftaran-mahasiswa-baru',
  'sd_learn_cgo_lab1',
  'lk-mvc',
  'praktisi_mengajar-permrograman_lanjut_2024',
  'skwnfrontenddev-1a-a.-issadurrofiq-jaya-utama',
  'skwnfrontenddev-1b-a-issadurrofiq-jaya-utama',
]

const envExcluded = process.env.GITHUB_EXCLUDED_REPOS
  ? process.env.GITHUB_EXCLUDED_REPOS.split(',').map((s) =>
      s.trim().toLowerCase()
    )
  : []

export const APP_CONFIG = {
  github: {
    defaultUsername: process.env.GITHUB_USERNAME || 'DevIssa-It',
    apiToken: process.env.GITHUB_TOKEN || '',
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    requiredTopic: process.env.GITHUB_REQUIRED_TOPIC || '',
    excludedRepos: Array.from(
      new Set([...defaultExcludedRepos, ...envExcluded])
    ),
    apiBaseUrl: 'https://api.github.com',
  },
  database: {
    isConfigured: Boolean(process.env.DATABASE_URL),
  },
} as const
