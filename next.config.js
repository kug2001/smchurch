/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coresos-phinf.pstatic.net',
        port: ''
      }
    ]
  }
};

module.exports = nextConfig;
