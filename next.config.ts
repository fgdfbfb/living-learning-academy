import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: githubPages ? "export" : undefined,
  basePath: githubPages ? repositoryBasePath || undefined : undefined,
  assetPrefix: githubPages ? repositoryBasePath || undefined : undefined,
  trailingSlash: githubPages,
  images: { unoptimized: true },
};

export default nextConfig;
