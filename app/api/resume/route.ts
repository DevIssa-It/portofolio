/**
 * API Route: /api/resume
 * Handles CV / Resume metadata, binary streaming, and administrative updates.
 * Serverless-native persistence via Neon PostgreSQL.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql, isDatabaseAvailable } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

async function ensureTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "ResumeAsset" (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        data TEXT NOT NULL,
        size INTEGER NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `
  } catch (err) {
    console.warn('ResumeAsset table check failed:', err)
  }
}

// GET - Retrieve metadata or stream PDF file
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isDownload = searchParams.get('download') === 'true'

    const dbReady = await isDatabaseAvailable()
    if (!dbReady) {
      if (isDownload) {
        return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
      }
      return NextResponse.json({
        exists: false,
        filename: null,
        path: '/api/resume?download=true',
        size: 0,
        updatedAt: null,
      })
    }

    await ensureTable()
    const rows = await sql`SELECT * FROM "ResumeAsset" WHERE id = 'active_resume' LIMIT 1`

    if (rows.length === 0) {
      if (isDownload) {
        return NextResponse.json({ error: 'No resume document uploaded yet' }, { status: 404 })
      }
      return NextResponse.json({
        exists: false,
        filename: null,
        path: '/api/resume?download=true',
        size: 0,
        updatedAt: null,
      })
    }

    const row = rows[0]

    if (isDownload) {
      const buffer = Buffer.from(row.data, 'base64')
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${row.filename || 'resume.pdf'}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    }

    return NextResponse.json(
      {
        exists: true,
        filename: row.filename,
        path: '/api/resume?download=true',
        size: row.size,
        updatedAt: row.updatedAt,
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Upload and replace CV in Neon PostgreSQL
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 })
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      return NextResponse.json({ error: 'Invalid file format. Only PDF files (.pdf) are accepted.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds maximum limit of 15MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')

    const dbReady = await isDatabaseAvailable()
    if (!dbReady) {
      return NextResponse.json({ error: 'Database unavailable for storage' }, { status: 503 })
    }

    await ensureTable()
    await sql`
      INSERT INTO "ResumeAsset" (id, filename, data, size, "updatedAt")
      VALUES ('active_resume', ${file.name}, ${base64Data}, ${file.size}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        filename = EXCLUDED.filename,
        data = EXCLUDED.data,
        size = EXCLUDED.size,
        "updatedAt" = NOW()
    `

    return NextResponse.json({
      success: true,
      message: 'CV / Resume file successfully updated and live',
      filename: file.name,
      path: '/api/resume?download=true',
      size: file.size,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 })
  }
}
