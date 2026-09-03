/**
 * Migration Script: JSON to Neon Database
 * Simple migration using @neondatabase/serverless
 */

import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Load .env.local if not already in environment
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let value = match[2] || '';
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[match[1]]) {
          process.env[match[1]] = value.trim();
        }
      }
    }
  }
}

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error('[ERROR] DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('[INFO] Starting migration to Neon database...\n');

  try {
    // Test connection
    await sql`SELECT 1`;
    console.log('[SUCCESS] Connected to Neon database\n');

    // Read JSON files
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    const educationPath = path.join(process.cwd(), 'data', 'education.json');
    const experiencePath = path.join(process.cwd(), 'data', 'experience.json');

    // Migrate Projects
    if (fs.existsSync(projectsPath)) {
      const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
      console.log(`[INFO] Found ${projects.length} projects to migrate`);

      for (const project of projects) {
        await sql`
          INSERT INTO "Project" (id, title, description, image, technologies, tags, github, demo, "createdAt", "updatedAt")
          VALUES (
            ${project.id || Math.random().toString(36).substring(7)},
            ${project.title},
            ${project.description},
            ${project.image || ''},
            ${project.technologies || []},
            ${project.tags || []},
            ${project.github || ''},
            ${project.demo || ''},
            ${project.createdAt || new Date().toISOString()},
            ${project.updatedAt || new Date().toISOString()}
          )
          ON CONFLICT (id) DO NOTHING
        `;
      }
      console.log('[SUCCESS] Projects migrated successfully\n');
    }

    // Migrate Education
    if (fs.existsSync(educationPath)) {
      const education = JSON.parse(fs.readFileSync(educationPath, 'utf8'));
      console.log(`[INFO] Found ${education.length} education records to migrate`);

      for (const edu of education) {
        await sql`
          INSERT INTO "Education" (id, school, degree, year, description, "createdAt", "updatedAt")
          VALUES (
            ${edu.id || Math.random().toString(36).substring(7)},
            ${edu.school},
            ${edu.degree},
            ${edu.year},
            ${edu.description || ''},
            ${edu.createdAt || new Date().toISOString()},
            ${edu.updatedAt || new Date().toISOString()}
          )
          ON CONFLICT (id) DO NOTHING
        `;
      }
      console.log('[SUCCESS] Education migrated successfully\n');
    }

    // Migrate Experience
    if (fs.existsSync(experiencePath)) {
      const experience = JSON.parse(fs.readFileSync(experiencePath, 'utf8'));
      console.log(`[INFO] Found ${experience.length} experience records to migrate`);

      for (const exp of experience) {
        await sql`
          INSERT INTO "Experience" (id, company, role, year, description, "createdAt", "updatedAt")
          VALUES (
            ${exp.id || Math.random().toString(36).substring(7)},
            ${exp.company},
            ${exp.role},
            ${exp.year},
            ${exp.description || ''},
            ${exp.createdAt || new Date().toISOString()},
            ${exp.updatedAt || new Date().toISOString()}
          )
          ON CONFLICT (id) DO NOTHING
        `;
      }
      console.log('[SUCCESS] Experience migrated successfully\n');
    }

    // Verify migration
    const projectCount = await sql`SELECT COUNT(*) as count FROM "Project"`;
    const educationCount = await sql`SELECT COUNT(*) as count FROM "Education"`;
    const experienceCount = await sql`SELECT COUNT(*) as count FROM "Experience"`;

    console.log('[INFO] Migration Summary:');
    console.log(`   Projects: ${projectCount[0].count}`);
    console.log(`   Education: ${educationCount[0].count}`);
    console.log(`   Experience: ${experienceCount[0].count}\n`);

    console.log('[SUCCESS] Migration completed successfully.');
  } catch (error) {
    console.error('[ERROR] Migration failed:', error);
    process.exit(1);
  }
}

migrate();
