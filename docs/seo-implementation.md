# SEO Implementation Documentation

This document outlines the SEO implementation for the MVT Warehousing website.

## Overview

The website uses Next.js metadata API combined with Supabase to provide dynamic SEO metadata for all pages. This approach allows for:

1. Centralized management of SEO metadata
2. Dynamic updates without code changes
3. Page-specific metadata customization
4. Proper social media sharing with OpenGraph tags

## Implementation Details

### Architecture

- **Storage**: All SEO metadata is stored in Supabase in the `seo_metadata` table
- **Fetching**: The `getSEOMetadata` function in `lib/get-seo-metadata.ts` retrieves metadata based on page path
- **Integration**: Each page uses the `generateMetadata` function to fetch and apply SEO metadata
- **Fallback**: Default metadata is provided if specific metadata is not found

### Database Schema

The `seo_metadata` table has the following structure:

```sql
CREATE TABLE seo_metadata (
  id SERIAL PRIMARY KEY,
  path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  og_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

For blog posts, SEO metadata is stored directly in the `blog_posts` table with these additional fields:

```
seo_title TEXT
seo_description TEXT
seo_keywords TEXT[]
```

### Code Implementation

1. **Metadata Fetching**:
   ```typescript
   // lib/get-seo-metadata.ts
   export async function getSEOMetadata(path: string): Promise<SEOMetadata> {
     // Fetch metadata from Supabase based on path
     // Return default metadata if not found
   }
   ```

2. **Page Integration**:
   ```typescript
   // app/page.tsx (and other pages)
   import { Metadata } from 'next';
   import { generateMetadata as getMetadata } from '@/lib/get-seo-metadata';

   export async function generateMetadata(): Promise<Metadata> {
     return await getMetadata('/');
   }
   ```

3. **Blog Post Integration**:
   ```typescript
   // app/blog/[id]/page.tsx
   export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
     // Fetch blog post
     // Use blog post's SEO fields or generate from content
   }
   ```

## Populating SEO Metadata

Two scripts are provided to populate the SEO metadata:

1. **General Pages**: `scripts/populate-seo-metadata.js`
   - Populates metadata for main pages (home, about, services, etc.)
   - Creates the `seo_metadata` table if it doesn't exist

2. **Blog Posts**: `scripts/populate-blog-seo.js`
   - Updates all blog posts with SEO metadata
   - Generates metadata from post content if not explicitly provided

To run these scripts:

```bash
node scripts/populate-seo-metadata.js
node scripts/populate-blog-seo.js
```

## Managing SEO Metadata

### Adding/Updating Page Metadata

To add or update SEO metadata for a page:

1. Use the Supabase dashboard to modify the `seo_metadata` table
2. Or use the API endpoint at `/api/seo` with a POST request:

```javascript
// Example POST request
fetch('/api/seo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    path: '/new-page',
    title: 'New Page | MVT Warehousing',
    description: 'Description for the new page',
    keywords: ['keyword1', 'keyword2'],
    ogImage: '/images/og-image.jpg'
  }),
})
```

### Updating Blog Post Metadata

Blog post SEO metadata can be updated:

1. Directly in the `blog_posts` table in Supabase
2. Through the blog post editor interface (if implemented)
3. By running the `populate-blog-seo.js` script again

## Best Practices

1. **Titles**: Keep titles under 60 characters, include the brand name
2. **Descriptions**: Keep descriptions between 120-160 characters
3. **Keywords**: Use 5-8 relevant keywords per page
4. **Images**: Provide OpenGraph images (1200x630px) for better social sharing

## Troubleshooting

If SEO metadata is not appearing correctly:

1. Check the Supabase connection in `.env.local`
2. Verify the metadata exists in the `seo_metadata` table
3. Check the browser console for any errors in the metadata fetching process
4. Run the population scripts again if needed

## Future Improvements

Potential enhancements to the SEO implementation:

1. Admin interface for managing SEO metadata
2. Automated SEO analysis and suggestions
3. Integration with analytics to track SEO performance
4. Structured data (JSON-LD) for rich search results
