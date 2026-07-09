import CoachProfileTemplate from "@/templates/CoachProfileTemplate";
import { useParams } from "react-router-dom";

export default function CoachProfile() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <CoachProfileTemplate
      state="coming-soon"
      data={{ slug: slug ?? "coach" }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Coaches", href: "/coaches" },
        { label: "Coming Soon", href: `/coaches/${slug ?? ""}` },
      ]}
    />
  );
}
