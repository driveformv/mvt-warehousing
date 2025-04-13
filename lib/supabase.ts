import { createClient } from '@supabase/supabase-js';

// Debug: Log all environment variables
console.log('Environment variables available:');
console.log('process.env.SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('process.env.SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'defined' : 'undefined');
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

// Get Supabase credentials using the exact names from Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Check if we have the required environment variables
const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;

// Create the Supabase client only if we have the credentials
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl) {
    console.error('SUPABASE_URL is not defined');
  }
  if (!supabaseAnonKey) {
    console.error('SUPABASE_ANON_KEY is not defined');
  }
  return !!hasSupabaseCredentials;
};

// Helper function to get the Supabase URL
export const getSupabaseUrl = () => {
  if (!supabaseUrl) {
    console.error('SUPABASE_URL is not defined');
    return '';
  }
  return supabaseUrl;
};

// Helper function to get the Supabase anon key
export const getSupabaseAnonKey = () => {
  if (!supabaseAnonKey) {
    console.error('SUPABASE_ANON_KEY is not defined');
    return '';
  }
  return supabaseAnonKey;
};
