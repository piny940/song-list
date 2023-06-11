/** @type {import('next').NextConfig} */

const BACKEND =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://example.com'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com', 'yt3.ggpht.com', 'i.ytimg.com'],
  },
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
