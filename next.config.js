const { i18n } = require("./next-i18next.config");

// eslint-disable-next-line import/order
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gp",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
