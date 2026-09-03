/**
 * Setup Script: Create Neon Database Tables
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

async function createTables() {
  console.log('[INFO] Creating database tables...\n');

  try {
    // Test connection
    await sql`SELECT 1`;
    console.log('[SUCCESS] Connected to Neon database\n');

    // Create Project table
    await sql`
      CREATE TABLE IF NOT EXISTS "Project" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT DEFAULT '',
        technologies TEXT[] DEFAULT '{}',
        tags TEXT[] DEFAULT '{}',
        github TEXT DEFAULT '',
        demo TEXT DEFAULT '',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('[SUCCESS] Project table created');

    // Create Education table
    await sql`
      CREATE TABLE IF NOT EXISTS "Education" (
        id TEXT PRIMARY KEY,
        school TEXT NOT NULL,
        degree TEXT NOT NULL,
        year TEXT NOT NULL,
        description TEXT DEFAULT '',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('[SUCCESS] Education table created');

    // Create Experience table
    await sql`
      CREATE TABLE IF NOT EXISTS "Experience" (
        id TEXT PRIMARY KEY,
        company TEXT NOT NULL,
        role TEXT NOT NULL,
        year TEXT NOT NULL,
        description TEXT DEFAULT '',
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('[SUCCESS] Experience table created\n');

    console.log('[SUCCESS] All tables created successfully.');
    console.log('\n[INFO] Next step: Run "npm run migrate-data" to import data from JSON files');
  } catch (error) {
    console.error('[ERROR] Failed to create tables:', error);
    process.exit(1);
  }
}

createTables();
