/** @type {import('next').NextConfig} */

const BACKEND =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://example.com'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
