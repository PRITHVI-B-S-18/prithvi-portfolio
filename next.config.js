/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Generate static HTML files
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Optional: adds trailing slashes to URLs
}

module.exports = nextConfig
