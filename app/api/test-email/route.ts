import { NextResponse } from 'next/server';
import { resend, getEmailConfig } from '@/lib/resend';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not defined in environment variables' },
        { status: 503 }
      );
    }
    
    // Get the recipient email from query parameters
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    const configName = searchParams.get('config') || 'test_email';
    
    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required as a query parameter "to"' },
        { status: 400 }
      );
    }
    
    // Get email configuration from Supabase
    const config = await getEmailConfig(configName);
    
    // Variables for template replacement
    const variables: Record<string, string> = {
      email: to,
      timestamp: new Date().toISOString()
    };
    
    // Function to replace template variables
    const replaceVariables = (template: string): string => {
      return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return variables[key] || match;
      });
    };
    
    // Default values if no configuration is found
    let fromEmail = 'noreply@mvtwarehousing.com';
    let toEmails = [to];
    let ccEmails: string[] = [];
    let bccEmails: string[] = [];
    let subject = 'Test Email from MVT Warehousing';
    
    // If config exists, use it
    if (config) {
      fromEmail = config.from_email;
      
      // Process email addresses with template variables
      toEmails = config.to_emails.map(replaceVariables);
      
      if (config.cc_emails && config.cc_emails.length > 0) {
        ccEmails = config.cc_emails.map(replaceVariables);
      }
      
      if (config.bcc_emails && config.bcc_emails.length > 0) {
        bccEmails = config.bcc_emails.map(replaceVariables);
      }
      
      if (config.subject_template) {
        subject = replaceVariables(config.subject_template);
      }
    } else {
      // If no config found but Supabase is configured, create a test config
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase
            .from('email_config')
            .insert([
              {
                name: 'test_email',
                from_email: 'noreply@mvtwarehousing.com',
                to_emails: ['{{email}}'],
                cc_emails: [],
                bcc_emails: [],
                subject_template: 'Test Email from MVT Warehousing',
                active: true
              }
            ])
            .select();
            
          if (error) {
            console.error('Error creating test email config:', error);
          } else {
            console.log('Created test email config:', data);
          }
        } catch (err) {
          console.error('Error creating test email config:', err);
        }
      }
    }
    
    // Send a test email
    const response = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      bcc: bccEmails.length > 0 ? bccEmails : undefined,
      subject: subject,
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from MVT Warehousing using Resend with Supabase email configuration.</p>
        <p>If you're receiving this email, it means your Resend configuration is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
        <hr>
        <h2>Email Configuration</h2>
        <p><strong>Configuration Name:</strong> ${configName}</p>
        <p><strong>From:</strong> ${fromEmail}</p>
        <p><strong>To:</strong> ${toEmails.join(', ')}</p>
        ${ccEmails.length > 0 ? `<p><strong>CC:</strong> ${ccEmails.join(', ')}</p>` : ''}
        ${bccEmails.length > 0 ? `<p><strong>BCC:</strong> ${bccEmails.join(', ')}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
      `,
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully',
      data: response
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error },
      { status: 500 }
    );
  }
}
