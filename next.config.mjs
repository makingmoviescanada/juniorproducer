import { resolve } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: resolve('/vercel/share/v0-next-shadcn'),
    resolveAlias: {
      next: resolve('/vercel/share/v0-next-shadcn/node_modules/next'),
    },
  },
}

export default nextConfig
