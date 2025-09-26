import type { NextConfig } from "next";

/* config options here */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
module.exports = nextConfig;
