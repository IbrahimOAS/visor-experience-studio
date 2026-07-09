import { ComingSoonPage } from "@/components/seo/ComingSoonPage";
import type { Breadcrumb, TemplateState } from "./types";

export interface TransformationData {
  slug?: string;
}

interface Props {
  state?: TemplateState;
  data?: TransformationData;
  breadcrumbs?: Breadcrumb[];
}

/**
 * Transformation Journal Template.
 *
 * NOT "Success Stories" — until real members opt in post-launch, this is
 * framed as a forward-looking journal, never a testimonial wall.
 */
export default function TransformationTemplate({
  state = "coming-soon",
  breadcrumbs,
}: Props) {
  if (state === "coming-soon") {
    return (
      <ComingSoonPage
        title="Transformation Journal — VISOR"
        description="Real member and coach transformation stories will be published here after launch, with their permission. No fabricated before/after content."
        path="/transformations"
        eyebrow="Transformation Journal"
        h1="Future Transformations"
        intro={
          <>
            Real member stories will be featured here after launch, with their
            permission. VISOR will never publish fabricated transformations,
            reviews, or before/after images.
          </>
        }
        highlights={[
          "Consent-based, verified stories only",
          "Member and coach journeys",
          "Video interviews",
          "Identity & behavior progress",
        ]}
        breadcrumbs={
          breadcrumbs ?? [
            { label: "Home", href: "/" },
            { label: "Transformation Journal", href: "/transformations" },
          ]
        }
        notifyTopic="transformations"
        primaryCtaLabel="Notify Me"
        primaryCtaHref="/support?topic=transformations"
      />
    );
  }

  return null;
}
