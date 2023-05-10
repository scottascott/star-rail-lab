/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import i18nConfig from "./next-i18next.config.mjs";
/** @type {import("next").NextConfig} */
const config = {
    distDir: "build",
    reactStrictMode: true,
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: i18nConfig.i18n,
};
export default config;
