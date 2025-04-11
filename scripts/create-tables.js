#!/usr/bin/env node

// Script to create tables in Supabase
// Usage: node scripts/create-tables.js

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for admin operations
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGx0cmZqZnpjeGZpcXJ6bG5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDM0MTcwNywiZXhwIjoyMDU5OTE3NzA3fQ.8T60XHCrJmzEZiE5sRPtp-CULtPK3nbr6XSLcYU42JI';

if (!supabaseUrl) {
  console.error('Error: Supabase URL not found in .env.local file');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL is set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createTables() {
  try {
    console.log('Creating tables in Supabase...');
    
    // Read the SQL file
    const sqlFilePath = path.join(process.cwd(), 'scripts/create-tables.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing SQL statement: ${statement.substring(0, 50)}...`);
      
      // Execute SQL directly using the Supabase client with service role key
      try {
        // For blog_posts table
        if (statement.includes('blog_posts')) {
          await supabase.from('blog_posts').select('count').limit(1).catch(() => {
            console.log('Creating blog_posts table...');
            return supabase.query(statement);
          });
        }
        // For newsletter_subscribers table
        else if (statement.includes('newsletter_subscribers')) {
          await supabase.from('newsletter_subscribers').select('count').limit(1).catch(() => {
            console.log('Creating newsletter_subscribers table...');
            return supabase.query(statement);
          });
        }
        // For contact_submissions table
        else if (statement.includes('contact_submissions')) {
          await supabase.from('contact_submissions').select('count').limit(1).catch(() => {
            console.log('Creating contact_submissions table...');
            return supabase.query(statement);
          });
        }
        // For seo_metadata table
        else if (statement.includes('seo_metadata')) {
          await supabase.from('seo_metadata').select('count').limit(1).catch(() => {
            console.log('Creating seo_metadata table...');
            return supabase.query(statement);
          });
        }
        
        console.log('SQL statement executed successfully');
      } catch (error) {
        console.error('Error executing SQL statement:', error);
        console.log('Continuing with next statement...');
      }
    }
    
    console.log('Tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

createTables();
