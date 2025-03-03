/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://snatch.3.135.13.79.nip.io*',
      },
    ];
  },
};

export default nextConfig;
