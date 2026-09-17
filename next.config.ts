import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/living-learning-academy";

const nextConfig: NextConfig = {
  output: githubPages ? "export" : undefined,
  basePath: githubPages ? repositoryBasePath : undefined,
  assetPrefix: githubPages ? repositoryBasePath : undefined,
  trailingSlash: githubPages,
  images: { unoptimized: true },
};

export default nextConfig;
