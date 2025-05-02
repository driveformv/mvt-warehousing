/**
 * Update SEO Metadata Script
 * 
 * This script updates the SEO metadata in the Supabase database.
 * It ensures that all pages have proper SEO metadata including titles,
 * descriptions, keywords, and OpenGraph images.
 * 
 * Usage: node scripts/update-seo-metadata.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define SEO metadata for each page
const seoMetadata = [
  {
    path: '/',
    title: 'MVT Warehousing | Premium Integrated Logistics Services',
    description: 'Your strategic partner for transportation, warehousing, and logistics services in Denver, CO. MVT Warehousing provides end-to-end supply chain solutions.',
    keywords: ['warehousing', 'logistics', 'transportation', 'supply chain', 'Denver logistics', 'warehouse services'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/about',
    title: 'About MVT Warehousing | Our Story & Mission',
    description: 'Learn about MVT Warehousing\'s experience in logistics and warehousing. Discover our mission, values, and commitment to excellence in supply chain management.',
    keywords: ['about MVT', 'logistics company', 'warehousing history', 'supply chain mission', 'Denver logistics company'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/services',
    title: 'Logistics & Warehousing Services | MVT Warehousing',
    description: 'Comprehensive logistics and warehousing services including transportation, inventory management, distribution, and supply chain solutions tailored to your business needs.',
    keywords: ['logistics services', 'warehousing services', 'transportation services', 'inventory management', 'distribution services', 'supply chain solutions'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/contact',
    title: 'Contact MVT Warehousing | Get a Quote',
    description: 'Contact MVT Warehousing for logistics and warehousing solutions. Request a quote, ask questions, or schedule a consultation with our team.',
    keywords: ['contact logistics company', 'warehousing quote', 'logistics consultation', 'Denver logistics contact', 'supply chain quote'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/careers',
    title: 'Careers at MVT Warehousing | Join Our Team',
    description: 'Explore career opportunities at MVT Warehousing. Join our team of logistics and warehousing professionals and grow your career in supply chain management.',
    keywords: ['logistics jobs', 'warehousing careers', 'supply chain jobs', 'Denver logistics careers', 'transportation jobs'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/blog',
    title: 'Logistics & Supply Chain Blog | MVT Warehousing',
    description: 'Stay updated with the latest insights, trends, and news in logistics, warehousing, and supply chain management from MVT Warehousing experts.',
    keywords: ['logistics blog', 'warehousing blog', 'supply chain insights', 'logistics trends', 'warehousing news'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | MVT Warehousing',
    description: 'MVT Warehousing\'s privacy policy outlines how we collect, use, and protect your personal information when you use our website and services.',
    keywords: ['privacy policy', 'data protection', 'information security', 'logistics privacy'],
    og_image: '/images/og-image.jpg'
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | MVT Warehousing',
    description: 'Read MVT Warehousing\'s terms of service to understand the conditions for using our website and services.',
    keywords: ['terms of service', 'service agreement', 'logistics terms', 'warehousing conditions'],
    og_image: '/images/og-image.jpg'
  }
];

/**
 * Update SEO metadata in Supabase
 */
async function updateSEOMetadata() {
  console.log('Starting SEO metadata update...');
  
  for (const metadata of seoMetadata) {
    try {
      // Check if metadata for this path already exists
      const { data: existingData, error: fetchError } = await supabase
        .from('seo_metadata')
        .select('*')
        .eq('path', metadata.path)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error(`Error checking metadata for ${metadata.path}:`, fetchError);
        continue;
      }
      
      // If metadata exists, update it
      if (existingData) {
        const { error: updateError } = await supabase
          .from('seo_metadata')
          .update({
            title: metadata.title,
            description: metadata.description,
            keywords: metadata.keywords,
            og_image: metadata.og_image,
            updated_at: new Date().toISOString()
          })
          .eq('path', metadata.path);
        
        if (updateError) {
          console.error(`Error updating metadata for ${metadata.path}:`, updateError);
        } else {
          console.log(`Updated metadata for ${metadata.path}`);
        }
      } 
      // If metadata doesn't exist, insert it
      else {
        const { error: insertError } = await supabase
          .from('seo_metadata')
          .insert({
            ...metadata,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error(`Error inserting metadata for ${metadata.path}:`, insertError);
        } else {
          console.log(`Inserted metadata for ${metadata.path}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${metadata.path}:`, error);
    }
  }
  
  console.log('SEO metadata update completed.');
}

// Run the update function
updateSEOMetadata()
  .catch(error => {
    console.error('Error in updateSEOMetadata:', error);
    process.exit(1);
  });
