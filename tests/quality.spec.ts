import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES, VIEWPORTS, trackPageErrors } from "./helpers";

for (const { path, name } of PAGES) {
    test.describe(`${name} page quality`, () => {
        test("loads without runtime errors or failed requests", async ({
            page,
            baseURL
        }) => {
            const errors = trackPageErrors(page, baseURL!);
            await page.goto(path, { waitUntil: "networkidle" });
            // Scroll through the page so lazy content and reveals run too
            await page.evaluate(() =>
                window.scrollTo(0, document.body.scrollHeight)
            );
            await page.waitForLoadState("networkidle");
            expect(errors).toEqual([]);
        });

        test("all images load", async ({ page }) => {
            await page.goto(path);
            await page.evaluate(() =>
                document.querySelectorAll("img").forEach((img) => {
                    img.loading = "eager";
                })
            );
            const broken = await page.evaluate(async () => {
                const images = [...document.querySelectorAll("img")];
                await Promise.all(
                    images.map((img) => img.decode().catch(() => undefined))
                );
                return images
                    .filter((img) => !img.complete || img.naturalWidth === 0)
                    .map((img) => img.currentSrc || img.src);
            });
            expect(broken).toEqual([]);
        });

        test("images have alt text", async ({ page }) => {
            await page.goto(path);
            const missingAlt = await page
                .locator("img:not([alt])")
                .evaluateAll((images) =>
                    images.map((img) => (img as HTMLImageElement).src)
                );
            expect(missingAlt).toEqual([]);
        });

        test("internal links resolve", async ({ page, request }) => {
            await page.goto(path);
            const hrefs = await page
                .locator("a[href]")
                .evaluateAll((links) =>
                    links.map((link) => (link as HTMLAnchorElement).href)
                );
            const origin = new URL(page.url()).origin;
            const internal = [
                ...new Set(
                    hrefs
                        .filter((href) => href.startsWith(origin))
                        .map((href) => href.split("#")[0])
                )
            ].filter((href) => href !== page.url());
            expect(internal.length).toBeGreaterThan(0);

            for (const href of internal) {
                const response = await request.get(href);
                expect(response.status(), href).toBeLessThan(400);
            }
        });

        test("in-page anchors point to existing elements", async ({ page }) => {
            await page.goto(path);
            const missing = await page.evaluate(() =>
                [...document.querySelectorAll<HTMLAnchorElement>("a[href]")]
                    .filter(
                        (link) =>
                            link.hash &&
                            link.pathname === window.location.pathname
                    )
                    .map((link) => link.hash.slice(1))
                    .filter((id) => !document.getElementById(id))
            );
            expect(missing).toEqual([]);
        });

        test("external links open safely in a new tab", async ({ page }) => {
            await page.goto(path);
            const unsafe = await page
                .locator('a[target="_blank"]')
                .evaluateAll((links) =>
                    links
                        .filter(
                            (link) =>
                                !/\bnoopener\b/.test(
                                    link.getAttribute("rel") ?? ""
                                )
                        )
                        .map((link) => link.getAttribute("href"))
                );
            expect(unsafe).toEqual([]);
        });

        for (const theme of ["light", "dark"] as const) {
            test(`has no accessibility violations (${theme})`, async ({
                page
            }) => {
                // axe can take a while on the first scan, especially in WebKit
                test.slow();
                await page.emulateMedia({
                    colorScheme: theme,
                    reducedMotion: "reduce"
                });
                await page.goto(path);
                await expect(page.locator("html")).toHaveClass(
                    theme === "dark" ? /\bdark\b/ : /^(?!.*\bdark\b)/
                );
                // Let entrance animations settle before measuring contrast
                await page.waitForTimeout(2000);

                const results = await new AxeBuilder({ page })
                    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
                    .analyze();
                const summary = results.violations.map(
                    ({ id, help, nodes }) =>
                        `${id}: ${help} (${nodes
                            .map((node) => node.target.join(" "))
                            .join(", ")})`
                );
                expect(summary).toEqual([]);
            });
        }

        for (const viewport of VIEWPORTS) {
            test(`has no horizontal overflow at ${viewport.width}px (${viewport.name})`, async ({
                page
            }) => {
                await page.emulateMedia({ reducedMotion: "reduce" });
                await page.setViewportSize(viewport);
                await page.goto(path);

                const overflowing = await page.evaluate(() => {
                    const width = document.documentElement.clientWidth;
                    const clippedByAncestor = (el: Element) => {
                        for (
                            let parent = el.parentElement;
                            parent && parent !== document.body;
                            parent = parent.parentElement
                        ) {
                            const { overflowX } = getComputedStyle(parent);
                            if (overflowX !== "visible") return true;
                        }
                        return false;
                    };
                    return [
                        ...document.querySelectorAll("main *, nav *, footer *")
                    ]
                        .filter((el) => !el.closest('[aria-hidden="true"]'))
                        .filter((el) => {
                            const rect = el.getBoundingClientRect();
                            return (
                                rect.width > 0 &&
                                (rect.right > width + 1 || rect.left < -1) &&
                                !clippedByAncestor(el)
                            );
                        })
                        .map(
                            (el) =>
                                `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`
                        );
                });
                expect(overflowing).toEqual([]);
            });
        }
    });
}
