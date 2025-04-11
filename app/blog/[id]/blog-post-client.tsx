'use client';

import { useEffect, useState } from 'react';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Import supabase client for client component
import { supabase as supabaseClient } from '@/lib/supabase';

// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  published_date: string;
  date: string;
  category: string;
  tags: string[];
  video_id: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export default function BlogPostClient({ postId }: { postId: string }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch the blog post when the post ID changes
  useEffect(() => {
    if (!postId) return;
    
    async function fetchBlogPost() {
      try {
        const id = parseInt(postId);
        
        // Fetch the blog post
        const { data, error } = await supabaseClient
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching blog post:', error);
          setError('Failed to load blog post. Please try again later.');
          return;
        }
        
        if (!data) {
          router.push('/blog');
          return;
        }
        
        // Format the date
        const date = new Date(data.published_date);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        
        // Create excerpt from content if not provided
        const excerpt = data.excerpt || (data.content.length > 150
          ? data.content.substring(0, 150) + '...'
          : data.content);
        
        // Generate HTML content with embedded video
        const htmlContent = `
          <p>${data.content}</p>
          
          ${data.video_id ? `
          <div class="aspect-w-16 aspect-h-9 my-6">
            <iframe
              src="https://www.youtube.com/embed/${data.video_id}"
              title="${data.title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-full rounded-lg"
            ></iframe>
          </div>
          ` : ''}
          
          <p>Learn more about our services at MVT Warehousing by visiting our website or contacting us directly.</p>
        `;
        
        // Process tags
        const tags = data.tags || ['Transportation', 'Logistics'];
        
        const processedPost = {
          id: data.id,
          title: data.title,
          excerpt: excerpt,
          content: htmlContent,
          published_date: data.published_date,
          date: formattedDate,
          category: data.category || 'General',
          tags: tags,
          video_id: data.video_id || '',
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keywords: data.seo_keywords
        };
        
        setPost(processedPost);
        
        // Fetch related posts
        fetchRelatedPosts(data.id, data.category || 'General');
      } catch (err) {
        console.error('Error in fetchBlogPost:', err);
        setError('An error occurred while loading the blog post.');
      } finally {
        setLoading(false);
      }
    }
    
    async function fetchRelatedPosts(currentPostId: number, category: string) {
      try {
        // First try to get posts with the same category
        let { data, error } = await supabaseClient
          .from('blog_posts')
          .select('*')
          .eq('category', category)
          .neq('id', currentPostId)
          .order('published_date', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        
        // If we don't have enough related posts, get the most recent posts
        if (!data || data.length < 3) {
          const { data: recentPosts, error: recentError } = await supabaseClient
            .from('blog_posts')
            .select('*')
            .neq('id', currentPostId)
            .order('published_date', { ascending: false })
            .limit(3 - (data?.length || 0));
          
          if (recentError) throw recentError;
          
          data = [...(data || []), ...(recentPosts || [])];
        }
        
        // Process the posts
        const processedPosts = data.map(post => {
          // Format the date
          const date = new Date(post.published_date);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          
          // Create excerpt from content if not provided
          const excerpt = post.excerpt || (post.content.length > 150
            ? post.content.substring(0, 150) + '...'
            : post.content);
          
          return {
            id: post.id,
            title: post.title,
            excerpt: excerpt,
            content: post.content,
            published_date: post.published_date,
            date: formattedDate,
            category: post.category || 'General',
            tags: post.tags || ['Transportation', 'Logistics'],
            video_id: post.video_id || ''
          };
        });
        
        setRelatedPosts(processedPosts);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    }
    
    fetchBlogPost();
  }, [postId, router]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Error Loading Blog Post</h1>
        <p className="text-gray-600 mb-8">{error || 'The requested blog post could not be found.'}</p>
        <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tag size={18} />
              <span className="text-lg">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft size={20} />
            <span>Back to all posts</span>
          </Link>
          
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Related Posts</h2>
          {relatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                      <Tag size={16} />
                      <span>{relatedPost.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No related posts found</p>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-mvt-blue text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-white/80 mb-8">
            Stay updated with the latest insights and news from the world of transportation and logistics
          </p>
          <form 
            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
            action="/api/newsletter"
            method="POST"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-mvt-blue hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-white/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  );
}
