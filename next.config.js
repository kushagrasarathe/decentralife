/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "test.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lens.infura-ipfs.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
