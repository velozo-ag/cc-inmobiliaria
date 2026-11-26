/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.100", "192.168.1.103", "192.168.1.*", "192.168.0.*", "127.0.0.1"],
  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
