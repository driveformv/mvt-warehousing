'use client';

import { useEffect, useState } from 'react';
import { Calendar, Tag, ArrowLeft, Share2, Youtube } from 'lucide-react';
import Link from 'next/link';

// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  published_date?: string;
  publishedDate?: string;
  date?: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  hashtags?: string[];
  video_id?: string;
  videoId?: string;
}

export default function BlogPostClient({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  // Fetch blog post when the component mounts
  useEffect(() => {
    async function fetchBlogPost() {
      try {
        setLoading(true);
        
        // Fetch blog post from the API
        const res = await fetch(`/api/blog?id=${id}`, {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await res.json();
        
        if (!data) {
          setError('Blog post not found.');
          setLoading(false);
          return;
        }
        
        // Format the date
        const dateStr = data.published_date || data.publishedDate;
        let formattedDate = '';
        
        if (dateStr) {
          try {
            const date = new Date(dateStr);
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });
          } catch (e) {
            console.error('Error formatting date:', e);
            formattedDate = dateStr;
          }
        }
        
        // Ensure tags is an array
        let tags = data.tags || data.hashtags || ['Transportation', 'Logistics'];
        if (!Array.isArray(tags)) {
          tags = [tags];
        }
        
        // Get category from categories array if available
        const category = data.category || 
          (data.categories && data.categories.length > 0 ? data.categories[0] : 'General');
        
        const processedPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          published_date: data.published_date || data.publishedDate,
          date: formattedDate,
          category: category,
          tags: tags,
          video_id: data.video_id || data.videoId
        };
        
        setPost(processedPost);
        
        // Fetch related posts (posts with the same category)
        fetchRelatedPosts(processedPost.category);
        
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchBlogPost:', err);
        setError('An error occurred while loading the blog post.');
        setLoading(false);
      }
    }
    
    async function fetchRelatedPosts(category: string) {
      try {
        const res = await fetch('/api/blog', {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch related posts');
        }
        
        const data = await res.json();
        
        if (!data || data.length === 0) {
          return;
        }
        
        // Filter posts by category and exclude the current post
        const filtered = data
          .filter((p: any) => {
            const postCategory = p.category || 
              (p.categories && p.categories.length > 0 ? p.categories[0] : 'General');
            return postCategory === category && p.id.toString() !== id;
          })
          .slice(0, 3);
        
        // Process the related posts
        const processed = filtered.map((post: any) => {
          // Format the date
          const dateStr = post.published_date || post.publishedDate;
          let formattedDate = '';
          
          if (dateStr) {
            try {
              const date = new Date(dateStr);
              formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });
            } catch (e) {
              console.error('Error formatting date:', e);
              formattedDate = dateStr;
            }
          }
          
          // Create excerpt from content if not provided
          const excerpt = post.excerpt || (post.content && post.content.length > 150
            ? post.content.substring(0, 150) + '...'
            : post.content);
          
          // Ensure tags is an array
          let tags = post.tags || post.hashtags || ['Transportation', 'Logistics'];
          if (!Array.isArray(tags)) {
            tags = [tags];
          }
          
          // Get category from categories array if available
          const category = post.category || 
            (post.categories && post.categories.length > 0 ? post.categories[0] : 'General');
          
          return {
            id: post.id,
            title: post.title,
            excerpt: excerpt,
            content: post.content,
            published_date: post.published_date || post.publishedDate,
            date: formattedDate,
            category: category,
            tags: tags,
            video_id: post.video_id || post.videoId
          };
        });
        
        setRelatedPosts(processed);
      } catch (err) {
        console.error('Error in fetchRelatedPosts:', err);
      }
    }
    
    fetchBlogPost();
  }, [id]);
  
  // Format content with paragraphs
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mvt-blue"></div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Blog Post</h1>
        <p className="text-gray-600 mb-8">{error || 'This blog post is currently unavailable.'}</p>
        <Link href="/blog" className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-white/80">
              {post.date && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{post.date}</span>
                </div>
              )}
              {post.category && (
                <div className="flex items-center">
                  <Tag size={16} className="mr-1" />
                  <span>{post.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Post Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/blog" className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
            <button 
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    }).catch(err => {
                      console.error('Error sharing:', err);
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    });
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }
              }}
              className="text-gray-600 hover:text-gray-800 inline-flex items-center"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* YouTube Video (if available) */}
          {post.video_id && (
            <div className="mb-8">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe 
                  src={`https://www.youtube.com/embed/${post.video_id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
          
          {/* Share Button (Bottom) */}
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    }).catch(err => {
                      console.error('Error sharing:', err);
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    });
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }
              }}
              className="bg-mvt-blue text-white hover:bg-mvt-lightBlue px-6 py-3 rounded-md font-semibold inline-flex items-center transition-colors"
            >
              <Share2 size={18} className="mr-2" />
              Share This Article
            </button>
          </div>
        </div>
      </section>
      
      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Related Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {relatedPost.category && (
                      <div className="flex items-center gap-2 text-sm text-mvt-blue mb-3">
                        <Tag size={16} />
                        <span>{relatedPost.category}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-mvt-blue transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                    )}
                    {relatedPost.date && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={16} className="mr-1" />
                        <span>{relatedPost.date}</span>
                      </div>
                    )}
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center"
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
          </div>
        </section>
      )}
      
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
