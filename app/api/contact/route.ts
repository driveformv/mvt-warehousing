import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { sendContactNotification, sendContactConfirmation } from '@/lib/resend';

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
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Create a new contact submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: body.name,
          email: body.email,
          message: body.message,
          phone: body.phone || null,
          company: body.company || null,
          subject: body.subject || 'General Inquiry',
          status: 'unread'
        }
      ])
      .select();
    
    if (error) throw error;
    
    // Send notification email to admin
    try {
      await sendContactNotification({
        name: body.name,
        email: body.email,
        message: body.message,
        phone: body.phone,
        company: body.company,
        subject: body.subject,
        formName: 'contact_form'
      });
      
      // Send confirmation email to the user
      await sendContactConfirmation({
        name: body.name,
        email: body.email,
        subject: body.subject,
        formName: 'contact_form'
      });
    } catch (emailError) {
      // Log the error but don't fail the request
      console.error('Error sending email notifications:', emailError);
      // We still return success since the form data was saved to the database
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Your message has been sent successfully'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

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
    
    // This endpoint would typically be protected
    // Get all contact submissions
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Update the submission status
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({
        status: body.status || 'read'
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
}
