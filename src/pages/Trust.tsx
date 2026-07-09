import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Trust() {
  return (
    <ComingSoonPage
      title="VISOR Trust & Safety Center"
      description="How VISOR verifies Elite coaches: police checks, insurance, CPR, identity verification, emergency procedures and privacy standards."
      path="/trust"
      h1="Trust & Safety Center"
      intro={
        <>
          The VISOR Trust Center — full details on coach verification, insurance,
          emergency procedures, home-visit standards, privacy and safeguarding — is
          launching soon.
        </>
      }
      highlights={[
        "Identity & background checks",
        "Insurance verification",
        "CPR & first aid certified",
        "Session check-in & safety",
        "Privacy & data protection",
        "Female safety & home visit standards",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Trust", href: "/trust" },
      ]}
      notifyTopic="trust-center"
    />
  );
}
