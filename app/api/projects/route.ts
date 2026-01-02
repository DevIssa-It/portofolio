import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql, isDatabaseAvailable } from '@/lib/db'
import fs from 'fs'
import path from 'path'

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json')

// Helper function to read projects from JSON (fallback)
function getProjectsFromJSON() {
  const fileContents = fs.readFileSync(projectsFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write projects to JSON (fallback)
function saveProjectsToJSON(projects: any[]) {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2))
}

// GET - Fetch all projects
export async function GET() {
  try {
    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const projects = await sql`
        SELECT * FROM "Project" 
        ORDER BY "createdAt" DESC
      `
      return NextResponse.json(projects)
    }
    
    // Fallback to JSON
    const projects = getProjectsFromJSON()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST - Create new project (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, image, technologies = [], tags = [], github, demo } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        INSERT INTO "Project" (
          id, title, description, image, technologies, tags, github, demo, "createdAt", "updatedAt"
        )
        VALUES (
          gen_random_uuid()::text, 
          ${title}, 
          ${description}, 
          ${image || ''}, 
          ${technologies}, 
          ${tags}, 
          ${github || ''}, 
          ${demo || ''}, 
          NOW(), 
          NOW()
        )
        RETURNING *
      `
      return NextResponse.json(result[0], { status: 201 })
    }

    // Fallback to JSON
    const projects = getProjectsFromJSON()
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      image: image || '',
      technologies,
      tags,
      github: github || '',
      demo: demo || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    projects.unshift(newProject)
    saveProjectsToJSON(projects)
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

// PUT - Update existing project (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, description, image, technologies = [], tags = [], github, demo } = body

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'ID, title, and description are required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        UPDATE "Project"
        SET 
          title = ${title}, 
          description = ${description}, 
          image = ${image || ''}, 
          technologies = ${technologies}, 
          tags = ${tags}, 
          github = ${github || ''}, 
          demo = ${demo || ''}, 
          "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      return NextResponse.json(result[0])
    }

    // Fallback to JSON
    const projects = getProjectsFromJSON()
    const projectIndex = projects.findIndex((p: any) => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      title,
      description,
      image: image || '',
      technologies,
      tags,
      github: github || '',
      demo: demo || '',
      updatedAt: new Date().toISOString(),
    }
    saveProjectsToJSON(projects)
    return NextResponse.json(projects[projectIndex])
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE - Delete a project (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const useDatabase = await isDatabaseAvailable()
    
    if (useDatabase) {
      const result = await sql`
        DELETE FROM "Project"
        WHERE id = ${id}
        RETURNING *
      `
      if (result.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      return NextResponse.json({ message: 'Project deleted successfully' })
    }

    // Fallback to JSON
    const projects = getProjectsFromJSON()
    const filteredProjects = projects.filter((p: any) => p.id !== id)
    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    saveProjectsToJSON(filteredProjects)
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
