import { ComingSoonPage } from "@/components/seo/ComingSoonPage";
import type { Breadcrumb, TemplateState } from "./types";

export interface CoachProfileData {
  slug: string;
  name?: string;
  specialty?: string;
  city?: string;
  intro?: string;
}

interface Props {
  state?: TemplateState;
  data: CoachProfileData;
  breadcrumbs: Breadcrumb[];
}

/**
 * Coach Profile Template — architecture only.
 *
 * Live state is intentionally not implemented yet: it will render the full
 * profile (gallery, video, bio, certifications, verification badges,
 * languages, areas served, transformations, reviews, "Download to book"
 * CTA) once the Elite Coaches marketplace ships in the mobile app.
 */
export default function CoachProfileTemplate({
  state = "coming-soon",
  data,
  breadcrumbs,
}: Props) {
  const path = `/coaches/${data.slug}`;

  if (state === "coming-soon") {
    return (
      <ComingSoonPage
        title={`VISOR Elite Coach Profile — ${data.name ?? "Coming Soon"}`}
        description="VISOR is currently onboarding verified coaches. Public coach profiles launch when the Elite Coaches marketplace goes live in the VISOR mobile app."
        path={path}
        eyebrow="Elite Coaches — Coming Soon"
        h1="Elite Coach Profiles — Coming Soon"
        intro={
          <>
            VISOR is currently onboarding verified coaches. Join the waitlist to be
            notified the moment Elite Coach profiles go live in your area.
          </>
        }
        highlights={[
          "Identity, insurance & CPR verified",
          "Home, gym and online sessions",
          "Booking inside the VISOR app",
          "Real reviews from real members only",
        ]}
        breadcrumbs={breadcrumbs}
        notifyTopic={`coach-${data.slug}`}
        primaryCtaLabel="Notify Me"
        primaryCtaHref={`/support?topic=coach-${data.slug}`}
      />
    );
  }

  // Beta and Live states will be implemented when the marketplace launches.
  return null;
}
