import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { discoverRoutes, extractLocs } from "../../scripts/generate-sitemap";

describe("sitemap", () => {
  it("exists on disk", () => {
    expect(existsSync(resolve("public/sitemap.xml"))).toBe(true);
  });

  it("contains exactly the routes registered in src/App.tsx", () => {
    const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
    const onDisk = extractLocs(xml);
    const expected = discoverRoutes().sort();
    expect(onDisk).toEqual(expected);
  });

  it("does not include wildcard, dynamic, or excluded routes", () => {
    const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
    expect(xml).not.toMatch(/<loc>[^<]*\*/);
    expect(xml).not.toMatch(/<loc>[^<]*:/);
    expect(xml).not.toMatch(/<loc>[^<]*\/admin/);
  });
});
