/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false,
      path: false,process: false,http:false,https:false,util:false,window:false };
      /* config.infrastructureLogging = { debug: /PackFileCache/ }; */

    return config;
  },
}

module.exports = nextConfig
