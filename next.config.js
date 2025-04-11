/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing 'output: export' to allow dynamic routes to work properly
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
