# Job Application System Setup

This document explains how to set up and configure the job application system for the MVT Warehousing website.

## Overview

The job application system allows users to submit job applications through the careers page. The applications are stored in a database and email notifications are sent to both the applicant and the HR team.

## Current Status

The job application system has been fully set up using the Supabase MCP (Model Context Protocol). The following components have been implemented:

1. A `job_applications` table has been created in the database to store all job applications
2. Email configurations have been added for both notification and confirmation emails
3. The careers page form has been connected to the API endpoint

## Database Setup

The `job_applications` table has been created in the Supabase database with the following structure:

```sql
CREATE TABLE IF NOT EXISTS job_applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  experience TEXT NOT NULL,
  resume TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'unread'
);
```

The table includes indexes for efficient querying:
```sql
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications (email);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications (status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON job_applications (created_at DESC);
```

### Automatic Table Creation

As a fallback, the API route at `app/api/careers/apply/route.ts` will attempt to create the table automatically if it doesn't exist. This is done by:

1. Checking if the table exists
2. If not, attempting to create it by inserting a temporary record
3. Deleting the temporary record if successful

## Email Configuration

The job application system uses the same email infrastructure as the contact form. The following email configurations have been added to the `email_config` table:

### Notification to HR (job_application_form)
- From: noreply@mvtwarehousing.com
- To: sanhe@m-v-t.com, jackie.jones@verdelogistics.com, virginia.renteria@m-v-t.com
- Subject Template: New Job Application: {{position}}
- Content: Includes applicant's name, email, phone, position, experience, resume, and any additional information provided

### Confirmation to Applicant (job_application_form_confirmation)
- From: careers@mvtwarehousing.com
- To: {{email}} (applicant's email)
- BCC: sanhe@m-v-t.com
- Subject Template: Your Job Application to MVT Warehousing

## Testing the System

To test if the job application system is working:

1. Go to the Careers page
2. Fill out and submit the application form
3. Check if you receive a confirmation email
4. Check if the HR team receives a notification email
5. Verify that the application is stored in the database by checking the `job_applications` table in Supabase

## Troubleshooting

If applications are not being submitted or emails are not being sent:

1. Check the browser console for any JavaScript errors
2. Check the server logs for any API errors
3. Verify that the Supabase connection is working
4. Verify that the Resend API key is configured correctly
5. Check if the `job_applications` table exists in the database
6. Check if the email configurations exist in the `email_config` table

## Resume Storage and Email Attachments

The job application system now includes file storage for resumes using Supabase Storage and email attachments:

1. A private `resumes` storage bucket has been created in Supabase to store resume files
2. When an applicant submits a resume, the file is:
   - Uploaded to the Supabase Storage bucket with a unique filename
   - The URL to the file is stored in the database
   - The file is attached directly to the email notification sent to the HR team
   - The URL is also included in the email message as a backup

The resume upload process works as follows:

1. The applicant selects a resume file (PDF, DOC, or DOCX) using the file input
2. When the form is submitted, the file is sent to the server using FormData
3. The server uploads the file to Supabase Storage with a unique filename based on the applicant's name and timestamp
4. The server also converts the file to a Buffer and attaches it directly to the email notification
5. The URL to the file is stored in the database and included in the email message as a backup

This implementation ensures that:
- Resume files are securely stored in Supabase Storage for long-term access
- HR staff receive the resume as a direct attachment in the email notification
- If the attachment fails for any reason, HR staff can still access the resume via the URL in the email
- The files are organized with unique filenames to prevent conflicts
