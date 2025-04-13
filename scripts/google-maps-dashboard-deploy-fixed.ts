/**
 * TypeScript script for deploying the Google Maps Edge Function
 * This version is compatible with Node.js and doesn't use Deno-specific imports
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

// ANSI color codes for terminal output
const COLORS = {
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m'
};

// Load environment variables from .env.local
function loadEnvVars() {
  try {
    // Try to load from .env.local first
    const envLocalPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      console.log(`${COLORS.GREEN}Loading environment variables from .env.local${COLORS.RESET}`);
      const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
      
      // Set environment variables
      for (const key in envConfig) {
        process.env[key] = envConfig[key];
      }
      
      return true;
    }
    
    // Fall back to .env if .env.local doesn't exist
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      console.log(`${COLORS.YELLOW}Loading environment variables from .env${COLORS.RESET}`);
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      
      // Set environment variables
      for (const key in envConfig) {
        process.env[key] = envConfig[key];
      }
      
      return true;
    }
    
    console.log(`${COLORS.YELLOW}No .env or .env.local file found${COLORS.RESET}`);
    return false;
  } catch (error) {
    console.error(`${COLORS.RED}Error loading environment variables:${COLORS.RESET}`, error);
    return false;
  }
}

// Deploy the Google Maps Edge Function
async function deployGoogleMapsFunction() {
  console.log(`${COLORS.YELLOW}Deploying Google Maps Edge Function...${COLORS.RESET}`);
  
  // Load environment variables
  loadEnvVars();
  
  // Check if Google Maps API key is set
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error(`${COLORS.RED}Error: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set${COLORS.RESET}`);
    console.log('Please set it in .env.local or provide it as an environment variable');
    process.exit(1);
  }
  
  try {
    // Set Supabase secrets
    console.log(`${COLORS.YELLOW}Setting Supabase secrets...${COLORS.RESET}`);
    execSync(`supabase secrets set GOOGLE_MAPS_API_KEY=${apiKey}`, { stdio: 'inherit' });
    
    // Deploy the function
    console.log(`${COLORS.YELLOW}Deploying Google Maps function...${COLORS.RESET}`);
    execSync('supabase functions deploy google-maps --no-verify-jwt', { stdio: 'inherit' });
    
    // Get the Supabase project URL
    console.log(`${COLORS.GREEN}Google Maps function deployed successfully!${COLORS.RESET}`);
    console.log(`${COLORS.YELLOW}Testing the API key endpoint...${COLORS.RESET}`);
    
    try {
      const statusOutput = execSync('supabase status', { encoding: 'utf8' });
      const apiUrlMatch = statusOutput.match(/API URL:\s+(\S+)/);
      
      if (apiUrlMatch && apiUrlMatch[1]) {
        const projectUrl = apiUrlMatch[1];
        console.log(`${COLORS.GREEN}Your Google Maps API key endpoint is available at:${COLORS.RESET}`);
        console.log(`${projectUrl}/functions/v1/google-maps/api-key`);
        console.log(`${COLORS.YELLOW}You can test it with:${COLORS.RESET}`);
        console.log(`curl -X GET ${projectUrl}/functions/v1/google-maps/api-key -H "Authorization: Bearer $SUPABASE_ANON_KEY"`);
      } else {
        console.log(`${COLORS.YELLOW}Couldn't determine your Supabase project URL.${COLORS.RESET}`);
        console.log('Please check your function in the Supabase dashboard.');
      }
    } catch (error) {
      console.log(`${COLORS.YELLOW}Couldn't determine your Supabase project URL.${COLORS.RESET}`);
      console.log('Please check your function in the Supabase dashboard.');
    }
    
    console.log(`${COLORS.GREEN}Done!${COLORS.RESET}`);
  } catch (error) {
    console.error(`${COLORS.RED}Deployment failed:${COLORS.RESET}`, error);
    process.exit(1);
  }
}

// Run the deployment
deployGoogleMapsFunction().catch(error => {
  console.error(`${COLORS.RED}Unhandled error:${COLORS.RESET}`, error);
  process.exit(1);
});
