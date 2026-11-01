import type { APIRoute } from "astro";
import { SITE } from "../data/site";

export const prerender = true;

const routes = [
    { path: "/", priority: "1.0" },
    { path: "/about/", priority: "0.8" }
];

export const GET: APIRoute = ({ site }) => {
    const base = site ?? new URL(SITE.url);
    const lastmod = new Date().toISOString().split("T")[0];
    const urls = routes
        .map(
            ({ path, priority }) =>
                `  <url>\n    <loc>${new URL(path, base).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
        )
        .join("\n");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
};
