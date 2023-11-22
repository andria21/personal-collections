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
};

module.exports = nextConfig;


// i18n: {
//   locales: ["en", "ru"],
//   defaultLocale: "en",
//   localeDetection: false,
// },

// reactStrictMode: true,