# SEO Implementation in MVT Warehousing

This document outlines the SEO implementation in the MVT Warehousing project, explaining how metadata is managed and how to maintain and update it.

## Overview

The project uses Next.js's built-in metadata API combined with a Supabase database to manage SEO metadata for all pages. This approach allows for centralized management of SEO data while leveraging Next.js's powerful metadata capabilities.

## Architecture

### Database Structure

SEO metadata is stored in two Supabase tables:

1. **seo_metadata**: Stores general page metadata
   - `id`: Primary key
   - `path`: URL path (e.g., '/about', '/services')
   - `title`: Page title
   - `description`: Meta description
   - `keywords`: Array of keywords
   - `og_image`: Path to OpenGraph image
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

2. **blog_posts**: Includes SEO fields for blog posts
   - `id`: Primary key
   - `title`: Blog post title
   - `slug`: URL-friendly version of title
   - `content`: Blog post content
   - `excerpt`: Short summary
   - `published_date`: Publication date
   - `updated_date`: Last update date
   - `category`: Blog category
   - `tags`: Array of tags
   - `video_id`: YouTube video ID (if applicable)
   - `seo_title`: SEO-optimized title
   - `seo_description`: SEO-optimized description
   - `seo_keywords`: Array of SEO keywords

### Implementation Files

The SEO implementation consists of several key files:

1. **lib/get-seo-metadata.ts**: Core utility for fetching metadata from Supabase
   - `getSEOMetadata()`: Fetches metadata for a specific path
   - `seoToMetadata()`: Converts SEO data to Next.js Metadata format
   - `generateMetadata()`: Main function used by page metadata files

2. **app/api/seo/route.ts**: API endpoint for managing SEO metadata
   - `GET`: Retrieve metadata for a specific path or all metadata
   - `POST`: Create or update metadata
   - `DELETE`: Remove metadata

3. **Page-specific metadata.ts files**: Each page has its own metadata.ts file
   - Located in the page's directory (e.g., app/about/metadata.ts)
   - Uses the `generateMetadata()` function to fetch metadata for that page

4. **app/blog/[id]/metadata.ts**: Special implementation for dynamic blog posts
   - Fetches the specific blog post data
   - Uses the blog post's SEO fields or generates metadata from content

### Data Flow

1. When a page is requested, Next.js calls the page's `generateMetadata()` function
2. This function calls the utility in `lib/get-seo-metadata.ts`
3. The utility fetches data from Supabase based on the page path
4. If data exists, it's formatted as Next.js Metadata and returned
5. If no data exists, default metadata is returned

## Maintenance

### Adding SEO for a New Page

1. Create a `metadata.ts` file in the page's directory
2. Import and use the `generateMetadata` function from `lib/get-seo-metadata.ts`
3. Add the page's metadata to the `seo_metadata` table in Supabase

Example `metadata.ts` file:
```typescript
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/lib/get-seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata('/your-page-path');
}
```

### Updating SEO Metadata

To update metadata for existing pages:

1. Use the API endpoint at `/api/seo` with a POST request
2. Include the path, title, description, and optional keywords and ogImage
3. The API will update the existing record or create a new one

Example API request:
```javascript
fetch('/api/seo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    path: '/about',
    title: 'About MVT Warehousing | Our Story & Mission',
    description: 'Learn about MVT Warehousing\'s experience in logistics...',
    keywords: ['about MVT', 'logistics company', 'warehousing history']
  })
})
```

### Blog Post SEO

Blog posts have their own SEO fields in the `blog_posts` table. When creating or updating a blog post:

1. Set the `seo_title`, `seo_description`, and `seo_keywords` fields
2. The dynamic metadata implementation will use these fields automatically

If these fields are not provided, the system will generate metadata from the post's title, excerpt, and content.

## Scripts

The project includes scripts for managing SEO data:

1. **scripts/populate-seo-metadata.js**: Populates the `seo_metadata` table with initial data
2. **scripts/populate-blog-seo.js**: Updates SEO fields for blog posts

Run these scripts when you need to bulk update SEO data:
```bash
node scripts/populate-seo-metadata.js
node scripts/populate-blog-seo.js
```

## Best Practices

1. **Keep metadata up to date**: Regularly review and update metadata as content changes
2. **Optimize for search intent**: Ensure titles and descriptions match user search intent
3. **Use keywords strategically**: Include relevant keywords without keyword stuffing
4. **Provide OpenGraph images**: Add og_image paths for better social media sharing
5. **Monitor performance**: Use analytics to track SEO performance and make adjustments
