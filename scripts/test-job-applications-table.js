// Script to test if the job_applications table was created
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

async function testTable() {
  try {
    console.log('Testing job_applications table...');
    
    // First, check if the table exists by querying it
    const { data: tableData, error: tableError } = await supabase
      .from('job_applications')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('Error querying job_applications table:', tableError);
      console.log('The table might not exist. Creating it manually...');
      
      // Try to create the table manually
      const createTableSQL = `
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
      `;
      
      // Execute the SQL directly
      const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      if (createError) {
        console.error('Error creating table with exec_sql:', createError);
        
        // Try with a different RPC function name
        const { error: createError2 } = await supabase.rpc('execute_sql', { sql: createTableSQL });
        
        if (createError2) {
          console.error('Error creating table with execute_sql:', createError2);
          console.log('Could not create the table automatically. Please create it manually.');
          process.exit(1);
        }
      }
      
      console.log('Table created successfully!');
    } else {
      console.log('Job applications table exists!');
    }
    
    // Insert a test record
    const { data: insertData, error: insertError } = await supabase
      .from('job_applications')
      .insert([
        {
          name: 'Test User',
          email: 'test@example.com',
          phone: '555-123-4567',
          position: 'Test Position',
          experience: '1-3',
          message: 'This is a test application',
          status: 'test'
        }
      ])
      .select();
    
    if (insertError) {
      console.error('Error inserting test record:', insertError);
      process.exit(1);
    }
    
    console.log('Test record inserted successfully:', insertData);
    
    // Clean up the test record
    const { error: deleteError } = await supabase
      .from('job_applications')
      .delete()
      .eq('email', 'test@example.com')
      .eq('status', 'test');
    
    if (deleteError) {
      console.error('Error deleting test record:', deleteError);
    } else {
      console.log('Test record deleted successfully');
    }
    
    console.log('Job applications table is working correctly!');
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Run the test
testTable();
