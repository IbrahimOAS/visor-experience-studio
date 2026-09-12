import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import FooterLayout, { type FooterColumn } from "@/components/ui/footer-1";
import { useLanguage } from "@/visor/i18n";

const Footer = () => {
  const { t } = useLanguage();

  const columns: FooterColumn[] = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "/#whats-inside-section" },
        { label: t("footer.pricing"), href: "/pricing" },
        { label: t("footer.aiCoach"), href: "/concepts/emotionally-adaptive-coaching" },
        { label: t("footer.soulTrack"), href: "/concepts/behavior-driven-fitness" },
        { label: "Transformations", href: "/transformations" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.whyVisor"), href: "/why-visor" },
        { label: "Guides", href: "/blog" },
        { label: "VS MyFitnessPal", href: "/vs/myfitnesspal" },
        { label: "VS Freeletics", href: "/vs/freeletics" },
        { label: "Elite Coaches", href: "/elite-coaches", badge: "Soon" },
        { label: t("footer.support"), href: "/support" },
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
    <FooterLayout
      logoSrc="/logo.png"
      logoAlt="VISOR AI Fitness app logo"
      brand="VISOR"
      description={t("footer.tagline")}
      columns={columns}
      socialLinks={[
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Twitter, href: "https://x.com", label: "X" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
      ]}
      copyright={`© ${new Date().getFullYear()} ${t("footer.rights")}`}
      legal={
        <div className="mx-auto max-w-3xl space-y-1.5 text-center text-[11px] leading-relaxed text-muted-foreground/70">
          <p>
            VISOR Fitness is a fitness technology product operated by Cedra Kaddour FZ-LLC, a Free
            Zone LLC registered in Ras Al Khaimah, UAE · Reg. No. 0000004084353 · Licence No.
            7017101 ·{" "}
            <a
              href="mailto:support@visorfitness.com"
              className="transition-colors hover:text-primary"
            >
              support@visorfitness.com
            </a>
          </p>
          <p>
            Fitness, nutrition and wellness information for general purposes only — not a medical
            service. AI transformation images are illustrative estimates, not guaranteed outcomes.
          </p>
        </div>
      }

    />
  );
};

export default Footer;
