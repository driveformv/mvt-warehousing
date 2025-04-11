'use client';

import { useEffect, useState } from 'react';
import { Calendar, Tag, Search } from 'lucide-react';
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

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch blog posts when the component mounts
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        
        // Fetch blog posts from the API
        const res = await fetch('/api/blog', {
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await res.json();
        
        if (!data || data.length === 0) {
          setError('No blog posts found.');
          setLoading(false);
          return;
        }
        
        // Process the blog posts
        const processedPosts = data.map((post: any) => {
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
        
        setPosts(processedPosts);
        setFilteredPosts(processedPosts);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(processedPosts.map((post: BlogPost) => post.category).filter(Boolean))
        ) as string[];
        
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchBlogPosts:', err);
        setError('An error occurred while loading blog posts.');
        setLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, []);
  
  // Filter posts when search query or category changes
  useEffect(() => {
    if (!posts.length) return;
    
    let filtered = [...posts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        (post.content && post.content.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-gray-600 mb-8">{error}</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Insights, news, and updates from the world of transportation and logistics
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blog posts..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => handleCategorySelect(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {post.category && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                        <Tag size={16} />
                        <span>{post.category}</span>
                      </div>
                    )}
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    {post.date && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={16} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <Link 
                      href={`/blog/${post.id}`}
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
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back soon for new content'}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
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
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
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
