import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json')

// Helper function to read projects
function getProjects() {
  const fileContents = fs.readFileSync(projectsFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write projects
function saveProjects(projects: any[]) {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2))
}

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST - Add new project (Protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const projects = getProjects()
    
    const newProject = {
      id: Date.now().toString(),
      ...body,
    }

    projects.push(newProject)
    saveProjects(projects)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

// PUT - Update project (Protected)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const projects = getProjects()
    
    const index = projects.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...updateData }
    saveProjects(projects)

    return NextResponse.json(projects[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE - Delete project (Protected)
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    const projects = getProjects()
    const filteredProjects = projects.filter((p: any) => p.id !== id)

    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    saveProjects(filteredProjects)
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
