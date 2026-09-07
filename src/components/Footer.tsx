import { Link } from "react-router-dom";
import KineticGrid from "@/components/ui/kinetic-grid";
import { useLanguage } from "@/visor/i18n";

type FooterLink = { label: string; href: string; external?: boolean };

const Footer = () => {
  const { t } = useLanguage();
  const linkClass =
    "text-sm text-white/60 hover:text-[#99FFFF] transition-colors duration-300";

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "/#whats-inside-section" },
        { label: t("footer.pricing"), href: "/pricing" },
        { label: t("footer.aiCoach"), href: "/concepts/emotionally-adaptive-coaching" },
        { label: t("footer.soulTrack"), href: "/concepts/behavior-driven-fitness" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.whyVisor"), href: "/why-visor" },
        { label: "VS MyFitnessPal", href: "/vs/myfitnesspal" },
        { label: "VS Freeletics", href: "/vs/freeletics" },
        { label: t("footer.support"), href: "/support" },
        { label: t("footer.contact"), href: "mailto:support@visorfitness.com", external: true },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
        { label: t("footer.deleteAccount"), href: "/delete-account" },
        { label: t("footer.companyInfo"), href: "/company" },
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <KineticGrid fixed={false} className="bg-transparent">
      <footer className="relative border-t border-white/10 py-14 px-6">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#99FFFF]/30 to-transparent" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="VISOR AI Fitness app logo"
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover"
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-white">
                VISOR
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-4 text-white">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const isRoute = link.href.startsWith("/") && !link.external;
                  return (
                    <li key={link.label}>
                      {isRoute ? (
                        <Link to={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className={linkClass}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-sm text-white/60 space-y-4">
          <p className="text-white/90">
            <strong>
              VISOR Fitness is a fitness technology product operated by Cedra Kaddour FZ-LLC, a
              Free Zone Limited Liability Company registered in Ras Al Khaimah, United Arab Emirates.
            </strong>
          </p>
          <p className="leading-relaxed">
            Registration No. 0000004084353
            <br />
            Licence No. 7017101
            <br />
            Email:{" "}
            <a
              href="mailto:support@visorfitness.com"
              className="hover:text-[#99FFFF] transition-colors"
            >
              support@visorfitness.com
            </a>
          </p>
          <p className="text-xs leading-relaxed">
            VISOR Fitness provides fitness, nutrition and wellness information for general informational
            purposes. It is not a medical service and does not provide medical diagnosis, treatment or
            emergency advice. AI-generated transformation images are illustrative estimates, not
            guaranteed outcomes.
          </p>
          <p className="text-center pt-2">© {new Date().getFullYear()} {t("footer.rights")}</p>
        </div>
      </footer>
    </KineticGrid>
  );
};

export default Footer;
