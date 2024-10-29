import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // basePath: '/vagas-next/dist',
  output: "export",
  distDir: 'dist'
};

export default nextConfig;
