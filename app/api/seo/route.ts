import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.error('Supabase is not configured');
      // Return default metadata
      return NextResponse.json({
        title: 'MVT Warehousing',
        description: 'MVT Warehousing provides logistics and warehousing solutions',
        keywords: ['warehousing', 'logistics', 'transportation'],
        path: '/'
      });
    }
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (!path) {
      // Get all SEO metadata
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('*');
      
      if (error) throw error;
      
      return NextResponse.json(data);
    } else {
      // Get SEO metadata for a specific path
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('*')
        .eq('path', path)
        .single();
      
      if (error) {
        // If no metadata found for this path, return default
        if (error.code === 'PGRST116') {
          return NextResponse.json({
            title: 'MVT Warehousing',
            description: 'MVT Warehousing provides logistics and warehousing solutions',
            keywords: ['warehousing', 'logistics', 'transportation'],
            path: path
          });
        }
        throw error;
      }
      
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO metadata' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.error('Supabase is not configured');
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.path || !body.title || !body.description) {
      return NextResponse.json(
        { error: 'Path, title, and description are required' },
        { status: 400 }
      );
    }
    
    // Check if metadata for this path already exists
    const { data: existingData, error: checkError } = await supabase
      .from('seo_metadata')
      .select('id')
      .eq('path', body.path)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    if (existingData) {
      // Update existing metadata
      const { data, error } = await supabase
        .from('seo_metadata')
        .update({
          title: body.title,
          description: body.description,
          keywords: body.keywords || [],
          og_image: body.ogImage || null,
          updated_at: new Date()
        })
        .eq('id', existingData.id)
        .select();
      
      if (error) throw error;
      
      return NextResponse.json(data[0]);
    } else {
      // Create new metadata
      const { data, error } = await supabase
        .from('seo_metadata')
        .insert([
          {
            path: body.path,
            title: body.title,
            description: body.description,
            keywords: body.keywords || [],
            og_image: body.ogImage || null
          }
        ])
        .select();
      
      if (error) throw error;
      
      return NextResponse.json(data[0]);
    }
  } catch (error) {
    console.error('Error saving SEO metadata:', error);
    return NextResponse.json(
      { error: 'Failed to save SEO metadata' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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
    
    if (!id) {
      return NextResponse.json(
        { error: 'Metadata ID is required' },
        { status: 400 }
      );
    }
    
    // Delete the metadata
    const { error } = await supabase
      .from('seo_metadata')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting SEO metadata:', error);
    return NextResponse.json(
      { error: 'Failed to delete SEO metadata' },
      { status: 500 }
    );
  }
}
