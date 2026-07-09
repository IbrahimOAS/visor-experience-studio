import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function CoachesIndex() {
  return (
    <ComingSoonPage
      title="VISOR Elite Coaches — Verified Personal Trainers"
      description="Browse VISOR Elite personal trainers, home PT, gym PT and online coaches. Public coach profiles launching soon on the VISOR marketing site."
      path="/coaches"
      h1="Meet the VISOR Elite Coaches"
      intro={
        <>
          Public coach profiles are launching soon. Every VISOR Elite coach is
          identity-verified, insurance-checked and CPR-certified. Booking, messaging and
          payments live inside the VISOR mobile app.
        </>
      }
      highlights={[
        "Verified identity & background",
        "CPR & first-aid certified",
        "Insurance verified",
        "Home, gym and online sessions",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Coaches", href: "/coaches" },
      ]}
      notifyTopic="elite-coaches"
    />
  );
}
