import { useParams, Navigate } from "react-router-dom";
import CityTemplate from "@/templates/CityTemplate";

const CITIES: Record<string, { name: string; country: string }> = {
  "new-york": { name: "New York", country: "USA" },
  oslo: { name: "Oslo", country: "Norway" },
  london: { name: "London", country: "United Kingdom" },
  stockholm: { name: "Stockholm", country: "Sweden" },
};

export default function CityPage() {
  const { city } = useParams<{ city: string }>();
  const data = city ? CITIES[city] : undefined;
  if (!city || !data) return <Navigate to="/coaches" replace />;
  return (
    <CityTemplate
      state="coming-soon"
      data={{ slug: city, name: data.name, country: data.country }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cities", href: "/coaches" },
        { label: data.name, href: `/cities/${city}` },
      ]}
    />
  );
}
