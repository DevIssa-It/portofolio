export interface ContactInquiry {
  id: string
  name: string
  email: string
  company?: string
  roleType?: string
  message: string
  status: 'unread' | 'read' | 'replied'
  createdAt: string
}

export type CreateInquiryInput = Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>
