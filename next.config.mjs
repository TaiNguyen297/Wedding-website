/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['mywebsite.com'],
    },
    async redirects() {
        return [
        {
            source: '/about',
            destination: '/',
            permanent: true,
        },
        ];
    },
};

export default nextConfig;
