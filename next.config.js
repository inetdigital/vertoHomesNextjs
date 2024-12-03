/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "images.prismic.io"], // Add other domains as needed
  },
  async rewrites() {
    return [
      {
        source: "/articles",
        destination: "/",
      },
    ];
  },
  swcMinify: true, // Enable SWC minification for faster builds and smaller JS bundles
};

module.exports = nextConfig;
