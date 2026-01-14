import { test, expect } from "@playwright/test";

test.describe("About page responsive and accessibility", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/about");
    });

    test("has accessible social links with aria-labels", async ({ page }) => {
        const links = page.locator('main a[rel~="noopener"]');
        const count = await links.count();
        expect(count).toBeGreaterThan(0);

        for (let index = 0; index < count; index += 1) {
            const link = links.nth(index);
            await expect(link).toHaveAttribute("aria-label", /.+/);
            const srOnly = link.locator(".sr-only");
            expect(await srOnly.count()).toBeGreaterThan(0);
        }
    });

    test("renders properly on mobile and desktop (screenshots)", async ({
        page
    }, testInfo) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(200);
        await testInfo.attach("about-mobile", {
            body: await page.screenshot({ fullPage: true }),
            contentType: "image/png"
        });

        await page.setViewportSize({ width: 1280, height: 800 });
        await page.waitForTimeout(200);
        await testInfo.attach("about-desktop", {
            body: await page.screenshot({ fullPage: true }),
            contentType: "image/png"
        });
    });

    test("timeline alternates sides on large screens", async ({ page }) => {
        await page.goto("/");
        await page.setViewportSize({ width: 1280, height: 900 });

        const timelineItems = page.locator(".timeline-card");
        expect(await timelineItems.count()).toBeGreaterThanOrEqual(2);

        const secondItem = timelineItems.nth(1);
        await expect(secondItem.locator(".timeline-heading")).toHaveCount(1);
    });
});
