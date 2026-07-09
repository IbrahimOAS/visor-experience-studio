import { ComingSoonPage } from "@/components/seo/ComingSoonPage";
import type { Breadcrumb, TemplateState } from "./types";

export interface CityData {
  slug: string;
  name: string;
  country: string;
}

interface Props {
  state?: TemplateState;
  data: CityData;
  breadcrumbs: Breadcrumb[];
}

/**
 * City Template — architecture only.
 * Live state will render city coach list, session formats, local content,
 * FAQ, and app download CTA once Elite Coaches launches.
 */
export default function CityTemplate({
  state = "coming-soon",
  data,
  breadcrumbs,
}: Props) {
  const path = `/cities/${data.slug}`;

  if (state === "coming-soon") {
    return (
      <ComingSoonPage
        title={`Personal Trainers in ${data.name} — VISOR Elite Coaches`}
        description={`VISOR is currently recruiting verified coaches in ${data.name}. Join the waitlist for early access.`}
        path={path}
        eyebrow="Coming Soon"
        h1={`Elite Coaches in ${data.name} — Coming Soon`}
        intro={
          <>
            We're currently recruiting verified coaches in {data.name}. Home PT, gym
            PT and online coaching are all launching together — join the waitlist
            for early access.
          </>
        }
        highlights={[
          "Home personal training",
          "Gym-based sessions",
          "Online coaching",
          `${data.name}, ${data.country}`,
        ]}
        breadcrumbs={breadcrumbs}
        notifyTopic={`city-${data.slug}`}
        primaryCtaLabel="Notify Me"
        primaryCtaHref={`/support?topic=city-${data.slug}`}
      />
    );
  }

  return null;
}
