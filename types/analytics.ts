/**
 * Analytics & Event Tracking Domain Contracts
 * Single Source of Truth (SSOT) for portfolio interactions
 */

export type AnalyticsEventType =
  | 'demo_click'
  | 'github_click'
  | 'cv_download'
  | 'contact_copied'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  target?: string
  timestamp: string
}

export interface AnalyticsSummary {
  totalDemoClicks: number
  totalGithubClicks: number
  totalCvDownloads: number
  totalContactCopies: number
  totalEvents: number
  recentEvents: AnalyticsEvent[]
}
