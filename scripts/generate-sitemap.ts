// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
// Auto-discovers routes from src/App.tsx so the sitemap never references
// a page that doesn't exist (which would produce 404 soft errors in Search Console).
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://charmflow-vision.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Routes we never want crawled even if they exist in the router.
const EXCLUDED_PATHS = new Set<string>([
  "*",
  "/not-found",
  "/404",
]);
const EXCLUDED_PREFIXES = ["/admin", "/lovable", "/auth", "/dashboard/private"];

// Per-path SEO hints (only applied if the path is actually present in the router).
const HINTS: Record<string, Pick<SitemapEntry, "changefreq" | "priority">> = {
  "/": { changefreq: "weekly", priority: "1.0" },
};

function discoverRoutes(): string[] {
  const appPath = resolve("src/App.tsx");
  if (!existsSync(appPath)) return ["/"];

  const src = readFileSync(appPath, "utf8");
  // Match: <Route path="/something" ... />
  const matches = [...src.matchAll(/<Route\s+[^>]*path=["']([^"']+)["']/g)].map((m) => m[1]);

  const routes = matches.filter((path) => {
    if (EXCLUDED_PATHS.has(path)) return false;
    if (path.includes(":")) return false; // dynamic params — needs a data source, skip
    if (path.includes("*")) return false;
    if (EXCLUDED_PREFIXES.some((p) => path.startsWith(p))) return false;
    return true;
  });

  // Dedupe + ensure "/" present if discovered
  return Array.from(new Set(routes));
}

const today = new Date().toISOString().split("T")[0];

const entries: SitemapEntry[] = discoverRoutes().map((path) => ({
  path,
  lastmod: today,
  ...(HINTS[path] ?? { changefreq: "monthly", priority: "0.7" }),
}));

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries): ${entries.map((e) => e.path).join(", ")}`);
