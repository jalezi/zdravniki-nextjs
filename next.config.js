const { i18n } = require('./next-i18next.config');

// eslint-disable-next-line import/order
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  compiler: {
    styledComponents: true,
  },
  i18n,
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/gp',
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX({
  ...nextConfig,
});
