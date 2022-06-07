const { i18n } = require("./next-i18next.config");

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

module.exports = nextConfig;
