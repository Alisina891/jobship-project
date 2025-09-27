/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https', // ✅ تغییر به https
        hostname: 'jobship-backend-8.onrender.com', // ✅ تغییر به آدرس واقعی
        port: '', // ✅ پورت خالی
        pathname: '/uploads/**',
      },
      // ✅ اضافه کردن برای local development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5071',
        pathname: '/uploads/**',
      },
    ],
  },
  // ✅ اضافه کردن rewrites برای API calls
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 
          process.env.NODE_ENV === 'production' 
            ? 'https://jobship-backend-8.onrender.com/api/:path*' // Production
            : 'http://localhost:5071/api/:path*' // Development
      }
    ];
  },
  // ✅ اضافه کردن env variable
  env: {
    API_URL: 
      process.env.NODE_ENV === 'production'
        ? 'https://jobship-backend-8.onrender.com'
        : 'http://localhost:5071'
  }
};

module.exports = withPWA(nextConfig);