/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/sweet-escape",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "@react-three/drei"],
  },
};

export default nextConfig;
