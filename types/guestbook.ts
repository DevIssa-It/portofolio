/**
 * Domain Contract: Guestbook & Endorsements
 * Single Source of Truth (SSOT) for visitor recommendations
 */

export type GuestbookStatus = 'pending' | 'approved'

export interface GuestbookEntry {
  id: string
  name: string
  role?: string
  message: string
  avatarUrl?: string
  githubUsername?: string
  status: GuestbookStatus
  createdAt: string
}

export interface CreateGuestbookInput {
  name: string
  role?: string
  message: string
  githubUsername?: string
}
