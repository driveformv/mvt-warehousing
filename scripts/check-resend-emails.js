require('dotenv').config();
const { Resend } = require('resend');

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('Error: RESEND_API_KEY must be set in environment variables');
  process.exit(1);
}

const resend = new Resend(resendApiKey);

async function checkRecentEmails() {
  try {
    console.log('Checking recent emails sent through Resend...');
    
    // Get emails sent in the last hour
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
    
    const { data, error } = await resend.emails.list({
      limit: 10,
    });
    
    if (error) {
      console.error('Error fetching emails:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No emails found in the recent history.');
      return;
    }
    
    console.log(`Found ${data.length} recent emails:`);
    
    // Display emails in a table format
    console.table(data.map(email => ({
      id: email.id,
      from: email.from,
      to: email.to,
      subject: email.subject,
      status: email.status,
      created_at: new Date(email.created_at).toLocaleString()
    })));
    
    // Check specifically for test emails
    const testEmails = data.filter(email => 
      email.subject?.includes('Test Email') || 
      email.to?.includes('test@example.com')
    );
    
    if (testEmails.length > 0) {
      console.log('\nFound test emails:');
      console.table(testEmails.map(email => ({
        id: email.id,
        from: email.from,
        to: email.to,
        subject: email.subject,
        status: email.status,
        created_at: new Date(email.created_at).toLocaleString()
      })));
    } else {
      console.log('\nNo test emails found in the recent history.');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkRecentEmails();
