import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Dynamic sitemap generator
 * 
 * This API route generates a dynamic XML sitemap that includes:
 * 1. Static pages from the site
 * 2. Dynamic blog posts from the database
 * 3. Other dynamic content as needed
 * 
 * The sitemap follows the standard sitemap protocol: https://www.sitemaps.org/protocol.html
 */
export async function GET() {
  try {
    // Get current date in ISO format for lastmod
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Define static pages
    const staticPages = [
      { url: '/', changefreq: 'weekly', priority: '1.0' },
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/services', changefreq: 'monthly', priority: '0.8' },
      { url: '/contact', changefreq: 'monthly', priority: '0.7' },
      { url: '/careers', changefreq: 'weekly', priority: '0.7' },
      { url: '/blog', changefreq: 'daily', priority: '0.6' },
      { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
      { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
    ];
    
    // Fetch blog posts from Supabase
    let blogPosts: { slug: string; updated_date: string }[] = [];
    
    if (supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_date')
        .order('updated_date', { ascending: false });
        
      if (!error && data) {
        blogPosts = data;
      } else {
        console.error('Error fetching blog posts for sitemap:', error);
      }
    }
    
    // Start building the XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>https://www.mvtwarehousing.com${page.url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    // Add blog posts
    blogPosts.forEach(post => {
      const lastmod = post.updated_date 
        ? new Date(post.updated_date).toISOString().split('T')[0]
        : currentDate;
        
      xml += '  <url>\n';
      xml += `    <loc>https://www.mvtwarehousing.com/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
    
    // Close XML
    xml += '</urlset>';
    
    // Return XML with proper content type
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
