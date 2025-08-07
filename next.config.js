// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disables type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disables ESLint during build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
