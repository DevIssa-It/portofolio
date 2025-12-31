/**
 * Experience Service
 * Handles all experience-related API calls
 */

import { API_ENDPOINTS } from '@/lib/constants/api'

export interface Experience {
  id: string
  company: string
  role: string
  year: string
  description: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Fetch all experience
 */
export async function getExperience(): Promise<ApiResponse<Experience[]>> {
  try {
    const response = await fetch(API_ENDPOINTS.EXPERIENCE.BASE, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch experience')
    }
    
    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching experience:', error)
    return {
      success: false,
      error: 'Failed to load experience',
    }
  }
}

/**
 * Create a new experience
 */
export async function createExperience(experience: Omit<Experience, 'id'>): Promise<ApiResponse<Experience>> {
  try {
    const response = await fetch(API_ENDPOINTS.EXPERIENCE.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    })

    if (!response.ok) {
      throw new Error('Failed to create experience')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error creating experience:', error)
    return {
      success: false,
      error: 'Failed to create experience',
    }
  }
}

/**
 * Update an existing experience
 */
export async function updateExperience(experience: Experience): Promise<ApiResponse<Experience>> {
  try {
    const response = await fetch(API_ENDPOINTS.EXPERIENCE.BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    })

    if (!response.ok) {
      throw new Error('Failed to update experience')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error updating experience:', error)
    return {
      success: false,
      error: 'Failed to update experience',
    }
  }
}

/**
 * Delete an experience
 */
export async function deleteExperience(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_ENDPOINTS.EXPERIENCE.BASE}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete experience')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting experience:', error)
    return {
      success: false,
      error: 'Failed to delete experience',
    }
  }
}
