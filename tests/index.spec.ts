import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
    test("correct index structure", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/MultiTheFranky/);

        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
        await expect(
            page.getByRole("heading", { level: 1, name: /Francisco/ })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Timeline" })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { name: /Knowledge/i })
        ).toBeVisible();
    });

    test("has SEO metadata", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
            "href",
            "https://multithefranky.com/"
        );
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
            "content",
            /^https:\/\/multithefranky\.com\//
        );
        const jsonLd = await page
            .locator('script[type="application/ld+json"]')
            .textContent();
        expect(JSON.parse(jsonLd ?? "{}")["@type"]).toBe("Person");
    });

    test("theme toggle switches dark mode", async ({ page }) => {
        await page.goto("/");
        const html = page.locator("html");
        const wasDark = await html.evaluate((el) =>
            el.classList.contains("dark")
        );
        await page.locator("#themeToggle").click();
        await expect(html).toHaveClass(wasDark ? /^(?!.*dark)/ : /dark/);
    });

    test("mobile menu opens and closes", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/");
        const toggle = page.locator("#menu-toggle");
        const menu = page.locator("#navbar-default");

        await expect(menu).toBeHidden();
        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(menu).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
    });
});
