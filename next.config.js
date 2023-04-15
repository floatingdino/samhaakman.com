/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,

  experimental: {
    appDir: true,
    legacyBrowsers: false,
  },
}
