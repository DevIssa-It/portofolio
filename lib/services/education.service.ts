/**
 * Education Service
 * Handles all education-related API calls
 */

import { API_ENDPOINTS } from '@/lib/constants/api'

export interface Education {
  id: string
  school: string
  degree: string
  year: string
  description: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Fetch all education
 */
export async function getEducation(): Promise<ApiResponse<Education[]>> {
  try {
    const response = await fetch(API_ENDPOINTS.EDUCATION.BASE, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch education')
    }
    
    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching education:', error)
    return {
      success: false,
      error: 'Failed to load education',
    }
  }
}

/**
 * Create a new education
 */
export async function createEducation(education: Omit<Education, 'id'>): Promise<ApiResponse<Education>> {
  try {
    const response = await fetch(API_ENDPOINTS.EDUCATION.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(education),
    })

    if (!response.ok) {
      throw new Error('Failed to create education')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error creating education:', error)
    return {
      success: false,
      error: 'Failed to create education',
    }
  }
}

/**
 * Update an existing education
 */
export async function updateEducation(education: Education): Promise<ApiResponse<Education>> {
  try {
    const response = await fetch(API_ENDPOINTS.EDUCATION.BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(education),
    })

    if (!response.ok) {
      throw new Error('Failed to update education')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error updating education:', error)
    return {
      success: false,
      error: 'Failed to update education',
    }
  }
}

/**
 * Delete an education
 */
export async function deleteEducation(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_ENDPOINTS.EDUCATION.BASE}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete education')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting education:', error)
    return {
      success: false,
      error: 'Failed to delete education',
    }
  }
}
