/**
 * Project Service
 * Handles all project-related API calls
 */

import { API_ENDPOINTS } from '@/lib/constants/api'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Fetch all projects
 */
export async function getProjects(): Promise<ApiResponse<Project[]>> {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS.BASE)
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return {
      success: false,
      error: 'Failed to load projects',
    }
  }
}

/**
 * Create a new project
 */
export async function createProject(project: Omit<Project, 'id'>): Promise<ApiResponse<Project>> {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...project,
        id: Date.now().toString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create project')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error creating project:', error)
    return {
      success: false,
      error: 'Failed to create project',
    }
  }
}

/**
 * Update an existing project
 */
export async function updateProject(project: Project): Promise<ApiResponse<Project>> {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS.BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      throw new Error('Failed to update project')
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error updating project:', error)
    return {
      success: false,
      error: 'Failed to update project',
    }
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS.BASE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete project')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return {
      success: false,
      error: 'Failed to delete project',
    }
  }
}

/**
 * Upload project image
 */
export async function uploadProjectImage(file: File): Promise<ApiResponse<string>> {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(API_ENDPOINTS.PROJECTS.UPLOAD_IMAGE, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()

    return {
      success: true,
      data: data.path, // Return the image path
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return {
      success: false,
      error: 'Failed to upload image',
    }
  }
}
