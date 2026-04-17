/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@anis/shared"],
};

export default nextConfig;
// pnpm --filter @anis/shared build