import { Suspense } from 'react';
import BlogPostClient from './blog-post-client';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogPostClient id={resolvedParams.id} />
    </Suspense>
  );
}
