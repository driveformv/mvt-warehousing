// Script to create a view for SEO keywords in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or key. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createKeywordsView() {
  console.log('Creating SQL views for SEO keywords...');

  try {
    // Create a view for SEO metadata keywords
    console.log('Creating view for SEO metadata keywords...');
    
    // First, check if we have permission to create views
    const { data: permissionCheck, error: permissionError } = await supabase
      .from('seo_metadata')
      .select('id')
      .limit(1);
    
    if (permissionError) {
      console.error('Error checking permissions:', permissionError);
      return;
    }
    
    // Generate SQL for creating views
    const seoMetadataViewSQL = `
      SELECT 
        id, 
        path, 
        title, 
        description, 
        array_to_string(keywords, ', ') as keywords_string,
        og_image
      FROM seo_metadata
    `;
    
    const blogPostsViewSQL = `
      SELECT 
        id, 
        title, 
        excerpt,
        published_date,
        category,
        array_to_string(seo_keywords, ', ') as seo_keywords_string
      FROM blog_posts
    `;
    
    console.log('\nTo view SEO metadata keywords as strings, run this SQL query in the Supabase dashboard:');
    console.log(seoMetadataViewSQL);
    
    console.log('\nTo view blog post SEO keywords as strings, run this SQL query in the Supabase dashboard:');
    console.log(blogPostsViewSQL);
    
    console.log('\nIf you have permission to create views, you can run these SQL commands:');
    console.log(`
      CREATE OR REPLACE VIEW seo_metadata_view AS
      ${seoMetadataViewSQL}
      
      CREATE OR REPLACE VIEW blog_posts_view AS
      ${blogPostsViewSQL}
    `);
    
    console.log('\nAfter creating these views, you can query them directly:');
    console.log('SELECT * FROM seo_metadata_view;');
    console.log('SELECT * FROM blog_posts_view;');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
createKeywordsView();
