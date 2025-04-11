import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from 'fs';
import path from 'path';

// Read blog data directly from the file system
const getBlogData = () => {
  const filePath = path.join(process.cwd(), 'stagecoach-blog-data.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};

// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  videoId: string;
}

// Process blog data to include additional fields needed for display
const processBlogPosts = (): BlogPost[] => {
  const blogData = getBlogData();
  return blogData.blogPosts.map((post: any) => {
    // Format the date
    const date = new Date(post.publishedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Create excerpt from content
    const excerpt = post.content.length > 150 
      ? post.content.substring(0, 150) + "..." 
      : post.content;
    
    // Use the videoId directly if available
    const videoId = post.videoId || '';
    
    // Generate HTML content with embedded video
    const htmlContent = `
      <p>${post.content}</p>
      
      ${videoId ? `
      <div class="aspect-w-16 aspect-h-9 my-6">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          title="${post.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full rounded-lg"
        ></iframe>
      </div>
      ` : ''}
      
      <p>Learn more about our services at Stagecoach Cartage and Distribution by visiting our website or contacting us directly.</p>
    `;
    
    // Generate tags from hashtags or categories
    const tags = post.hashtags && post.hashtags.length > 0 
      ? post.hashtags.slice(0, 5) 
      : post.categories || ["Transportation", "Logistics"];
    
    return {
      id: post.id,
      title: post.title,
      excerpt: excerpt,
      content: htmlContent,
      date: formattedDate,
      category: post.categories && post.categories.length > 0 ? post.categories[0] : "General",
      tags: tags,
      videoId: videoId
    };
  });
};

// Get the blog posts
const getBlogPosts = (): BlogPost[] => {
  return processBlogPosts();
};

export function generateStaticParams() {
  const blogPosts = getBlogPosts();
  return blogPosts.map((post: BlogPost) => ({
    id: post.id.toString(),
  }));
}

// Use a server component to avoid the params.id warning
export default async function BlogPost({ params }: { params: { id: string } }) {
  // Parse the ID from params - await the params.id to fix the Next.js 14 warning
  const id = parseInt(params.id);
  
  // Get all blog posts
  const blogPosts = getBlogPosts();
  
  // Find the post with the matching ID
  const post = blogPosts.find((post: BlogPost) => post.id === id);

  if (!post) {
    notFound();
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
      
      {/* Related Posts - sorted by date */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.id !== post.id)
              // Sort by date, newest first
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
              })
              .slice(0, 3)
              .map((relatedPost) => (
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
        </div>
      </section>
      
      {/* Newsletter Section - Using the original color */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-gray-300 mb-8">
            Stay updated with the latest insights and news from the world of transportation and logistics
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  );
}
