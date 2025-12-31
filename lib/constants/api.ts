/**
 * API Endpoints Constants
 * Centralized API URLs for consistent access across the application
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
  },
  
  // Project endpoints
  PROJECTS: {
    BASE: '/api/projects',
    UPLOAD_IMAGE: '/api/projects/upload',
  },
  
  // Education endpoints
  EDUCATION: {
    BASE: '/api/education',
  },
  
  // Experience endpoints
  EXPERIENCE: {
    BASE: '/api/experience',
  },
} as const

// API Routes
export const ROUTES = {
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin-dashboard',
  SETTINGS: '/settings',
} as const
