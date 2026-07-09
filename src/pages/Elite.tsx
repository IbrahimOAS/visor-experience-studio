import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Elite() {
  return (
    <ComingSoonPage
      title="VISOR Elite — Verified Personal Coaches"
      description="VISOR Elite: the premium tier with verified personal coaches, unlimited AI features and priority support."
      path="/elite"
      h1="VISOR Elite"
      intro={
        <>
          VISOR Elite unlocks unlimited AI coaching plus access to verified Elite Coaches —
          home, gym or online. The dedicated Elite hub is launching soon.
        </>
      }
      highlights={[
        "Unlimited AI coaching",
        "Verified Elite Coaches",
        "Priority support",
        "Home, gym & online sessions",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Elite", href: "/elite" },
      ]}
      notifyTopic="elite"
      primaryCtaLabel="Explore Elite Coaches"
      primaryCtaHref="/elite-coaches"
    />
  );
}
