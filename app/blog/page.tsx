"use client";

import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import blogData from "../../stagecoach-blog-data.json";

export default function Blog() {
  // Use data from the JSON file and sort by date (newest first)
  const blogPosts = blogData.blogPosts
    .map(post => {
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
      
      // Use the videoId directly if available, otherwise extract it from videoUrls
      const videoId = post.videoId || '';
      
      return {
        id: post.id,
        title: post.title,
        excerpt: excerpt,
        date: formattedDate,
        rawDate: date, // Keep the raw date for sorting
        category: post.categories[0] || "General",
        videoId: videoId
      };
    })
    // Sort by date, newest first
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/images/4-1.jpg"
          alt="Blog Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Blog</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Insights and updates from the world of transportation and logistics
          </p>
        </div>
      </section>

      {/* Blog Posts - 3-column grid layout */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                    <Tag size={16} />
                    <span>{post.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 h-16">
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                {/* YouTube Video Embed - Fixed to use direct video IDs */}
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe 
                    src={`https://www.youtube.com/embed/${post.videoId}`}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-mvt-blue text-white py-20 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Stay updated with the latest insights and news from the world of transportation and logistics
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-6" data-aos="fade-up" data-aos-delay="200">
              <input
                type="email"
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
            
            <p className="text-sm text-white/60 mt-4" data-aos="fade-up" data-aos-delay="300">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
