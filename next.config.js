/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.pexels.com", "images.unsplash.com"],
    },
    compiler: {
        styledComponents: true,
    },
    env: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    },
};

module.exports = nextConfig;
