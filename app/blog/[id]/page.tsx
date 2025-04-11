import BlogPostClient from './blog-post-client';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <BlogPostClient id={resolvedParams.id} />;
}
