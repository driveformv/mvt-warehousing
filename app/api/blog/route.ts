import { NextResponse } from 'next/server';
import blogData from '@/stagecoach-blog-data.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Use local blog data
    if (id) {
      // Get a single blog post
      const post = blogData.blogPosts.find(post => post.id.toString() === id);
      
      if (!post) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(post);
    } else {
      // Get all blog posts
      return NextResponse.json(blogData.blogPosts);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    return NextResponse.json(
      { error: 'This API is currently in read-only mode' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    return NextResponse.json(
      { error: 'This API is currently in read-only mode' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    return NextResponse.json(
      { error: 'This API is currently in read-only mode' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
