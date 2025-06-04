import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'muskan.infinitygalactech.com',
        pathname: '/public/storage/**',
      },
    ],
    unoptimized: true, // Required for static export with remote images
  },
};

export default nextConfig;