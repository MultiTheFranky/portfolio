import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";

// When running in CI (or GitHub Actions) prefer a static build to avoid
// generating server entrypoints that some CI environments (or adapters)
// may not handle. Locally we keep the Cloudflare adapter for deployment.
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

const config = {
    integrations: [react(), tailwind()],
    // Use a static output in CI to keep the build simple and portable.
    output: isCI ? "static" : "server"
};

if (!isCI) {
    // Only attach the Cloudflare adapter when not in CI.
    config.adapter = cloudflare();
}

export default defineConfig(config);
