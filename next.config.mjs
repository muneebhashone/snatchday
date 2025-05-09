/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v2/:path*",
        destination: "https://test-node-vercel-production.up.railway.app/:path*",
        has: [{
          type: 'header',
          key: 'x-forwarded-for'
        }]
      },
    ];
  },
  images: {
    unoptimized: false,
    domains: [
      "res.cloudinary.com",
      "encrypted-tbn0.gstatic.com,",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "snatch-day.s3.amazonaws.com",
      "media.itscope.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignores ESLint errors during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
