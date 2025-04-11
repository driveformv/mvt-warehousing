import BlogPostClient from './blog-post-client';

export const dynamic = 'force-dynamic';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogPostClient id={params.id} />;
}
