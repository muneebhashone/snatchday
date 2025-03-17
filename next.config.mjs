/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "res.cloudinary.com"],
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
