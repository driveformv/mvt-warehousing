#!/usr/bin/env node

// Script to create tables in Supabase using the JavaScript client
// Usage: node scripts/create-tables-client.js

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for admin operations
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGx0cmZqZnpjeGZpcXJ6bG5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDM0MTcwNywiZXhwIjoyMDU5OTE3NzA3fQ.8T60XHCrJmzEZiE5sRPtp-CULtPK3nbr6XSLcYU42JI';

if (!supabaseUrl) {
  console.error('Error: Supabase URL not found in .env.local file');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL is set');
  process.exit(1);
}

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, serviceRoleKey);

// Function to create a table
async function createTable(tableName, schema) {
  console.log(`Creating ${tableName} table...`);
  
  try {
    // First check if the table exists
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (!error) {
      console.log(`Table ${tableName} already exists.`);
      return true;
    }
    
    // Create the table
    let createTableSQL = '';
    
    if (tableName === 'blog_posts') {
      createTableSQL = `
        CREATE TABLE IF NOT EXISTS blog_posts (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          content TEXT NOT NULL,
          excerpt TEXT,
          published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          category TEXT,
          tags TEXT[],
          video_id TEXT,
          seo_title TEXT,
          seo_description TEXT,
          seo_keywords TEXT[]
        );
      `;
    } else if (tableName === 'newsletter_subscribers') {
      createTableSQL = `
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status TEXT DEFAULT 'active'
        );
      `;
    } else if (tableName === 'contact_submissions') {
      createTableSQL = `
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          subject TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status TEXT DEFAULT 'unread'
        );
      `;
    } else if (tableName === 'seo_metadata') {
      createTableSQL = `
        CREATE TABLE IF NOT EXISTS seo_metadata (
          id SERIAL PRIMARY KEY,
          path TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          keywords TEXT[],
          og_image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;
    }
    
    // Execute the SQL
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (createError) {
      console.error(`Error creating table ${tableName}:`, createError);
      return false;
    }
    
    console.log(`Table ${tableName} created successfully.`);
    return true;
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    return false;
  }
}

async function createTables() {
  try {
    console.log('Creating tables in Supabase...');
    
    // Create the tables
    await createTable('blog_posts');
    await createTable('newsletter_subscribers');
    await createTable('contact_submissions');
    await createTable('seo_metadata');
    
    console.log('Tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

createTables();
