/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  serverExternalPackages: ['mongoose', 'bcrypt'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
    ],
  },
}

export default nextConfig
