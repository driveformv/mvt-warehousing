import { Suspense } from 'react';
import BlogClient from './blog-client';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogClient />
    </Suspense>
  );
}
