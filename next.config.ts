/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // transpilePackages: ["@anis/shared"],
  transpilePackages: ["leaflet"],
};

export default nextConfig;
// pnpm --filter @anis/shared build
