import { Metadata } from 'next';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Define the blog post type with SEO fields
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

// Generate metadata for a specific blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase is not configured, using default blog post metadata');
      return {
        title: 'Blog Post | MVT Warehousing',
        description: 'Read our latest blog post about transportation and logistics.'
      };
    }
    
    // Fetch the blog post from Supabase
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (error || !post) {
      console.error('Error fetching blog post for metadata:', error);
      return {
        title: 'Blog Post | MVT Warehousing',
        description: 'Read our latest blog post about transportation and logistics.'
      };
    }
    
    // Use SEO fields if available, otherwise fallback to post title/excerpt
    const blogPost = post as BlogPost;
    const title = blogPost.seo_title || `${blogPost.title} | MVT Warehousing Blog`;
    
    let description = blogPost.seo_description;
    if (!description) {
      if (blogPost.excerpt) {
        description = blogPost.excerpt;
      } else if (blogPost.content) {
        // Create description from content (first 150 chars)
        description = blogPost.content.substring(0, 150).trim();
        if (blogPost.content.length > 150) description += '...';
      } else {
        description = `Read our blog post about ${blogPost.title} and learn more about logistics and warehousing solutions.`;
      }
    }
    
    const keywords = blogPost.seo_keywords || ['logistics', 'warehousing', 'transportation'];
    
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: 'article'
      }
    };
  } catch (error) {
    console.error('Error generating blog post metadata:', error);
    return {
      title: 'Blog Post | MVT Warehousing',
      description: 'Read our latest blog post about transportation and logistics.'
    };
  }
}
