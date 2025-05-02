import { Resend } from 'resend';
import { supabase, isSupabaseConfigured } from './supabase';

// Initialize the Resend client with the API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;

// Check if the API key is available
if (!resendApiKey) {
  console.warn('RESEND_API_KEY is not defined in environment variables');
}

// Create and export the Resend client
export const resend = new Resend(resendApiKey);

// Interface for email configuration
interface EmailConfig {
  id: string;
  name: string;
  from_email: string;
  to_emails: string[];
  cc_emails?: string[];
  bcc_emails?: string[];
  subject_template?: string;
  active: boolean;
}

// Function to get email configuration from Supabase
export async function getEmailConfig(configName: string): Promise<EmailConfig | null> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase is not configured, using default email config');
      return null;
    }
    
    // Query the email_config table
    const { data, error } = await supabase
      .from('email_config')
      .select('*')
      .eq('name', configName)
      .eq('active', true)
      .single();
    
    if (error) {
      console.error('Error fetching email configuration:', error);
      return null;
    }
    
    return data as EmailConfig;
  } catch (error) {
    console.error('Error in getEmailConfig:', error);
    return null;
  }
}

// Function to replace template variables in strings
function replaceTemplateVariables(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
}

// Function to process email addresses with template variables
function processEmailAddresses(emails: string[], variables: Record<string, string>): string[] {
  return emails.map(email => replaceTemplateVariables(email, variables));
}

// Function to create a template variable replacer function
function createVariableReplacer(variables: Record<string, string>): (template: string) => string {
  return (template: string) => replaceTemplateVariables(template, variables);
}

// Function to send a notification email when a contact form is submitted
export async function sendContactNotification({
  name,
  email,
  message,
  phone,
  company,
  subject,
  formName = 'contact_form',
  attachments = []
}: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  subject?: string;
  formName?: string;
  attachments?: {
    filename: string;
    content: Buffer;
  }[];
}) {
  try {
    // First try to get form-specific configuration
    let config = await getEmailConfig(formName);
    
    // If no form-specific config, fall back to generic notification config
    if (!config) {
      config = await getEmailConfig('contact_notification');
    }
    
    // Variables for template replacement
    const variables = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject: subject || 'General Inquiry'
    };
    
    // Default values if no configuration is found
    const fromEmail = config?.from_email || 'noreply@mvtwarehousing.com';
    const toEmails = config ? processEmailAddresses(config.to_emails, variables) : ['info@mvtwarehousing.com'];
    const ccEmails = config?.cc_emails ? processEmailAddresses(config.cc_emails, variables) : [];
    const bccEmails = config?.bcc_emails ? processEmailAddresses(config.bcc_emails, variables) : [];
    const subjectTemplate = config?.subject_template || 'New Contact Form Submission: {{subject}}';
    const emailSubject = replaceTemplateVariables(subjectTemplate, variables);
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      bcc: bccEmails.length > 0 ? bccEmails : undefined,
      subject: emailSubject,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${attachments.length > 0 ? '<p><strong>Attachments:</strong> See attached files</p>' : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return response;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    throw error;
  }
}

// Function to send a confirmation email to the user who submitted the form
export async function sendContactConfirmation({
  name,
  email,
  subject,
  formName = 'contact_form'
}: {
  name: string;
  email: string;
  subject?: string;
  formName?: string;
}) {
  try {
    // First try to get form-specific confirmation configuration
    let config = await getEmailConfig(`${formName}_confirmation`);
    
    // If no form-specific config, fall back to generic confirmation config
    if (!config) {
      config = await getEmailConfig('contact_confirmation');
    }
    
    // Variables for template replacement
    const variables = {
      name,
      email,
      subject: subject || 'General Inquiry'
    };
    
    // Default values if no configuration is found
    const fromEmail = config?.from_email || 'noreply@mvtwarehousing.com';
    const toEmails = config ? processEmailAddresses(config.to_emails, variables) : [email];
    const ccEmails = config?.cc_emails ? processEmailAddresses(config.cc_emails, variables) : [];
    const bccEmails = config?.bcc_emails ? processEmailAddresses(config.bcc_emails, variables) : [];
    const subjectTemplate = config?.subject_template || 'Thank you for contacting MVT Warehousing';
    const emailSubject = replaceTemplateVariables(subjectTemplate, variables);
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      bcc: bccEmails.length > 0 ? bccEmails : undefined,
      subject: emailSubject,
      html: `
        <h1>Thank you for contacting MVT Warehousing</h1>
        <p>Dear ${name},</p>
        <p>We have received your inquiry regarding "${subject || 'General Inquiry'}".</p>
        <p>Our team will review your message and get back to you as soon as possible.</p>
        <p>Thank you for your interest in MVT Warehousing.</p>
        <p>Best regards,</p>
        <p>The MVT Warehousing Team</p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    throw error;
  }
}
