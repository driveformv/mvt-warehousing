require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addContactFormConfig() {
  try {
    console.log('Adding contact_form configuration...');
    
    // Check if contact_form config already exists
    const { data: existingConfig, error: checkError } = await supabase
      .from('email_config')
      .select('*')
      .eq('name', 'contact_form')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for existing config:', checkError);
      return;
    }
    
    if (existingConfig) {
      console.log('contact_form configuration already exists:', existingConfig);
      return;
    }
    
    // Insert contact_form configuration
    const { data, error } = await supabase
      .from('email_config')
      .insert([
        {
          name: 'contact_form',
          from_email: 'noreply@mvtwarehousing.com',
          to_emails: ['info@mvtwarehousing.com'],
          cc_emails: [],
          bcc_emails: [],
          subject_template: 'New Contact Form Submission: {{subject}}',
          active: true
        }
      ])
      .select();
    
    if (error) {
      console.error('Error creating contact_form config:', error);
      return;
    }
    
    console.log('Successfully created contact_form configuration:', data);
    
    // List all configurations
    const { data: allConfigs, error: listError } = await supabase
      .from('email_config')
      .select('*')
      .order('name');
    
    if (listError) {
      console.error('Error listing configurations:', listError);
      return;
    }
    
    console.log('\nAll email configurations:');
    console.table(allConfigs);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

addContactFormConfig();
