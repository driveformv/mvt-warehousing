// Script to verify SEO keywords in Supabase
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

async function verifySEOKeywords() {
  console.log('Verifying SEO keywords in Supabase...');

  try {
    // Fetch all SEO metadata
    const { data: seoData, error: seoError } = await supabase
      .from('seo_metadata')
      .select('*');
    
    if (seoError) {
      console.error('Error fetching SEO metadata:', seoError);
      return;
    }
    
    console.log('SEO Metadata:');
    seoData.forEach(item => {
      console.log(`Path: ${item.path}`);
      console.log(`Title: ${item.title}`);
      console.log(`Keywords: ${JSON.stringify(item.keywords)}`);
      console.log('---');
    });
    
    // Fetch a few blog posts to check their keywords
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('id, title, seo_keywords')
      .limit(5);
    
    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
      return;
    }
    
    console.log('\nBlog Post SEO Keywords:');
    blogData.forEach(post => {
      console.log(`ID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Keywords: ${JSON.stringify(post.seo_keywords)}`);
      console.log('---');
    });
    
    // Test updating keywords
    const testPath = '/';
    const newKeywords = ['test', 'keywords', 'update', 'verification'];
    
    console.log(`\nUpdating keywords for ${testPath} to: ${JSON.stringify(newKeywords)}`);
    
    const { error: updateError } = await supabase
      .from('seo_metadata')
      .update({ keywords: newKeywords })
      .eq('path', testPath);
    
    if (updateError) {
      console.error('Error updating keywords:', updateError);
    } else {
      console.log('Keywords updated successfully');
      
      // Verify the update
      const { data: updatedData, error: fetchError } = await supabase
        .from('seo_metadata')
        .select('keywords')
        .eq('path', testPath)
        .single();
      
      if (fetchError) {
        console.error('Error fetching updated keywords:', fetchError);
      } else {
        console.log(`Updated keywords: ${JSON.stringify(updatedData.keywords)}`);
      }
    }
    
    // Restore original keywords
    const originalKeywords = ['warehousing', 'logistics', 'transportation', 'supply chain', 'El Paso', 'Texas', 'Mexico border'];
    
    const { error: restoreError } = await supabase
      .from('seo_metadata')
      .update({ keywords: originalKeywords })
      .eq('path', testPath);
    
    if (restoreError) {
      console.error('Error restoring original keywords:', restoreError);
    } else {
      console.log('Original keywords restored');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
verifySEOKeywords();
