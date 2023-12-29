/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcrypt'],
  },
  // webpack: (config) => {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true
  //   }

  //   return config
  // },
  images: {
    unoptimized: true,
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
