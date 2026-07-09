import { I18nContentPage } from "@/components/seo/I18nContentPage";
import type { Breadcrumb, TemplateState } from "./types";

export interface ComparisonData {
  /** i18n page key matching src/i18n/locales/*.json comparison entries */
  pageKey: string;
  path: string;
}

interface Props {
  state?: TemplateState;
  data: ComparisonData;
  breadcrumbs?: Breadcrumb[];
}

/**
 * Comparison Template.
 *
 * Comparison pages are safe to publish today as long as every claim is
 * factual. Any Elite-Coaches capability must be phrased as
 * "in development / launching soon" — never as if the marketplace is
 * already live. Copy is enforced in the i18n JSON.
 */
export default function ComparisonTemplate({ data, breadcrumbs }: Props) {
  const crumbs = breadcrumbs ?? [{ label: "Home", href: "/" }];
  return (
    <I18nContentPage
      pageKey={data.pageKey}
      path={data.path}
      breadcrumbTrail={crumbs.map((c) => ({
        key: c.label.toLowerCase(),
        href: c.href,
      }))}
    />
  );
}
