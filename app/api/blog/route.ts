import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.error('Supabase is not configured');
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      // Get a single blog post
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(data);
    } else {
      // Get all blog posts
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      
      return NextResponse.json(data);
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
