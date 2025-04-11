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
};

module.exports = nextConfig;
