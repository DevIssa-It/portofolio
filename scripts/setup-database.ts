/**
 * Setup Script: Create Neon Database Tables
 */

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function createTables() {
  console.log('🚀 Creating database tables...\n');

  try {
    // Test connection
    await sql`SELECT 1`;
    console.log('✅ Connected to Neon database\n');

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
    console.log('✅ Project table created');

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
    console.log('✅ Education table created');

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
    console.log('✅ Experience table created\n');

    console.log('🎉 All tables created successfully!');
    console.log('\n📝 Next step: Run "npm run migrate-data" to import data from JSON files');
  } catch (error) {
    console.error('❌ Failed to create tables:', error);
    process.exit(1);
  }
}

createTables();
