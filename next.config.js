/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'default',
    disableStaticImages: false
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tsukikage-sato' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tsukikage-sato' : ''
};

module.exports = nextConfig; 