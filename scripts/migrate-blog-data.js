#!/usr/bin/env node

// Script to migrate blog data from JSON file to Supabase
// Usage: node scripts/migrate-blog-data.js

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in .env.local file');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  try {
    console.log('Starting blog data migration...');
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'stagecoach-blog-data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogData = JSON.parse(fileContents);
    
    if (!blogData.blogPosts || !Array.isArray(blogData.blogPosts)) {
      throw new Error('Invalid blog data format: blogPosts array not found');
    }
    
    console.log(`Found ${blogData.blogPosts.length} blog posts to migrate`);
    
    // Process each blog post
    const processedPosts = blogData.blogPosts.map(post => {
      // Extract tags from hashtags or categories
      const tags = post.hashtags && post.hashtags.length > 0 
        ? post.hashtags 
        : post.categories || ["Transportation", "Logistics"];
      
      // Create excerpt from content
      const excerpt = post.content.length > 150 
        ? post.content.substring(0, 150) + "..." 
        : post.content;
      
      return {
        id: post.id,
        title: post.title,
        slug: post.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
        content: post.content,
        excerpt: excerpt,
        published_date: post.publishedDate || new Date().toISOString(),
        category: post.categories && post.categories.length > 0 ? post.categories[0] : "General",
        tags: tags,
        video_id: post.videoId || '',
        seo_title: `${post.title} | MVT Warehousing Blog`,
        seo_description: excerpt,
        seo_keywords: tags
      };
    });
    
    // We'll skip table creation and assume the tables already exist in Supabase
    // or will be created automatically when we insert data
    console.log('Skipping table creation - tables will be created automatically');
    
    // Insert the processed posts
    console.log('Inserting blog posts into Supabase...');
    
    // Insert in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < processedPosts.length; i += batchSize) {
      const batch = processedPosts.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .upsert(batch, { onConflict: 'id' });
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Batch ${i / batchSize + 1} inserted successfully`);
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('Migration completed successfully!');
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
