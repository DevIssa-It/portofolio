import { ProjectCategory } from '@/types/project'

export interface CategorizeProjectParams {
  title: string
  description?: string
  technologies?: string[]
  tags?: string[]
  topics?: string[]
  demo?: string
}

const ENTERPRISE_KEYWORDS = [
  'erp',
  'sales',
  'pos',
  'crm',
  'inventory',
  'billing',
  'kasir',
  'toko',
  'usaha',
  'company',
  'enterprise',
  'finance',
  'accounting',
  'management',
  'hris',
  'payroll',
  'booking',
  'transaksi',
  'order',
  'procurement',
  'event management',
]

const API_TOOL_KEYWORDS = [
  'api',
  'cli',
  'sdk',
  'bot',
  'crawler',
  'scraper',
  'backend',
  'express',
  'nest',
  'nestjs',
  'fastapi',
  'tool',
  'devtools',
  'service',
  'microservice',
  'rest',
  'graphql',
  'docker',
  'utility',
  'generator',
  'parser',
  'compiler',
  'cron',
  'daemon',
]

const OPEN_SOURCE_COMMUNITY_KEYWORDS = [
  'game',
  'board game',
  'community',
  'portal',
  'template',
  'starter',
  'boilerplate',
  'library',
  'component library',
  'ecosystem',
  'showcase',
  'playground',
  'curated',
  'awesome',
]

/**
 * Automatically determine the most accurate ProjectCategory based on metadata
 */
export function determineProjectCategory(params: CategorizeProjectParams): ProjectCategory {
  const combinedText = [
    params.title || '',
    params.description || '',
    ...(params.tags || []),
    ...(params.topics || []),
  ]
    .join(' ')
    .toLowerCase()

  const techList = (params.technologies || []).map((t) => t.toLowerCase())

  // Rule 1: Enterprise & Business Management / ERP
  const hasEnterpriseKeyword = ENTERPRISE_KEYWORDS.some((kw) =>
    new RegExp(`\\b${kw}\\b`, 'i').test(combinedText) || combinedText.includes(kw)
  )
  if (hasEnterpriseKeyword) {
    return 'enterprise'
  }

  // Rule 2: APIs, Tools, CLI, & Backend Services
  const hasApiKeyword = API_TOOL_KEYWORDS.some((kw) =>
    new RegExp(`\\b${kw}\\b`, 'i').test(combinedText) || combinedText.includes(kw)
  )
  const isPureBackendTech = techList.some((t) =>
    ['node.js', 'express', 'nestjs', 'go', 'python', 'fastapi', 'docker'].includes(t)
  )
  const hasFrontendTech = techList.some((t) =>
    ['next.js', 'react.js', 'vue.js', 'tailwind css', 'html', 'svelte', 'framer motion'].includes(t)
  )

  if (hasApiKeyword && (!hasFrontendTech || !params.demo)) {
    return 'api-tool'
  }

  // Rule 3: Games, Community Portals, Starters (Open Source)
  const hasOpenSourceKeyword = OPEN_SOURCE_COMMUNITY_KEYWORDS.some((kw) =>
    combinedText.includes(kw)
  )
  if (hasOpenSourceKeyword) {
    return 'open-source'
  }

  // Rule 4: Web Applications (Live interactive web apps)
  if (hasFrontendTech || (params.demo && params.demo !== '#')) {
    return 'web-app'
  }

  // Default fallback for public repositories
  return 'open-source'
}
