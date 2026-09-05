/**
 * API Route: /api/resume
 * Handles CV / Resume metadata retrieval and administrative file update.
 * Strictly adheres to Clean Modular Architecture and Authentication Rules.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stat, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const RESUME_FILE_PATH = path.join(process.cwd(), 'public', 'resume.pdf')
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB max

// GET - Retrieve current resume metadata
export async function GET() {
  try {
    if (!existsSync(RESUME_FILE_PATH)) {
      return NextResponse.json({
        exists: false,
        filename: 'resume.pdf',
        path: '/resume.pdf',
        size: 0,
        updatedAt: null,
      })
    }

    const fileStat = await stat(RESUME_FILE_PATH)

    return NextResponse.json({
      exists: true,
      filename: 'resume.pdf',
      path: '/resume.pdf',
      size: fileStat.size,
      updatedAt: fileStat.mtime.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching resume metadata:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve resume metadata' },
      { status: 500 }
    )
  }
}

// POST - Upload and replace resume.pdf (Requires Admin Session)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file uploaded' },
        { status: 400 }
      )
    }

    // Validate PDF mime type and file extension
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      return NextResponse.json(
        { error: 'Invalid file format. Only PDF files (.pdf) are accepted.' },
        { status: 400 }
      )
    }

    // Validate maximum file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowable limit of 15MB.' },
        { status: 400 }
      )
    }

    // Convert file to Buffer and overwrite public/resume.pdf
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await writeFile(RESUME_FILE_PATH, buffer)

    return NextResponse.json({
      success: true,
      message: 'CV / Resume file successfully updated',
      filename: 'resume.pdf',
      path: '/resume.pdf',
      size: buffer.length,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating resume file:', error)
    return NextResponse.json(
      { error: 'Failed to upload and update resume file' },
      { status: 500 }
    )
  }
}
