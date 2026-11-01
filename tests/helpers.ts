import type { Page } from "@playwright/test";

export const PAGES = [
    { path: "/", name: "home" },
    { path: "/about", name: "about" },
    { path: "/this-page-does-not-exist", name: "404" }
] as const;

export const VIEWPORTS = [
    { width: 320, height: 640, name: "small phone" },
    { width: 375, height: 667, name: "phone" },
    { width: 768, height: 1024, name: "tablet" },
    { width: 1280, height: 800, name: "desktop" }
] as const;

/** The theme toggle that is visible for the current viewport. */
export const visibleThemeToggle = (page: Page) =>
    page.locator("#themeToggle, #themeToggleMobile").locator("visible=true");

/**
 * Collects runtime errors and failed same-origin requests. Call it before
 * navigating so nothing that happens during page load is missed.
 */
export const trackPageErrors = (page: Page, baseURL: string) => {
    const errors: string[] = [];
    const { origin } = new URL(baseURL);

    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
        if (message.type() !== "error") return;
        // The 404 page intentionally responds with a 404 status
        if (/status of 404/.test(message.text())) return;
        errors.push(`console: ${message.text()}`);
    });
    page.on("response", (response) => {
        const request = response.request();
        if (request.isNavigationRequest()) return;
        if (!request.url().startsWith(origin)) return;
        if (response.status() >= 400) {
            errors.push(`HTTP ${response.status()}: ${request.url()}`);
        }
    });

    return errors;
};
