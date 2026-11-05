import { test, expect } from "@playwright/test";
import { visibleThemeToggle } from "./helpers";

test.describe("Navigation and UX", () => {
    test("skip link moves focus to the main content", async ({
        page,
        browserName
    }) => {
        // WebKit only tabs to links when "Press Tab to highlight each item" is on
        test.skip(browserName === "webkit", "WebKit skips links on Tab");
        await page.goto("/");
        await page.keyboard.press("Tab");
        const skipLink = page.getByRole("link", { name: "Skip to content" });
        await expect(skipLink).toBeFocused();
        await expect(skipLink).toBeVisible();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#main-content$/);
        await expect(page.locator("#main-content")).toBeFocused();
    });

    test("header navigation reaches every page and section", async ({
        page
    }) => {
        // Jump straight to anchors: a smooth scroll can be interrupted by
        // late layout work and stop short of the target
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/");
        const nav = page.getByRole("navigation", { name: "Main navigation" });

        await nav.getByRole("link", { name: "About", exact: true }).click();
        await expect(page).toHaveURL(/\/about\/?$/);
        await expect(
            nav.getByRole("link", { name: "About", exact: true })
        ).toHaveAttribute("aria-current", "page");

        await nav.getByRole("link", { name: "Timeline" }).click();
        await expect(page).toHaveURL(/\/#timeline$/);
        await expect(page.locator("#timeline")).toBeInViewport();

        await nav.getByRole("link", { name: "Skills" }).click();
        await expect(page).toHaveURL(/\/#knowledge$/);
        await expect(page.locator("#knowledge")).toBeInViewport();
    });

    test("mobile menu closes after picking a link", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");
        const toggle = page.locator("#menu-toggle");
        const menu = page.locator("#navbar-default");

        await toggle.click();
        await expect(menu).toBeVisible();
        await menu.getByRole("link", { name: "Timeline" }).click();
        await expect(menu).toBeHidden();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
    });

    test("header stays visible while scrolling", async ({ page }) => {
        await page.goto("/");
        await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight / 2)
        );
        await expect(
            page.getByRole("navigation", { name: "Main navigation" })
        ).toBeInViewport();
    });

    test("keeps spaces between inline elements", async ({ page }) => {
        await page.goto("/about");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
            /Francisco\sFranky.*\sÁlamo García/
        );
        await expect(page.locator("footer")).toContainText(
            `© ${new Date().getFullYear()} Francisco Álamo García.`
        );
    });

    test("contact links use the site email", async ({ page }) => {
        await page.goto("/");
        const contactLinks = page.locator('a[href^="mailto:"]');
        expect(await contactLinks.count()).toBeGreaterThan(0);
        for (const href of await contactLinks.evaluateAll((links) =>
            links.map((link) => link.getAttribute("href"))
        )) {
            expect(href).toBe("mailto:me@multithefranky.com");
        }
    });
});

test.describe("Theme", () => {
    test("follows the system color scheme by default", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "dark" });
        await page.goto("/");
        await expect(page.locator("html")).toHaveClass(/\bdark\b/);

        await page.emulateMedia({ colorScheme: "light" });
        await page.reload();
        await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
    });

    test("remembers the chosen theme across pages and reloads", async ({
        page
    }) => {
        await page.emulateMedia({ colorScheme: "light" });
        await page.goto("/");
        const html = page.locator("html");
        await expect(html).not.toHaveClass(/\bdark\b/);

        await visibleThemeToggle(page).click();
        await expect(html).toHaveClass(/\bdark\b/);

        await page.reload();
        await expect(html).toHaveClass(/\bdark\b/);

        await page.goto("/about");
        await expect(html).toHaveClass(/\bdark\b/);
    });

    test("theme toggle is keyboard accessible", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "light" });
        await page.goto("/");
        const toggle = visibleThemeToggle(page);
        await expect(toggle).toHaveAccessibleName(/dark mode/i);
        await toggle.focus();
        await page.keyboard.press("Enter");
        await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    });
});

test.describe("Reduced motion", () => {
    test("content is visible without animations", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/");
        await expect(
            page.getByRole("heading", { level: 1, name: /Francisco/ })
        ).toBeVisible();
        // scrollIntoViewIfNeeded() waits for the section to be stable, which
        // never happens in WebKit (Playwright 1.64+) because of its animations
        await page
            .locator("#knowledge")
            .evaluate((el) => el.scrollIntoView({ block: "center" }));
        await expect
            .poll(() =>
                page.evaluate(
                    () =>
                        [
                            ...document.querySelectorAll(
                                ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .reveal"
                            )
                        ].filter(
                            (el) => Number(getComputedStyle(el).opacity) < 0.99
                        ).length
                )
            )
            .toBe(0);
    });
});
