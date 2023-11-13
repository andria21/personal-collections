/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  },
  
};

module.exports = nextConfig;


// i18n: {
//   locales: ["en", "ru"],
//   defaultLocale: "en",
//   localeDetection: false,
// },

// reactStrictMode: true,