import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
    for (const path of ["/", "/about/"]) {
        test(`${path} has unique title, description and social metadata`, async ({
            page
        }) => {
            await page.goto(path);
            await expect(page).toHaveTitle(/\S.{10,}/);
            await expect(page.locator("html")).toHaveAttribute("lang", "en");
            await expect(
                page.locator('meta[name="description"]')
            ).toHaveAttribute("content", /.{50,}/);
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
                "href",
                new URL(path, "https://multithefranky.com").href
            );
            for (const property of [
                "og:title",
                "og:description",
                "og:url",
                "og:image"
            ]) {
                await expect(
                    page.locator(`meta[property="${property}"]`)
                ).toHaveAttribute("content", /\S/);
            }
            await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
            await expect(page.getByRole("heading", { level: 1 })).toHaveCount(
                1
            );
        });
    }

    test("og:image is reachable", async ({ page, request }) => {
        await page.goto("/");
        const ogImage = await page
            .locator('meta[property="og:image"]')
            .getAttribute("content");
        const response = await request.get(new URL(ogImage!).pathname);
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toMatch(/^image\//);
    });

    test("unknown pages return a 404 that is not indexed", async ({ page }) => {
        const response = await page.goto("/this-page-does-not-exist");
        expect(response?.status()).toBe(404);
        await expect(
            page.getByRole("heading", { level: 1, name: "Page not found" })
        ).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
            "content",
            /noindex/
        );
        await page.getByRole("link", { name: "Go back home" }).click();
        await expect(page).toHaveURL(/\/$/);
    });

    test("sitemap.xml lists every public page", async ({ request }) => {
        const response = await request.get("/sitemap.xml");
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toMatch(/xml/);
        const body = await response.text();
        expect(body).toContain("<loc>https://multithefranky.com/</loc>");
        expect(body).toContain("<loc>https://multithefranky.com/about/</loc>");
    });

    test("robots.txt allows crawling and points to the sitemap", async ({
        request
    }) => {
        const response = await request.get("/robots.txt");
        expect(response.status()).toBe(200);
        const body = await response.text();
        expect(body).toMatch(/^Allow: \/$/m);
        expect(body).toContain(
            "Sitemap: https://multithefranky.com/sitemap.xml"
        );
    });

    test("web manifest and icons are served", async ({ request }) => {
        for (const asset of [
            "/site.webmanifest",
            "/favicon.ico",
            "/favicon-32x32.png",
            "/apple-touch-icon.png"
        ]) {
            const response = await request.get(asset);
            expect(response.status(), asset).toBe(200);
        }
    });
});
