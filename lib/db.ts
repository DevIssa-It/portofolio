import { neon } from '@neondatabase/serverless';

// Neon serverless SQL client
export const sql = neon(process.env.DATABASE_URL!);

// Helper to check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.log('Database not available, using JSON fallback');
    return false;
  }
}
