import { ComingSoonPage } from "@/components/seo/ComingSoonPage";
import type { Breadcrumb, TemplateState } from "./types";

export interface SpecialtyData {
  slug: string;
  label: string;
  blurb: string;
}

interface Props {
  state?: TemplateState;
  data: SpecialtyData;
  breadcrumbs: Breadcrumb[];
}

/**
 * Specialty Template — architecture only.
 * Live state will render specialty-matched coaches, methodology,
 * expected outcomes, FAQ and download CTA.
 */
export default function SpecialtyTemplate({
  state = "coming-soon",
  data,
  breadcrumbs,
}: Props) {
  const path = `/specialties/${data.slug}`;

  if (state === "coming-soon") {
    return (
      <ComingSoonPage
        title={`${data.label} — VISOR Elite (Coming Soon)`}
        description={`VISOR is building a network of verified ${data.label}s. Download VISOR and join the waitlist.`}
        path={path}
        eyebrow="Coming Soon"
        h1={`${data.label} — Coming Soon`}
        intro={
          <>
            {data.blurb} VISOR is building a verified network — download the app and
            join the waitlist to be matched at launch.
          </>
        }
        highlights={[
          "Verified VISOR Elite coaches only",
          "Home, gym & online options",
          "CPR & insurance checked",
          "Booking inside the VISOR app",
        ]}
        breadcrumbs={breadcrumbs}
        notifyTopic={`specialty-${data.slug}`}
        primaryCtaLabel="Notify Me"
        primaryCtaHref={`/support?topic=specialty-${data.slug}`}
      />
    );
  }

  return null;
}
