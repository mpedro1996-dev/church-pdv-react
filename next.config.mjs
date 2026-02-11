/** @type {import('next').NextConfig} */

import 'dotenv/config';

const nextConfig = {
    env: {
        API_URL: process.env.API_URL
    },
    distDir: 'out',
};

export default nextConfig;
