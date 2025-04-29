import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.muskanthreading.com',
        pathname: '/public/storage/**',
      },
    ],
  },
};

export default nextConfig;