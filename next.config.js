/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip linting and type checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure images
  images: { 
    unoptimized: true 
  },
  // Disable static generation
  output: 'standalone',
  // Disable React strict mode to avoid double rendering
  reactStrictMode: false,
  // Environment variables
  env: {
    SUPABASE_URL: 'https://mfpltrfjfzcxfiqrzlnr.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGx0cmZqZnpjeGZpcXJ6bG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDE3MDcsImV4cCI6MjA1OTkxNzcwN30.48MINNnAKRdGyElObnv0R2ynAYc2sEjGUElennVeaus',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcGx0cmZqZnpjeGZpcXJ6bG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDE3MDcsImV4cCI6MjA1OTkxNzcwN30.48MINNnAKRdGyElObnv0R2ynAYc2sEjGUElennVeaus',
  },
};

module.exports = nextConfig;
