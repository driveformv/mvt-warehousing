import { Metadata } from 'next';
import { seoToMetadata } from '@/lib/get-seo-metadata';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Fetch the blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (error || !data) {
      // Return default metadata if post not found
      return {
        title: 'Blog Post | MVT Warehousing',
        description: 'MVT Warehousing blog post'
      };
    }
    
    // Use SEO fields from the blog post if available
    return seoToMetadata({
      title: data.seo_title || data.title,
      description: data.seo_description || data.excerpt || data.content.substring(0, 150),
      keywords: data.seo_keywords || ['warehousing', 'logistics', 'transportation'],
      path: `/blog/${params.id}`
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | MVT Warehousing',
      description: 'MVT Warehousing blog post'
    };
  }
}
