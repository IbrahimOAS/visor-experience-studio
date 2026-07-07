import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "./SeoHead";

interface Crumb { label: string; href: string }

interface Section {
  heading: string;
  body: ReactNode;
}

interface ContentPageProps {
  title: string;
  description: string;
  path: string;
  h1: string;
  intro: ReactNode;
  sections: Section[];
  breadcrumbs: Crumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE = "https://visorfitness.com";

export const ContentPage = ({
  title, description, path, h1, intro, sections, breadcrumbs, jsonLd,
}: ContentPageProps) => {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE}${c.href}`,
    })),
  };
  const ld = jsonLd
    ? [breadcrumbLd, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]
    : [breadcrumbLd];

  return (
    <>
      <SeoHead title={title} description={description} path={path} jsonLd={ld} />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground/80">{c.label}</span>
                  ) : (
                    <Link to={c.href} className="hover:text-primary transition-colors">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
            {h1}
          </h1>
          <div className="text-lg text-muted-foreground leading-relaxed mb-12">
            {intro}
          </div>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.heading} className="glass-card rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-4">
                  {s.heading}
                </h2>
                <div className="text-foreground/85 leading-relaxed space-y-4">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)]"
            >
              {ctaLabel ?? "Explore VISOR"}
            </Link>
          </div>

        </article>
        <Footer />
      </main>
    </>
  );
};
