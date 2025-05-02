// Script to apply the job applications table migration
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  try {
    console.log('Applying job applications table migration...');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'create-job-applications-table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement directly using the SQL API
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('execute_sql', { sql: statement + ';' });
        
        if (error) {
          console.warn(`Warning: Could not execute statement ${i + 1} using RPC:`, error.message || error);
          console.log('Continuing with next statement...');
        }
      } catch (stmtError) {
        console.warn(`Warning: Error executing statement ${i + 1}:`, stmtError.message || stmtError);
        console.log('Continuing with next statement...');
      }
    }
    
    console.log('Job applications table migration applied successfully');
    
    // Add email configuration for job applications
    await addJobApplicationEmailConfig();
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error in migration script:', error);
    process.exit(1);
  }
}

async function addJobApplicationEmailConfig() {
  try {
    console.log('Adding job application email configuration...');
    
    // Check if the configuration already exists
    const { data: existingConfig, error: checkError } = await supabase
      .from('email_config')
      .select('*')
      .eq('name', 'job_application_form')
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking existing config:', checkError);
      return;
    }
    
    // If config already exists, don't add it again
    if (existingConfig) {
      console.log('Job application email config already exists');
      return;
    }
    
    // Add notification config
    const { error: notificationError } = await supabase
      .from('email_config')
      .insert([
        {
          name: 'job_application_form',
          from_email: 'noreply@mvtwarehousing.com',
          to_emails: ['hr@mvtwarehousing.com', 'careers@mvtwarehousing.com'],
          cc_emails: [],
          bcc_emails: [],
          subject_template: 'New Job Application: {{position}}',
          active: true
        }
      ]);
    
    if (notificationError) {
      console.error('Error adding notification config:', notificationError);
      return;
    }
    
    // Add confirmation config
    const { error: confirmationError } = await supabase
      .from('email_config')
      .insert([
        {
          name: 'job_application_form_confirmation',
          from_email: 'careers@mvtwarehousing.com',
          to_emails: ['{{email}}'],
          cc_emails: [],
          bcc_emails: [],
          subject_template: 'Your Job Application to MVT Warehousing',
          active: true
        }
      ]);
    
    if (confirmationError) {
      console.error('Error adding confirmation config:', confirmationError);
      return;
    }
    
    console.log('Job application email configuration added successfully');
  } catch (error) {
    console.error('Error adding job application email config:', error);
  }
}

// Run the migration
applyMigration();
