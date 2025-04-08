/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "encrypted-tbn0.gstatic.com,",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "snatch-day.s3.amazonaws.com",
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
