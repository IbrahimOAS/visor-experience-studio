import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

export default function Business() {
  return (
    <ComingSoonPage
      title="VISOR for Business — Corporate Wellness"
      description="VISOR for companies, HR teams and employee wellness programs. Corporate landing launching soon."
      path="/business"
      h1="VISOR for Business"
      intro={
        <>
          VISOR for companies, HR teams and employee wellness — corporate plans, admin
          dashboards and Elite Coach benefits — is launching soon.
        </>
      }
      highlights={[
        "Corporate wellness plans",
        "HR admin dashboard",
        "Elite Coach benefits",
        "Team-level analytics",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Business", href: "/business" },
      ]}
      notifyTopic="business"
    />
  );
}
