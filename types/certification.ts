export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
  credentialUrl?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateCertificationInput = Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCertificationInput = Partial<CreateCertificationInput> & { id: string }
