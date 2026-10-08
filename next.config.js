const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      // Articoli e pagine: network first, fallback su cache se offline
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "enricoavagliano-pages",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        networkTimeoutSeconds: 8,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      { source: "/il-senso-dellacqua", destination: "/pesca-a-bolognese-e-allinglese", permanent: true },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

module.exports = withPWA(nextConfig);
