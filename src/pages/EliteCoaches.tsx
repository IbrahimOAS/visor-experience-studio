import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

const EliteCoaches = () => {
  return (
    <ComingSoonPage
      title="VISOR Elite Coaches — Verified Personal Trainers (Coming Soon)"
      description="VISOR Elite Coaches will connect verified personal trainers with Elite members for home, gym and online coaching. Join the waitlist to be notified when booking goes live."
      path="/elite-coaches"
      eyebrow="Coming Soon"
      h1="VISOR Elite Coaches"
      intro={
        <>
          We're building a curated network of verified personal trainers for home,
          gym and online sessions — fully integrated with your VISOR AI plan.
          Booking, messaging and payments will live inside the VISOR mobile app.
          Join the waitlist to be the first to know when Elite Coaches launches.
        </>
      }
      highlights={[
        "Identity, certification & background verified",
        "Home, gym and online session formats",
        "Integrated with your VISOR AI plan",
        "Booking and payments inside the VISOR app",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Elite Coaches", href: "/elite-coaches" },
      ]}
      notifyTopic="elite-coaches"
      primaryCtaLabel="Get the app"
      primaryCtaHref="/#download"
    />
  );
};

export default EliteCoaches;
