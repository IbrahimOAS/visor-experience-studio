import { describe, it, expect, beforeEach } from "vitest";
import { render, waitFor, cleanup } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { ComponentType } from "react";

import VsMyFitnessPal from "@/pages/compare/VsMyFitnessPal";
import VsFreeletics from "@/pages/compare/VsFreeletics";
import VsNoom from "@/pages/compare/VsNoom";
import WhyVisor from "@/pages/compare/WhyVisor";
import EmotionallyAdaptiveCoaching from "@/pages/concepts/EmotionallyAdaptiveCoaching";
import AiBodyTransformation from "@/pages/concepts/AiBodyTransformation";
import BehaviorDrivenFitness from "@/pages/concepts/BehaviorDrivenFitness";

interface RouteCase {
  name: string;
  path: string;
  Component: ComponentType;
  expectedTypes: string[]; // JSON-LD @type values that MUST appear
}

const ROUTES: RouteCase[] = [
  { name: "WhyVisor", path: "/why-visor", Component: WhyVisor, expectedTypes: ["BreadcrumbList"] },
  { name: "VsMyFitnessPal", path: "/vs/myfitnesspal", Component: VsMyFitnessPal, expectedTypes: ["BreadcrumbList", "FAQPage"] },
  { name: "VsFreeletics", path: "/vs/freeletics", Component: VsFreeletics, expectedTypes: ["BreadcrumbList"] },
  { name: "VsNoom", path: "/vs/noom", Component: VsNoom, expectedTypes: ["BreadcrumbList"] },
  { name: "EmotionallyAdaptiveCoaching", path: "/concepts/emotionally-adaptive-coaching", Component: EmotionallyAdaptiveCoaching, expectedTypes: ["BreadcrumbList", "DefinedTerm"] },
  { name: "AiBodyTransformation", path: "/concepts/ai-body-transformation", Component: AiBodyTransformation, expectedTypes: ["BreadcrumbList", "DefinedTerm"] },
  { name: "BehaviorDrivenFitness", path: "/concepts/behavior-driven-fitness", Component: BehaviorDrivenFitness, expectedTypes: ["BreadcrumbList", "DefinedTerm"] },
];

function readJsonLd(): Array<Record<string, unknown>> {
  const scripts = Array.from(
    document.head.querySelectorAll('script[type="application/ld+json"]'),
  );
  return scripts
    .map((s) => {
      try {
        return JSON.parse(s.textContent ?? "");
      } catch {
        return null;
      }
    })
    .filter((x): x is Record<string, unknown> => x !== null);
}

function renderRoute(path: string, Component: ComponentType) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Component />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Structured data QA — generated JSON-LD on every new route", () => {
  beforeEach(() => {
    document.head
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((n) => n.remove());
    document.head.querySelectorAll("link[rel='canonical']").forEach((n) => n.remove());
    cleanup();
  });

  for (const route of ROUTES) {
    describe(`${route.name} (${route.path})`, () => {
      it("emits valid JSON-LD with required schema types", async () => {
        renderRoute(route.path, route.Component);

        await waitFor(() => {
          const ld = readJsonLd();
          expect(ld.length).toBeGreaterThan(0);
        });

        const ld = readJsonLd();

        // Every block must have @context schema.org and a @type
        for (const block of ld) {
          expect(block["@context"]).toBe("https://schema.org");
          expect(typeof block["@type"]).toBe("string");
        }

        const types = ld.map((b) => b["@type"] as string);
        for (const t of route.expectedTypes) {
          expect(types, `expected ${t} on ${route.path}`).toContain(t);
        }
      });

      it("emits a well-formed BreadcrumbList", async () => {
        renderRoute(route.path, route.Component);

        await waitFor(() => expect(readJsonLd().length).toBeGreaterThan(0));

        const crumb = readJsonLd().find((b) => b["@type"] === "BreadcrumbList");
        expect(crumb, "BreadcrumbList missing").toBeTruthy();
        const items = crumb!.itemListElement as Array<Record<string, unknown>>;
        expect(Array.isArray(items)).toBe(true);
        expect(items.length).toBeGreaterThanOrEqual(2);
        items.forEach((item, i) => {
          expect(item["@type"]).toBe("ListItem");
          expect(item.position).toBe(i + 1);
          expect(typeof item.name).toBe("string");
          expect(String(item.item)).toMatch(/^https?:\/\//);
        });
      });

      it("emits unique canonical URL and og:url matching the route", async () => {
        renderRoute(route.path, route.Component);

        await waitFor(() => {
          expect(document.head.querySelector("link[rel='canonical']")).toBeTruthy();
        });

        const canon = document.head.querySelector("link[rel='canonical']");
        const ogUrl = document.head.querySelector("meta[property='og:url']");
        expect(canon?.getAttribute("href")).toMatch(new RegExp(`${route.path.replace(/\//g, "\\/")}$`));
        expect(ogUrl?.getAttribute("content")).toMatch(new RegExp(`${route.path.replace(/\//g, "\\/")}$`));
      });
    });
  }

  it("FAQPage on /vs/myfitnesspal contains valid Question/Answer pairs", async () => {
    renderRoute("/vs/myfitnesspal", VsMyFitnessPal);
    await waitFor(() => expect(readJsonLd().length).toBeGreaterThan(0));

    const faq = readJsonLd().find((b) => b["@type"] === "FAQPage");
    expect(faq).toBeTruthy();
    const qs = faq!.mainEntity as Array<Record<string, unknown>>;
    expect(Array.isArray(qs) && qs.length).toBeGreaterThan(0);
    for (const q of qs) {
      expect(q["@type"]).toBe("Question");
      expect(typeof q.name).toBe("string");
      const ans = q.acceptedAnswer as Record<string, unknown>;
      expect(ans["@type"]).toBe("Answer");
      expect(typeof ans.text).toBe("string");
      expect((ans.text as string).length).toBeGreaterThan(20);
    }
  });

  it("DefinedTerm on concept pages references the concepts term set", async () => {
    for (const r of ROUTES.filter((x) => x.path.startsWith("/concepts/"))) {
      cleanup();
      document.head
        .querySelectorAll('script[type="application/ld+json"]')
        .forEach((n) => n.remove());
      renderRoute(r.path, r.Component);
      await waitFor(() => expect(readJsonLd().length).toBeGreaterThan(0));
      const term = readJsonLd().find((b) => b["@type"] === "DefinedTerm");
      expect(term, `DefinedTerm missing on ${r.path}`).toBeTruthy();
      expect(typeof term!.name).toBe("string");
      expect(typeof term!.description).toBe("string");
      expect(String(term!.inDefinedTermSet)).toMatch(/\/concepts$/);
    }
  });
});
