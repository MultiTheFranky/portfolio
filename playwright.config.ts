import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    reporter: [["github"], ["list"], ["html", { open: "never" }]],
    use: {
        baseURL: "http://127.0.0.1:4321",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure"
    },
    webServer: {
        // CI tests the production build so build-only regressions are caught
        command: isCI
            ? "pnpm build && pnpm preview --host 127.0.0.1 --port 4321"
            : "pnpm dev",
        url: "http://127.0.0.1:4321",
        reuseExistingServer: !isCI,
        timeout: 180 * 1000
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] }
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] }
        },
        {
            name: "mobile-chrome",
            use: { ...devices["Pixel 7"] }
        },
        {
            name: "mobile-safari",
            use: { ...devices["iPhone 14"] }
        }
    ]
});
