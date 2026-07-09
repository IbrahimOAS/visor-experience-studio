import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Compare() {
  return (
    <ComingSoonPage
      title="Compare VISOR vs Trainerize, Future, Kickoff & CoPilot"
      description="Side-by-side comparisons of VISOR Elite Coaches vs Future, Trainerize, Kickoff and CoPilot — launching soon."
      path="/compare"
      h1="Compare VISOR Elite Coaches"
      intro={
        <>
          Detailed side-by-side comparisons vs Future, Trainerize, Kickoff and CoPilot are
          launching soon. Meanwhile, see how VISOR compares to MyFitnessPal, Freeletics and
          Noom on our dedicated comparison pages.
        </>
      }
      highlights={[
        "VISOR vs Future",
        "VISOR vs Trainerize",
        "VISOR vs Kickoff",
        "VISOR vs CoPilot",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/compare" },
      ]}
      notifyTopic="compare"
    />
  );
}
