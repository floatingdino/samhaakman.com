/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["images.prismic.io"],
  },
  experimental: {
    ppr: true,
  },
}
