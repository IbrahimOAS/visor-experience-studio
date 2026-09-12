import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface FooterLinkItem {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  brand?: string;
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  legal?: ReactNode;
  copyright?: string;
}

const linkClass =
  "text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2";

const FooterAnchor = ({ link }: { link: FooterLinkItem }) => {
  const content = (
    <>
      {link.label}
      {link.badge && (
        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          {link.badge}
        </span>
      )}
    </>
  );

  if (link.href.startsWith("/") && !link.external) {
    return (
      <Link to={link.href} className={linkClass}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className={linkClass}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
};

export const Footer: FC<FooterProps> = ({
  logoSrc,
  logoAlt,
  brand = "VISOR",
  description,
  columns,
  socialLinks = [],
  legal,
  copyright = `© ${new Date().getFullYear()} ${brand}. All rights reserved.`,
}) => {
  return (
    <footer className="relative w-full border-t border-border/40 bg-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <img
                src={logoSrc}
                alt={logoAlt}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="font-['Space_Grotesk'] text-2xl font-bold text-foreground">
                {brand}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {legal && (
          <div className="mt-12 border-t border-border/30 pt-6 text-sm text-muted-foreground">
            {legal}
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/30 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link to="/support" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
