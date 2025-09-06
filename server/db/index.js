import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

// Create SQL query function using the connection string from environment variables
const sql = neon(process.env.DATABASE_URL);

// Test database connection
async function testConnection() {
  try {
    const result = await sql`SELECT version()`;
    console.log('Database connection successful!');
    console.log('PostgreSQL version:', result[0].version);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export { sql, testConnection };