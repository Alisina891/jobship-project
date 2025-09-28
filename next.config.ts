/** @type {import('next').NextConfig} */

// PWA
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // برای placeholder ها
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      // Backend development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5071',
        pathname: '/uploads/**',
      },
      // Backend production (Vercel / Render URL)
      {
        protocol: 'https',
        hostname: 'jobship-backend-8.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      // برای هدایت API های فرانت به backend
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5071/api/:path*'
          : 'https://jobship-backend-8.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
