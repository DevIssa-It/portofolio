import { API_ENDPOINTS } from '@/lib/constants/api'
import { Certification, CreateCertificationInput } from '@/types/certification'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function getCertifications(): Promise<ApiResponse<Certification[]>> {
  try {
    const res = await fetch(API_ENDPOINTS.CERTIFICATIONS.BASE, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch certifications')
    const data = await res.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return { success: false, error: 'Failed to load certifications' }
  }
}

export async function createCertification(cert: CreateCertificationInput): Promise<ApiResponse<Certification>> {
  try {
    const res = await fetch(API_ENDPOINTS.CERTIFICATIONS.BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cert),
    })
    if (!res.ok) throw new Error('Failed to create certification')
    const data = await res.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error creating certification:', error)
    return { success: false, error: 'Failed to create certification' }
  }
}

export async function updateCertification(cert: Certification): Promise<ApiResponse<Certification>> {
  try {
    const res = await fetch(API_ENDPOINTS.CERTIFICATIONS.BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cert),
    })
    if (!res.ok) throw new Error('Failed to update certification')
    const data = await res.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error updating certification:', error)
    return { success: false, error: 'Failed to update certification' }
  }
}

export async function deleteCertification(id: string): Promise<ApiResponse<boolean>> {
  try {
    const res = await fetch(`${API_ENDPOINTS.CERTIFICATIONS.BASE}?id=${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete certification')
    return { success: true, data: true }
  } catch (error) {
    console.error('Error deleting certification:', error)
    return { success: false, error: 'Failed to delete certification' }
  }
}
