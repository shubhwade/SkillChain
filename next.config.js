/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Enable environment variables
    env: {
        NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE || 'false',
    },
}

module.exports = nextConfig
