#!/usr/bin/env node

// Script to update blog post categories in Supabase
// Usage: node scripts/update-blog-categories.js

require('dotenv').config({ path: '.env.local' });
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

async function updateCategories() {
  try {
    console.log('Starting blog category updates...');
    
    // Define the category updates
    const categoryUpdates = [
      // Testimonials incorrectly categorized as Safety
      { id: 2, category: 'Testimonial' }, // Driver Roberto Enriquez Testimonial
      { id: 5, category: 'Testimonial' }, // Driver Jorge Moreno Testimonial
      { id: 6, category: 'Testimonial' }, // Driver Heriberto Palacios Testimonial
      { id: 8, category: 'Testimonial' }, // Driver Juventino Vasquez Testimonial
      { id: 7, category: 'Testimonial' }, // Driver Casey Odegard Testimonial
      
      // Team members incorrectly categorized as Safety
      { id: 4, category: 'Team' }, // Meet Our Team | Juan Perez
      
      // Other miscategorized posts
      { id: 1, category: 'Testimonial' }, // Driver of the Month | Roberto Enriquez
      { id: 3, category: 'Warehouse' }, // Stagecoach Warehouse Wednesday
    ];
    
    // Update each post's category
    for (const update of categoryUpdates) {
      console.log(`Updating post ID ${update.id} to category "${update.category}"...`);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ category: update.category })
        .eq('id', update.id);
      
      if (error) {
        console.error(`Error updating post ID ${update.id}:`, error);
      } else {
        console.log(`Post ID ${update.id} updated successfully`);
      }
    }
    
    console.log('Category updates completed successfully!');
    
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

updateCategories();
