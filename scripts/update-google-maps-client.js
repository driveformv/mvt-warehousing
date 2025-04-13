/**
 * This script updates the Google Maps API client code to use the anon key for authentication
 * when calling the Edge Function deployed with --no-verify-jwt
 */

const fs = require('fs');
const path = require('path');

// Path to the Google Maps API client file
const apiFilePath = path.join(__dirname, '../lib/google-maps-api.ts');

try {
  // Read the current file content
  const fileContent = fs.readFileSync(apiFilePath, 'utf8');
  
  // Check if the file already has the anon key implementation
  if (fileContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
    console.log('The file already has the anon key implementation.');
    process.exit(0);
  }
  
  // Replace the auth header code with anon key implementation
  const updatedContent = fileContent.replace(
    /let authHeader = \{\};\s+if \(supabase\?\.auth\) \{\s+try \{\s+const \{ data \} = await supabase\.auth\.getSession\(\);\s+if \(data\?\.session\?\.access_token\) \{\s+authHeader = \{ Authorization: `Bearer \$\{data\.session\.access_token\}` \};\s+\}\s+\} catch \(e\) \{\s+console\.warn\('Failed to get auth session:', e\);\s+\}\s+\}/g,
    `let authHeader = {};
    // Use the anon key for authentication since the Edge Function is deployed with --no-verify-jwt
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      authHeader = { Authorization: \`Bearer \${anonKey}\` };
    } else {
      // Fall back to session token if available
      if (supabase?.auth) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.access_token) {
            authHeader = { Authorization: \`Bearer \${data.session.access_token}\` };
          }
        } catch (e) {
          console.warn('Failed to get auth session:', e);
        }
      }
    }`
  );
  
  // Write the updated content back to the file
  fs.writeFileSync(apiFilePath, updatedContent);
  
  console.log('Successfully updated the Google Maps API client code to use the anon key.');
  console.log('The client will now use the anon key for authentication when calling the Edge Function.');
  
} catch (error) {
  console.error('Error updating the Google Maps API client code:', error.message);
}
