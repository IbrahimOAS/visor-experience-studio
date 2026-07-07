import { useTranslation } from "react-i18next";
import { ContentPage } from "@/components/seo/ContentPage";
import { RichText } from "@/components/seo/RichText";

interface I18nSection {
  heading: string;
  body: string;
}

interface I18nPage {
  title: string;
  description: string;
  h1: string;
  crumb: string;
  intro: string;
  sections: I18nSection[];
}

interface Props {
  pageKey: string;
  path: string;
  breadcrumbTrail: Array<{ key: "home" | "compare" | "concepts" | "support"; href: string }>;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function I18nContentPage({ pageKey, path, breadcrumbTrail, jsonLd }: Props) {
  const { t } = useTranslation();
  const page = t(`pages.${pageKey}`, { returnObjects: true }) as I18nPage;

  const breadcrumbs = [
    ...breadcrumbTrail.map((b) => ({
      label: t(`breadcrumbs.${b.key}`),
      href: b.href,
    })),
    { label: page.crumb, href: path },
  ];

  return (
    <ContentPage
      title={page.title}
      description={page.description}
      path={path}
      h1={page.h1}
      breadcrumbs={breadcrumbs}
      jsonLd={jsonLd}
      ctaLabel={t("hero.cta")}
      intro={<RichText content={page.intro} />}
      sections={(page.sections ?? []).map((s) => ({
        heading: s.heading,
        body: <RichText content={s.body} />,
      }))}
    />
  );
}
