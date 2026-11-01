import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// When running in CI (or GitHub Actions) prefer a static build to avoid
// generating server entrypoints that some CI environments (or adapters)
// may not handle. Locally we keep the Cloudflare adapter for deployment.
const isCI = !!process.env.CI || !!process.env.GITHUB_ACTIONS;

const config = {
    site: "https://multithefranky.com",
    trailingSlash: "ignore",
    security: {
        // Hash every inline script and style so only our own code can run.
        csp: {
            directives: ["object-src 'none'", "base-uri 'self'"],
            scriptDirective: {
                // Cloudflare Web Analytics injects its beacon at the edge
                resources: ["'self'", "https://static.cloudflareinsights.com"]
            },
            styleDirective: {
                // Components set animation delays with inline style attributes
                resources: [
                    "'self'",
                    { resource: "'unsafe-inline'", kind: "attribute" }
                ]
            }
        }
    },
    build: {
        // Inline the stylesheets so they don't block the first render with
        // extra requests; the pages are small and few, so caching them
        // separately buys little.
        inlineStylesheets: "always"
    },
    vite: {
        plugins: [tailwindcss()]
    },
    // Use a static output in CI to keep the build simple and portable.
    output: isCI ? "static" : "server"
};

if (!isCI) {
    // Only attach the Cloudflare adapter when not in CI.
    // Pages are prerendered, so optimise images at build time with sharp
    // instead of relying on a Cloudflare Images binding at runtime.
    config.adapter = cloudflare({ imageService: "compile" });
}

export default defineConfig(config);
