import { useTranslation } from "react-i18next";
import { ContentPage } from "@/components/seo/ContentPage";
import { RichText } from "@/components/seo/RichText";
import { Mail, MessageCircle, Clock, Trash2, CreditCard, HelpCircle } from "lucide-react";

const Support = () => {
  const { t } = useTranslation();

  return (
    <ContentPage
      title={t("pages.support.title")}
      description={t("pages.support.description")}
      path="/support"
      h1={t("pages.support.h1")}
      ctaLabel={t("hero.cta")}
      breadcrumbs={[
        { label: t("breadcrumbs.home"), href: "/" },
        { label: t("pages.support.crumb"), href: "/support" },
      ]}
      intro={
        <>
          {t("pages.support.introLead")}
          <br />
          <span className="text-sm opacity-70">{t("pages.support.lastUpdated")}</span>
          <br />
          <a
            href="https://visorfitness.com/support"
            className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://visorfitness.com/support
          </a>
        </>
      }
      sections={[
        {
          heading: t("pages.support.sections.contact.heading"),
          body: (
            <div className="space-y-6">
              <p>{t("pages.support.sections.contact.lead")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:support@visorfitness.com"
                  className="glass-card-strong rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      {t("pages.support.sections.contact.emailTitle")}
                    </div>
                    <div className="text-sm text-primary hover:underline">support@visorfitness.com</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("pages.support.sections.contact.emailNote")}
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:privacy@visorfitness.com"
                  className="glass-card-strong rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      {t("pages.support.sections.contact.privacyTitle")}
                    </div>
                    <div className="text-sm text-primary hover:underline">privacy@visorfitness.com</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t("pages.support.sections.contact.privacyNote")}
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>{t("pages.support.sections.contact.hours")}</span>
              </div>
            </div>
          ),
        },
        {
          heading: t("pages.support.sections.faq.heading"),
          body: (
            <div className="space-y-6">
              {[
                { q: "q1", a: "a1", Icon: HelpCircle },
                { q: "q2", a: "a2", Icon: CreditCard },
                { q: "q3", a: "a3", Icon: Trash2 },
                { q: "q4", a: "a4", Icon: HelpCircle },
              ].map(({ q, a, Icon }) => (
                <div key={q}>
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                    <Icon size={18} className="text-primary" />
                    {t(`pages.support.sections.faq.${q}`)}
                  </h3>
                  <RichText content={t(`pages.support.sections.faq.${a}`)} />
                </div>
              ))}
            </div>
          ),
        },
        {
          heading: t("pages.support.sections.billing.heading"),
          body: <RichText content={t("pages.support.sections.billing.body")} />,
        },
        {
          heading: t("pages.support.sections.report.heading"),
          body: <RichText content={t("pages.support.sections.report.body")} />,
        },
        {
          heading: t("pages.support.sections.address.heading"),
          body: (
            <p style={{ whiteSpace: "pre-line" }}>
              {t("pages.support.sections.address.body")}
            </p>
          ),
        },
      ]}
    />
  );
};

export default Support;
