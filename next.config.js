/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'default',
    disableStaticImages: false
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Ryokan-HP' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Ryokan-HP' : ''
};

module.exports = nextConfig; 