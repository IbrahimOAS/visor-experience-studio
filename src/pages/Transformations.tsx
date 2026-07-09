import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Transformations() {
  return (
    <ComingSoonPage
      title="Elite Success Stories — VISOR Transformations"
      description="Real transformations from members coached inside VISOR: stories, videos, before/after and identity journeys."
      path="/transformations"
      h1="Elite Success Stories"
      intro={
        <>
          A curated library of real VISOR member transformations — stories, videos,
          before/after and identity journeys — is coming soon.
        </>
      }
      highlights={[
        "Verified member stories",
        "Video interviews",
        "Identity & behavior journeys",
        "Coach-led transformations",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Transformations", href: "/transformations" },
      ]}
      notifyTopic="transformations"
    />
  );
}
