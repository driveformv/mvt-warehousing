import { Metadata } from 'next';
import { supabase, isSupabaseConfigured } from './supabase';

// Define the SEO metadata type
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  path: string;
}

// Default metadata to use when Supabase is not available
const defaultMetadata: Omit<SEOMetadata, 'path'> = {
  title: 'MVT Warehousing',
  description: 'MVT Warehousing provides logistics and warehousing solutions',
  keywords: ['warehousing', 'logistics', 'transportation']
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
  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
  
  // Add OpenGraph metadata if available
  if (seo.ogImage) {
    metadata.openGraph = {
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title
        }
      ]
    };
  }
  
  return metadata;
}

// Generate metadata for a page
export async function generateMetadata(path: string): Promise<Metadata> {
  const seo = await getSEOMetadata(path);
  return seoToMetadata(seo);
}
