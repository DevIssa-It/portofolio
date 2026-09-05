import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'
import { determineProjectCategory } from '../lib/utils/project-categorizer'
import { Project } from '../types/project'

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (match) {
      let value = match[2] || ''
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (!process.env[match[1]]) {
        process.env[match[1]] = value.trim()
      }
    }
  }
}

async function reclassifyProjects() {
  console.log('[INFO] Reclassifying projects using smart heuristics...\n')

  const projectsPath = path.join(process.cwd(), 'data', 'projects.json')
  if (!fs.existsSync(projectsPath)) {
    console.error('[ERROR] data/projects.json not found')
    process.exit(1)
  }

  const projects: Project[] = JSON.parse(fs.readFileSync(projectsPath, 'utf8'))
  const updatedProjects: Project[] = []

  for (const p of projects) {
    // Determine category automatically
    const inferredCategory = determineProjectCategory({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      tags: p.tags,
      demo: p.demo,
    })

    const finalCategory = p.category && p.category !== 'open-source' ? p.category : inferredCategory
    console.log(`[PROJECT] "${p.title}" -> ${finalCategory} (was: ${p.category || 'none'})`)

    updatedProjects.push({
      ...p,
      category: finalCategory,
    })
  }

  // Save to data/projects.json
  fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2), 'utf8')
  console.log('\n[SUCCESS] data/projects.json updated successfully.')

  // Also update Neon DB if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL)
      console.log('[INFO] Updating Neon database Project rows...')

      for (const p of updatedProjects) {
        await sql`
          UPDATE "Project"
          SET 
            category = ${p.category || 'open-source'},
            role = ${p.role || ''},
            "problemStatement" = ${p.problemStatement || ''},
            "architectureSolution" = ${p.architectureSolution || ''},
            "keyMetrics" = ${p.keyMetrics || []},
            featured = ${!!p.featured}
          WHERE id = ${p.id}
        `
      }
      console.log('[SUCCESS] Neon database updated successfully.')
    } catch (dbError) {
      console.error('[WARN] Failed to update Neon DB:', dbError)
    }
  }
}

reclassifyProjects()
