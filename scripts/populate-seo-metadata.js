// Script to populate SEO metadata in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or key. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// SEO metadata for different pages
const seoMetadata = [
  {
    path: '/',
    title: 'MVT Warehousing | Premium Integrated Logistics Services',
    description: 'MVT Warehousing provides comprehensive transportation and warehousing solutions for businesses across the US and Mexico border. Established in 1986, we offer reliable logistics services.',
    keywords: ['warehousing', 'logistics', 'transportation', 'supply chain', 'El Paso', 'Texas', 'Mexico border'],
    og_image: '/images/1.jpg'
  },
  {
    path: '/about',
    title: 'About MVT Warehousing | Our Story & Mission',
    description: 'Learn about MVT Warehousing\'s 36+ years of experience in the logistics industry. Discover our mission, values, and commitment to excellence in transportation and warehousing.',
    keywords: ['about MVT', 'logistics company', 'warehousing history', 'El Paso logistics', 'company values'],
    og_image: '/images/2-1.jpg'
  },
  {
    path: '/services',
    title: 'Our Services | MVT Warehousing & Transportation Solutions',
    description: 'Explore MVT Warehousing\'s comprehensive logistics services including warehousing, transportation, bulk transfer, and cross-border logistics solutions.',
    keywords: ['logistics services', 'warehousing services', 'transportation', 'bulk transfer', 'cross-border logistics'],
    og_image: '/images/3-1.jpg'
  },
  {
    path: '/contact',
    title: 'Contact MVT Warehousing | Get in Touch with Our Team',
    description: 'Contact MVT Warehousing for all your logistics and warehousing needs. Reach our team in El Paso, Del Rio, or Laredo to discuss how we can help your business.',
    keywords: ['contact logistics company', 'warehousing contact', 'logistics quote', 'El Paso logistics contact'],
    og_image: '/images/1.jpg'
  },
  {
    path: '/blog',
    title: 'Logistics & Warehousing Blog | MVT Warehousing Insights',
    description: 'Stay updated with the latest insights and news from the world of transportation and logistics through the MVT Warehousing blog.',
    keywords: ['logistics blog', 'warehousing news', 'transportation insights', 'supply chain blog'],
    og_image: '/images/4-1.jpg'
  },
  {
    path: '/careers',
    title: 'Careers at MVT Warehousing | Join Our Team',
    description: 'Explore career opportunities at MVT Warehousing. Join our team of logistics professionals and grow your career in transportation and warehousing.',
    keywords: ['logistics jobs', 'warehousing careers', 'transportation jobs', 'El Paso jobs', 'logistics careers'],
    og_image: '/images/3.jpg'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | MVT Warehousing',
    description: 'MVT Warehousing\'s privacy policy outlines how we collect, use, and protect your personal information when you use our website and services.',
    keywords: ['privacy policy', 'data protection', 'logistics privacy'],
    og_image: null
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | MVT Warehousing',
    description: 'Read MVT Warehousing\'s terms of service to understand the conditions for using our website and services.',
    keywords: ['terms of service', 'terms and conditions', 'logistics terms'],
    og_image: null
  }
];

// Function to insert or update SEO metadata
async function populateSEOMetadata() {
  console.log('Starting to populate SEO metadata...');

  try {
    // First check if the table exists
    const { error: tableError } = await supabase
      .from('seo_metadata')
      .select('id')
      .limit(1);

    if (tableError && tableError.code === '42P01') {
      console.log('Creating seo_metadata table...');
      
      // Create the table if it doesn't exist
      const { error: createError } = await supabase.rpc('create_seo_metadata_table');
      
      if (createError) {
        // If RPC fails, try direct SQL (requires more permissions)
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS seo_metadata (
            id SERIAL PRIMARY KEY,
            path TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            keywords TEXT[] DEFAULT '{}',
            og_image TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `;
        
        const { error: sqlError } = await supabase.rpc('execute_sql', { sql: createTableSQL });
        
        if (sqlError) {
          console.error('Error creating table:', sqlError);
          return;
        }
      }
    }

    // Insert or update metadata for each page
    for (const metadata of seoMetadata) {
      // Check if entry already exists
      const { data: existingData, error: checkError } = await supabase
        .from('seo_metadata')
        .select('id')
        .eq('path', metadata.path)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error(`Error checking metadata for ${metadata.path}:`, checkError);
        continue;
      }
      
      if (existingData) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from('seo_metadata')
          .update({
            title: metadata.title,
            description: metadata.description,
            keywords: metadata.keywords,
            og_image: metadata.og_image,
            updated_at: new Date()
          })
          .eq('id', existingData.id);
        
        if (updateError) {
          console.error(`Error updating metadata for ${metadata.path}:`, updateError);
        } else {
          console.log(`Updated metadata for ${metadata.path}`);
        }
      } else {
        // Insert new entry
        const { error: insertError } = await supabase
          .from('seo_metadata')
          .insert([metadata]);
        
        if (insertError) {
          console.error(`Error inserting metadata for ${metadata.path}:`, insertError);
        } else {
          console.log(`Inserted metadata for ${metadata.path}`);
        }
      }
    }
    
    console.log('SEO metadata population completed!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
populateSEOMetadata();
