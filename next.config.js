const path = require("path");

/** @type {import('next').NextConfig} */

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "base/base.scss";`,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: false,
  output: "standalone",
  staticPageGenerationTimeout: 5000,
};
