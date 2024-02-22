const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const withSourceMaps = require('@zeit/next-source-maps')

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config, options) {
    if (!options.dev) {
      config.devtool = 'source-map'
    }

    return config
  }
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
      disable: phase === PHASE_DEVELOPMENT_SERVER,
      register: true,
    });
    return withSourceMaps(withPWA(nextConfig));
  }
  return withSourceMaps(nextConfig);
};