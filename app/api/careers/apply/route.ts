import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, uploadFile } from '@/lib/supabase';
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
    
    // Parse the multipart form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string || '';
    const resumeFile = formData.get('resume') as File | null;
    
    // Validate required fields
    if (!name || !email || !phone || !position || !experience) {
      return NextResponse.json(
        { error: 'Name, email, phone, position, and experience are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Upload resume file to Supabase Storage if provided
    let resumeUrl = '';
    if (resumeFile) {
      try {
        // Create a unique filename using the applicant's name and timestamp
        const timestamp = new Date().getTime();
        const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileExt = resumeFile.name.split('.').pop();
        const filePath = `${safeName}_${timestamp}.${fileExt}`;
        
        // Upload the file to Supabase Storage
        const { path, error: uploadError } = await uploadFile('resumes', filePath, resumeFile);
        
        if (uploadError) {
          console.error('Error uploading resume:', uploadError);
        } else {
          resumeUrl = path;
        }
      } catch (uploadError) {
        console.error('Error in file upload process:', uploadError);
      }
    }
    
    // Create a new job application
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        {
          name: name,
          email: email,
          phone: phone,
          position: position,
          experience: experience,
          resume: resumeUrl || resumeFile?.name || null,
          message: message || null,
          status: 'unread'
        }
      ])
      .select();
    
    if (error) {
      console.error('Error inserting job application:', error);
      throw error;
    }
    
    // Send notification email to HR/admin
    try {
      // Create a more detailed message that includes the resume
      const detailedMessage = `
Position: ${position}
Experience: ${experience}
${resumeUrl ? `Resume/CV: ${resumeUrl}` : (resumeFile?.name ? `Resume/CV: ${resumeFile.name}` : '')}
${message ? `\nAdditional Information:\n${message}` : ''}
      `;
      
      // Prepare attachments if resume file is available
      const attachments = [];
      if (resumeFile) {
        try {
          // Convert the file to a Buffer
          const arrayBuffer = await resumeFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          // Add the resume as an attachment
          attachments.push({
            filename: resumeFile.name,
            content: buffer
          });
        } catch (attachmentError) {
          console.error('Error preparing resume attachment:', attachmentError);
        }
      }
      
      await sendContactNotification({
        name: name,
        email: email,
        message: detailedMessage,
        phone: phone,
        subject: `Job Application - ${position}`,
        formName: 'job_application_form',
        attachments: attachments
      });
      
      // Send confirmation email to the applicant
      await sendContactConfirmation({
        name: name,
        email: email,
        subject: `Job Application - ${position}`,
        formName: 'job_application_form_confirmation'
      });
    } catch (emailError) {
      // Log the error but don't fail the request
      console.error('Error sending email notifications:', emailError);
      // We still return success since the form data was saved to the database
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Your application has been submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting job application:', error);
    return NextResponse.json(
      { error: 'Failed to submit job application' },
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
    // Get all job applications
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job applications' },
      { status: 500 }
    );
  }
}
