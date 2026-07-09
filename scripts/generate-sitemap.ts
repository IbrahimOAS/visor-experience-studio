// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
// Auto-discovers routes from src/App.tsx so the sitemap never references
// a page that doesn't exist (which would produce 404 soft errors in Search Console).
//
// Usage:
//   tsx scripts/generate-sitemap.ts            # write public/sitemap.xml
//   tsx scripts/generate-sitemap.ts --check    # CI mode: verify on-disk sitemap
//                                               matches the router; exit 1 on drift
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

export const BASE_URL = "https://visorfitness.com";

export interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const EXCLUDED_PATHS = new Set<string>(["*", "/not-found", "/404"]);
const EXCLUDED_PREFIXES = ["/admin", "/lovable", "/auth", "/dashboard/private"];

// Reserved Phase 2 slug pages — dynamic routes in App.tsx are filtered out by
// the regex, so list every real coach / city / specialty slug we ship.
const EXTRA_STATIC_ROUTES: string[] = [
  "/coaches/marcus-cole",
  "/coaches/priya-sharma",
  "/coaches/james-rivera",
  "/cities/new-york",
  "/cities/oslo",
  "/cities/london",
  "/cities/stockholm",
  "/specialties/strength-coach",
  "/specialties/bodybuilding-coach",
  "/specialties/weight-loss-coach",
  "/specialties/home-personal-trainer",
  "/specialties/online-fitness-coach",
  "/specialties/women-fitness-coach",
  "/specialties/sports-performance-coach",
  "/specialties/mobility-coach",
];

const HINTS: Record<string, Pick<SitemapEntry, "changefreq" | "priority">> = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/why-visor": { changefreq: "monthly", priority: "0.9" },
  "/vs/myfitnesspal": { changefreq: "monthly", priority: "0.8" },
  "/vs/freeletics": { changefreq: "monthly", priority: "0.8" },
  "/vs/noom": { changefreq: "monthly", priority: "0.8" },
  "/concepts/emotionally-adaptive-coaching": { changefreq: "monthly", priority: "0.8" },
  "/concepts/ai-body-transformation": { changefreq: "monthly", priority: "0.8" },
  "/concepts/behavior-driven-fitness": { changefreq: "monthly", priority: "0.8" },
  "/privacy": { changefreq: "yearly", priority: "0.3" },
  "/terms": { changefreq: "yearly", priority: "0.3" },
  "/support": { changefreq: "monthly", priority: "0.7" },
  "/elite-coaches": { changefreq: "monthly", priority: "0.9" },
  "/for-coaches": { changefreq: "monthly", priority: "0.8" },
  "/coaches": { changefreq: "weekly", priority: "0.8" },
  "/trust": { changefreq: "monthly", priority: "0.7" },
  "/transformations": { changefreq: "monthly", priority: "0.7" },
  "/compare": { changefreq: "monthly", priority: "0.7" },
  "/business": { changefreq: "monthly", priority: "0.6" },
  "/careers": { changefreq: "monthly", priority: "0.5" },
  "/elite": { changefreq: "monthly", priority: "0.8" },
};


export function discoverRoutes(appPath = resolve("src/App.tsx")): string[] {
  if (!existsSync(appPath)) return ["/"];
  const src = readFileSync(appPath, "utf8");
  const matches = [...src.matchAll(/<Route\s+[^>]*path=["']([^"']+)["']/g)].map((m) => m[1]);
  const routes = matches.filter((path) => {
    if (EXCLUDED_PATHS.has(path)) return false;
    if (path.includes(":")) return false;
    if (path.includes("*")) return false;
    if (EXCLUDED_PREFIXES.some((p) => path.startsWith(p))) return false;
    return true;
  });
  return Array.from(new Set([...routes, ...EXTRA_STATIC_ROUTES]));
}

export function buildEntries(routes: string[]): SitemapEntry[] {
  return routes.map((path) => ({
    path,
    ...(HINTS[path] ?? { changefreq: "monthly", priority: "0.7" }),
  }));
}

// XML body without <lastmod> so the verify check is stable day-to-day.
export function renderSitemap(items: SitemapEntry[]): string {
  const urls = items.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    "",
  ].join("\n");
}

export function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(BASE_URL, ""))
    .sort();
}

function main() {
  const isCheck = process.argv.includes("--check");
  const routes = discoverRoutes();
  const entries = buildEntries(routes);
  const expected = renderSitemap(entries);
  const sitemapPath = resolve("public/sitemap.xml");

  if (isCheck) {
    if (!existsSync(sitemapPath)) {
      console.error("✗ public/sitemap.xml is missing. Run: bunx tsx scripts/generate-sitemap.ts");
      process.exit(1);
    }
    const onDisk = readFileSync(sitemapPath, "utf8");
    const expectedRoutes = routes.sort();
    const onDiskRoutes = extractLocs(onDisk);
    const missing = expectedRoutes.filter((r) => !onDiskRoutes.includes(r));
    const extra = onDiskRoutes.filter((r) => !expectedRoutes.includes(r));
    if (missing.length || extra.length) {
      console.error("✗ Sitemap is out of sync with src/App.tsx routes.");
      if (missing.length) console.error("  Missing from sitemap:", missing.join(", "));
      if (extra.length) console.error("  Extra (route removed?):", extra.join(", "));
      console.error("  Fix: bunx tsx scripts/generate-sitemap.ts");
      process.exit(1);
    }
    console.log(`✓ sitemap.xml matches router (${expectedRoutes.length} routes): ${expectedRoutes.join(", ")}`);
    return;
  }

  writeFileSync(sitemapPath, expected);
  console.log(`sitemap.xml written (${entries.length} entries): ${entries.map((e) => e.path).join(", ")}`);
}

main();
