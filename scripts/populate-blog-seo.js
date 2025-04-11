// Script to populate SEO metadata for blog posts in Supabase
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

// Function to update blog posts with SEO metadata
async function populateBlogSEO() {
  console.log('Starting to populate blog post SEO metadata...');

  try {
    // Get all blog posts
    const { data: blogPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching blog posts:', fetchError);
      return;
    }
    
    if (!blogPosts || blogPosts.length === 0) {
      console.log('No blog posts found. Please make sure the blog_posts table is populated.');
      return;
    }
    
    console.log(`Found ${blogPosts.length} blog posts to update.`);
    
    // Update each blog post with SEO metadata
    for (const post of blogPosts) {
      // Generate SEO title if not present
      const seoTitle = post.seo_title || `${post.title} | MVT Warehousing Blog`;
      
      // Generate SEO description if not present
      let seoDescription = post.seo_description;
      if (!seoDescription) {
        if (post.excerpt) {
          seoDescription = post.excerpt;
        } else if (post.content) {
          // Create description from content (first 150 chars)
          seoDescription = post.content.substring(0, 150).trim();
          if (post.content.length > 150) seoDescription += '...';
        } else {
          seoDescription = `Read our blog post about ${post.title} and learn more about logistics and warehousing solutions.`;
        }
      }
      
      // Generate keywords if not present
      const seoKeywords = post.seo_keywords || [
        'logistics', 
        'warehousing', 
        'transportation', 
        post.category || 'supply chain',
        ...post.title.toLowerCase().split(' ').filter(word => word.length > 3)
      ];
      
      // Update the blog post with SEO metadata
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({
          seo_title: seoTitle,
          seo_description: seoDescription,
          seo_keywords: seoKeywords
        })
        .eq('id', post.id);
      
      if (updateError) {
        console.error(`Error updating SEO metadata for blog post ${post.id}:`, updateError);
      } else {
        console.log(`Updated SEO metadata for blog post: ${post.title}`);
      }
    }
    
    console.log('Blog post SEO metadata population completed!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
populateBlogSEO();
