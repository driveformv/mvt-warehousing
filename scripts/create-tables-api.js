#!/usr/bin/env node

// Script to create tables in Supabase using the Management API
// Usage: node scripts/create-tables-api.js

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for admin operations
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGx0cmZqZnpjeGZpcXJ6bG5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDM0MTcwNywiZXhwIjoyMDU5OTE3NzA3fQ.8T60XHCrJmzEZiE5sRPtp-CULtPK3nbr6XSLcYU42JI';

if (!supabaseUrl) {
  console.error('Error: Supabase URL not found in .env.local file');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL is set');
  process.exit(1);
}

// Function to execute SQL query
async function executeSQL(sql) {
  console.log(`Executing SQL: ${sql.substring(0, 50)}...`);
  
  try {
    const response = await axios.post(`${supabaseUrl}/rest/v1/`, {
      query: sql
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Prefer': 'return=minimal'
      }
    });
    
    console.log('SQL executed successfully');
    return true;
  } catch (error) {
    if (error.response) {
      console.error('Error executing SQL:', error.response.data);
    } else {
      console.error('Error executing SQL:', error.message);
    }
    return false;
  }
}

async function createTables() {
  try {
    console.log('Creating tables in Supabase...');
    
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'supabase/migrations/20250410_create_tables.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      await executeSQL(statement);
    }
    
    console.log('Tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

createTables();
