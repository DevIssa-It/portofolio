/**
 * API Route: /api/projects
 * Handles project CRUD operations by delegating to ProjectRepository.
 * Follows Clean Modular Architecture and Separation of Concerns (SoC).
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { projectRepository } from '@/lib/repositories/project.repository'

// GET - Retrieve all projects
export async function GET() {
  try {
    const projects = await projectRepository.findAll()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST - Create a new project (requires admin authentication)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, image, technologies = [], tags = [], github, demo } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const createdProject = await projectRepository.create({
      title,
      description,
      image: image || '',
      technologies,
      tags,
      github: github || '',
      demo: demo || '',
    })

    return NextResponse.json(createdProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PUT - Update an existing project (requires admin authentication)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, description, image, technologies, tags, github, demo } = body

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: 'ID, title, and description are required' },
        { status: 400 }
      )
    }

    const updatedProject = await projectRepository.update(id, {
      id,
      title,
      description,
      image,
      technologies,
      tags,
      github,
      demo,
    })

    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a project (requires admin authentication)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const deleted = await projectRepository.delete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
