/**
 * JSON File Storage Provider for Projects
 * Controlled fallback storage for offline or development environments.
 */

import fs from 'fs'
import path from 'path'
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from '@/types/project'

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json')

export class JsonProjectStorage {
  private read(): Project[] {
    try {
      if (!fs.existsSync(projectsFilePath)) return []
      const fileContents = fs.readFileSync(projectsFilePath, 'utf8')
      return JSON.parse(fileContents)
    } catch (error) {
      console.error('Error reading projects JSON file:', error)
      return []
    }
  }

  private write(projects: Project[]): void {
    try {
      const dir = path.dirname(projectsFilePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2))
    } catch (error) {
      console.error('Error writing projects JSON file:', error)
    }
  }

  async findAll(): Promise<Project[]> {
    return this.read()
  }

  async findById(id: string): Promise<Project | null> {
    const list = this.read()
    return list.find((p) => p.id === id) || null
  }

  async findByGithubUrl(githubUrl: string): Promise<Project | null> {
    const normalizedUrl = githubUrl.trim().toLowerCase().replace(/\/+$/, '')
    const list = this.read()
    return (
      list.find(
        (p) =>
          p.github &&
          p.github.trim().toLowerCase().replace(/\/+$/, '') === normalizedUrl
      ) || null
    )
  }

  async create(data: CreateProjectInput): Promise<Project> {
    const list = this.read()
    const now = new Date().toISOString()
    const newProject: Project = {
      id: data.id || Date.now().toString(),
      title: data.title,
      description: data.description,
      image: data.image || '',
      technologies: data.technologies || [],
      tags: data.tags || [],
      github: data.github || '',
      demo: data.demo || '',
      createdAt: now,
      updatedAt: now,
    }

    list.unshift(newProject)
    this.write(list)
    return newProject
  }

  async update(id: string, data: UpdateProjectInput): Promise<Project | null> {
    const list = this.read()
    const index = list.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updated: Project = {
      ...list[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    list[index] = updated
    this.write(list)
    return updated
  }

  async delete(id: string): Promise<boolean> {
    const list = this.read()
    const filtered = list.filter((p) => p.id !== id)
    if (filtered.length === list.length) return false

    this.write(filtered)
    return true
  }
}

export const jsonProjectStorage = new JsonProjectStorage()
