import { Metadata } from 'next';
import { supabase, isSupabaseConfigured } from './supabase';

// Define the SEO metadata type
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  path: string;
  canonicalUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  locale?: string;
  type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
}

// Default metadata to use when Supabase is not available
const defaultMetadata: Omit<SEOMetadata, 'path'> = {
  title: 'MVT Warehousing | Premium Integrated Logistics Services',
  description: 'Your strategic partner for transportation, warehousing, and logistics services in Denver, CO. MVT Warehousing provides end-to-end supply chain solutions.',
  keywords: ['warehousing', 'logistics', 'transportation', 'supply chain', 'Denver logistics', 'warehouse services'],
  twitterCard: 'summary_large_image',
  locale: 'en_US',
  type: 'website'
};

// Fetch SEO metadata from Supabase
export async function getSEOMetadata(path: string): Promise<SEOMetadata> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase is not configured, using default metadata');
      return {
        ...defaultMetadata,
        path
      };
    }
    
    // Query the seo_metadata table
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('*')
      .eq('path', path)
      .single();
    
    if (error) {
      // If no metadata found for this path, return default
      if (error.code === 'PGRST116') {
        return {
          ...defaultMetadata,
          path
        };
      }
      
      console.error('Error fetching SEO metadata:', error);
      throw error;
    }
    
    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords || [],
      ogImage: data.og_image || undefined,
      path: data.path
    };
  } catch (error) {
    console.error('Error in getSEOMetadata:', error);
    
    // Return default metadata on error
    return {
      ...defaultMetadata,
      path
    };
  }
}

// Convert SEO metadata to Next.js Metadata
export function seoToMetadata(seo: SEOMetadata): Metadata {
  const baseUrl = 'https://www.mvtwarehousing.com';
  const ogImage = seo.ogImage || '/images/og-image.jpg';
  
  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    
    // OpenGraph metadata
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.type || 'website',
      locale: seo.locale || 'en_US',
      url: `${baseUrl}${seo.path}`,
      siteName: 'MVT Warehousing',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: seo.title
        }
      ]
    },
    
    // Twitter card metadata
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
    },
    
    // Canonical URL
    alternates: {
      canonical: seo.canonicalUrl || `${baseUrl}${seo.path}`
    }
  };
  
  return metadata;
}

// Generate metadata for a page
export async function generateMetadata(path: string): Promise<Metadata> {
  const seo = await getSEOMetadata(path);
  return seoToMetadata(seo);
}
