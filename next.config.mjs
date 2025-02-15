import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

setupDevPlatform().catch(console.error);

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

export default nextConfig; // ✅ Use ES Module syntax instead of CommonJS
