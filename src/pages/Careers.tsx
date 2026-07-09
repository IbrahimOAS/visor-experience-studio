import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Careers() {
  return (
    <ComingSoonPage
      title="Careers at VISOR"
      description="Join the team building the future of emotionally adaptive fitness. Open roles launching soon."
      path="/careers"
      h1="Careers at VISOR"
      intro={
        <>
          We're building the emotionally adaptive fitness platform. Open roles across
          engineering, AI, design, coaching operations and growth are launching soon.
        </>
      }
      highlights={[
        "Engineering & AI",
        "Design & product",
        "Coaching operations",
        "Growth & marketing",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ]}
      notifyTopic="careers"
      primaryCtaLabel="Contact us"
      primaryCtaHref="/support"
    />
  );
}
