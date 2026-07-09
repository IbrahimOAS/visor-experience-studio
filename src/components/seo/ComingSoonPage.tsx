import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "./SeoHead";

interface Crumb {
  label: string;
  href: string;
}

export interface ComingSoonPageProps {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  h1: string;
  intro: ReactNode;
  highlights?: string[];
  breadcrumbs: Crumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  notifyTopic?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
}

const SITE = "https://visorfitness.com";

export const ComingSoonPage = ({
  title,
  description,
  path,
  eyebrow = "Coming Soon",
  h1,
  intro,
  highlights = [],
  breadcrumbs,
  jsonLd,
  notifyTopic,
  primaryCtaLabel = "Get the app",
  primaryCtaHref = "/#download",
}: ComingSoonPageProps) => {
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

  const notifyHref = notifyTopic
    ? `/support?topic=${encodeURIComponent(notifyTopic)}`
    : "/support";

  return (
    <>
      <SeoHead title={title} description={description} path={path} jsonLd={ld} />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />
        <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card-strong rounded-3xl p-8 md:p-14 border border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              {eyebrow}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
              {h1}
            </h1>

            <div className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {intro}
            </div>

            {highlights.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="glass-card rounded-xl px-4 py-3 text-sm text-foreground/90 border border-white/5"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-3">
              <a
                href={primaryCtaHref}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)]"
              >
                {primaryCtaLabel}
                <ArrowRight size={16} />
              </a>
              <Link
                to={notifyHref}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-white/10 bg-white/5 text-foreground font-medium hover:bg-white/10 transition-colors"
              >
                Notify me when it launches
              </Link>
            </div>
          </motion.div>

          <div className="mt-10 text-sm text-muted-foreground text-center">
            This page is part of the VISOR Elite Coaches expansion. All coach discovery,
            booking, messaging and payments happen inside the VISOR mobile app.
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
};
