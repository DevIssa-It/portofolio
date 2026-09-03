/**
 * Project Client Service
 * Handles HTTP requests from UI components using a DRY apiRequest utility.
 * Consumes canonical types from @/types/project (SSOT).
 */

import { API_ENDPOINTS } from '@/lib/constants/api'
import {
  Project,
  ApiResponse,
  SyncResult,
  CreateProjectInput,
  UpdateProjectInput,
} from '@/types/project'

export type { Project }

async function apiRequest<T>(
  url: string,
  options?: RequestInit,
  fallbackErrorMessage = 'Request failed'
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.error || fallbackErrorMessage)
    }

    return { success: true, data }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : fallbackErrorMessage
    console.error(`[API Error] ${url}:`, message)
    return { success: false, error: message }
  }
}

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  return apiRequest<Project[]>(
    API_ENDPOINTS.PROJECTS.BASE,
    undefined,
    'Failed to load projects'
  )
}

export async function createProject(
  project: CreateProjectInput
): Promise<ApiResponse<Project>> {
  return apiRequest<Project>(
    API_ENDPOINTS.PROJECTS.BASE,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    },
    'Failed to create project'
  )
}

export async function updateProject(
  project: UpdateProjectInput
): Promise<ApiResponse<Project>> {
  return apiRequest<Project>(
    API_ENDPOINTS.PROJECTS.BASE,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    },
    'Failed to update project'
  )
}

export async function deleteProject(id: string): Promise<ApiResponse<void>> {
  return apiRequest<void>(
    `${API_ENDPOINTS.PROJECTS.BASE}?id=${id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    },
    'Failed to delete project'
  )
}

export async function uploadProjectImage(
  file: File
): Promise<ApiResponse<string>> {
  const formData = new FormData()
  formData.append('image', file)

  const res = await apiRequest<{ path: string }>(
    API_ENDPOINTS.PROJECTS.UPLOAD_IMAGE,
    { method: 'POST', body: formData },
    'Failed to upload image'
  )

  return {
    success: res.success,
    data: res.data?.path,
    error: res.error,
  }
}

export async function syncGithubProjects(
  username?: string
): Promise<ApiResponse<SyncResult>> {
  return apiRequest<SyncResult>(
    API_ENDPOINTS.GITHUB.SYNC,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(username ? { username } : {}),
    },
    'Failed to synchronize with GitHub'
  )
}
