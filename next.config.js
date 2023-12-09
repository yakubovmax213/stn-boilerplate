/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
