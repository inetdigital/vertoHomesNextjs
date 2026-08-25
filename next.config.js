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
  async redirects() {
    return [
      {
        source: "/lacuna",
        destination:
          "/development/lacuna-gardens?utm_source=signage&utm_medium=shorturl&utm_campaign=lacuna-show-home",
        permanent: false,
      },
      {
        source: "/salo",
        destination:
          "/development/salo-bay-fistral-newquay-cornwall?utm_source=signage&utm_medium=shorturl&utm_campaign=salo-bay-launch",
        permanent: false,
      },
    ];
  },
  swcMinify: true, // Enable SWC minification for faster builds and smaller JS bundles
};

module.exports = nextConfig;
