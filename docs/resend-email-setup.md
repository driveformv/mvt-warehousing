# Setting Up Resend for Email Notifications

This document explains how to set up Resend to send email notifications from `noreply@mvtwarehousing.com` with Supabase email configuration management.

## What is Resend?

[Resend](https://resend.com) is an email API service designed for developers. It provides a simple way to send transactional emails from your application.

## Setup Steps

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Verify your email address

### 2. Add Your Domain

1. In the Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter `mvtwarehousing.com` as your domain
4. Follow the DNS verification steps provided by Resend:
   - Add the provided TXT records to your domain's DNS settings
   - Add the DKIM records to your domain's DNS settings
   - Wait for DNS verification to complete (this can take up to 24-48 hours)

### 3. Get Your API Key

1. In the Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give your API key a name (e.g., "MVT Warehousing Production")
4. Copy the generated API key

### 4. Environment Variables

The Resend API key has already been added to the following environment files:
- `.env`
- `.env.development`
- `.env.local`

For production, you should add the API key to your hosting environment (e.g., Vercel):
- Go to your project settings in Vercel
- Add an environment variable named `RESEND_API_KEY` with your API key

### 5. Set Up Email Configuration in Supabase

We've created a Supabase table to manage email configuration. To set it up:

1. Run the migration script:
   ```
   node scripts/apply-email-config-migration.js
   ```

2. This will create an `email_config` table with default configurations for:
   - Contact form notifications (`contact_notification`)
   - Contact form confirmations (`contact_confirmation`)
   - Test emails (`test_email`)

## Testing Your Setup

We've included a test endpoint to verify your Resend configuration:

1. Start your development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/api/test-email?to=your-email@example.com
   ```
   Replace `your-email@example.com` with your actual email address.

3. If everything is set up correctly, you should receive a test email from `noreply@mvtwarehousing.com`

## Managing Email Configuration

### Admin Interface Options

We've created two ways to manage email configurations:

1. **Global Admin Interface**: Access all email configurations at:
   ```
   http://localhost:3000/admin/email-config
   ```

2. **Form-Specific Configuration**: Each form has its own email configuration that can be managed directly from the form itself. To access this:
   - Go to the contact page with admin parameter: `http://localhost:3000/contact?admin=true`
   - Click the "Email Settings" button at the top of the form

Both interfaces allow you to:
- Create new configurations
- Edit existing configurations
- Test configurations by sending test emails
- Toggle configurations active/inactive

### Email Configuration Table Structure

The `email_config` table has the following structure:

| Column           | Type      | Description                                      |
|------------------|-----------|--------------------------------------------------|
| id               | UUID      | Primary key                                      |
| name             | VARCHAR   | Unique name for the configuration                |
| from_email       | VARCHAR   | Sender email address                             |
| to_emails        | TEXT[]    | Array of recipient email addresses               |
| cc_emails        | TEXT[]    | Array of CC email addresses (optional)           |
| bcc_emails       | TEXT[]    | Array of BCC email addresses (optional)          |
| subject_template | VARCHAR   | Email subject template (optional)                |
| active           | BOOLEAN   | Whether this configuration is active             |
| created_at       | TIMESTAMP | Creation timestamp                               |
| updated_at       | TIMESTAMP | Last update timestamp                            |

### Template Variables

You can use template variables in email addresses and subject templates:

- In the `to_emails`, `cc_emails`, and `bcc_emails` fields, you can use variables like `{{email}}` which will be replaced with the actual email address from the form submission.
- In the `subject_template` field, you can use variables like `{{subject}}` which will be replaced with the actual subject from the form submission.

Available variables:
- `{{name}}` - The name of the person who submitted the form
- `{{email}}` - The email address of the person who submitted the form
- `{{subject}}` - The subject of the form submission
- `{{phone}}` - The phone number (if provided)
- `{{company}}` - The company name (if provided)

### Default Configurations

The system comes with three default configurations:

1. **Contact Form** (`contact_form`)
   - Configuration for the main contact form
   - From: noreply@mvtwarehousing.com
   - To: info@mvtwarehousing.com
   - Subject: New Contact Form Submission: {{subject}}

2. **Contact Notification** (`contact_notification`)
   - Sends notifications to administrators when a contact form is submitted
   - From: noreply@mvtwarehousing.com
   - To: info@mvtwarehousing.com
   - Subject: New Contact Form Submission: {{subject}}

3. **Contact Confirmation** (`contact_confirmation`)
   - Sends confirmation emails to users who submit the contact form
   - From: noreply@mvtwarehousing.com
   - To: {{email}} (the email of the person who submitted the form)
   - Subject: Thank you for contacting MVT Warehousing

4. **Test Email** (`test_email`)
   - Used for testing the email configuration
   - From: noreply@mvtwarehousing.com
   - To: {{email}} (the test email address)
   - Subject: Test Email from MVT Warehousing

You can modify these configurations or create new ones using either admin interface.

## How It Works

The integration is set up to:

1. Fetch email configuration from Supabase when sending emails
2. Replace template variables with actual values
3. Send emails using Resend with the configured sender and recipients
4. Fall back to default values if no configuration is found

## Customizing Email Templates

The email templates are defined in `lib/resend.ts`. You can modify the HTML content to customize the appearance and content of the emails.

## Troubleshooting

If you encounter issues:

1. Check that your API key is correctly set in the environment variables
2. Verify that your domain has been properly verified in the Resend dashboard
3. Check the server logs for any error messages
4. Use the test endpoint to diagnose issues
5. Verify that the email configuration exists in Supabase

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [Supabase Documentation](https://supabase.com/docs)
