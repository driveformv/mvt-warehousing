import { createClient } from '@supabase/supabase-js';

// Debug: Log all environment variables

// Get Supabase credentials using the exact names from Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Check if we have the required environment variables
const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;

// Create the Supabase client only if we have the credentials
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to upload a file to Supabase Storage
export const uploadFile = async (
  bucketName: string,
  filePath: string,
  file: File
): Promise<{ path: string; error: Error | null }> => {
  if (!supabase) {
    console.error('Supabase client is not available');
    return { path: '', error: new Error('Supabase client is not available') };
  }

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading file:', error);
      return { path: '', error };
    }

    // Get the public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return { path: publicUrl, error: null };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return { path: '', error: error as Error };
  }
};

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
