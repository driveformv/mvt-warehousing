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
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'create-email-config-table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Applying email config migration...');
    
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
        const { error } = await supabase.rpc('execute_sql', { sql: statement + ';' }).catch(err => {
          return { error: err };
        });
        
        if (error) {
          console.warn(`Warning: Could not execute statement ${i + 1} using RPC:`, error.message || error);
          console.log('Continuing with next statement...');
        }
      } catch (stmtError) {
        console.warn(`Warning: Error executing statement ${i + 1}:`, stmtError.message || stmtError);
        console.log('Continuing with next statement...');
      }
    }
    
    // Check if the table exists
    try {
      console.log('Checking if email_config table was created...');
      
      // Try to select from the table to see if it exists
      const { data, error: tableError } = await supabase
        .from('email_config')
        .select('*')
        .limit(10);
      
      if (tableError) {
        console.error('Error verifying table creation:', tableError);
        console.log('You may need to manually create the table using the SQL in create-email-config-table.sql');
      } else if (data && data.length > 0) {
        console.log('Email configuration table created with default settings:');
        console.table(data);
      } else {
        console.log('Email configuration table was created but has no data.');
        console.log('You may need to manually insert the default configurations.');
      }
    } catch (verifyError) {
      console.error('Error verifying table creation:', verifyError);
    }
    
    console.log('\nMigration process completed.');
    console.log('If you encountered errors, you may need to manually execute the SQL statements in the Supabase dashboard.');
    console.log('SQL file path:', sqlFilePath);
    
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

applyMigration();
