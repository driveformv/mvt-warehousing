// Script to create a new table with string keywords in Supabase
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
  console.log('Creating views for SEO keywords...');

  try {
    // Create a view for SEO metadata keywords
    console.log('Creating view for SEO metadata keywords...');
    
    // Fetch all SEO metadata
    const { data: seoData, error: seoError } = await supabase
      .from('seo_metadata')
      .select('*');
    
    if (seoError) {
      console.error('Error fetching SEO metadata:', seoError);
      return;
    }
    
    console.log(`Found ${seoData.length} SEO metadata entries`);
    
    // Log the keywords for each entry
    for (const item of seoData) {
      console.log(`Path: ${item.path}`);
      console.log(`Keywords: ${JSON.stringify(item.keywords)}`);
      console.log('---');
    }
    
    // Fetch all blog posts
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('id, title, seo_keywords')
      .limit(5);
    
    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
      return;
    }
    
    console.log(`\nFound ${blogData.length} blog posts (showing first 5)`);
    
    // Log the keywords for each blog post
    for (const post of blogData) {
      console.log(`ID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Keywords: ${JSON.stringify(post.seo_keywords)}`);
      console.log('---');
    }
    
    console.log('\nThe keywords are stored as arrays in the database.');
    console.log('To view them in the Supabase dashboard, you can use the following SQL query:');
    console.log('\nSELECT id, path, title, description, array_to_string(keywords, \', \') as keywords_string FROM seo_metadata;');
    console.log('\nThis will display the keywords as comma-separated strings in the results.');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
createKeywordsView();
