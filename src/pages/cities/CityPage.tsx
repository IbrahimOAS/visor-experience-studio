import { useParams, Navigate } from "react-router-dom";
import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

const CITIES: Record<string, { name: string; country: string }> = {
  "new-york": { name: "New York", country: "USA" },
  oslo: { name: "Oslo", country: "Norway" },
  london: { name: "London", country: "United Kingdom" },
  stockholm: { name: "Stockholm", country: "Sweden" },
};

export default function CityPage() {
  const { city } = useParams<{ city: string }>();
  const data = city ? CITIES[city] : undefined;
  if (!data) return <Navigate to="/coaches" replace />;

  const path = `/cities/${city}`;

  return (
    <ComingSoonPage
      title={`Personal Trainers in ${data.name} — VISOR Elite Coaches`}
      description={`Verified home, gym and online personal trainers in ${data.name}. City coach directory launching soon on VISOR.`}
      path={path}
      h1={`VISOR Elite Coaches in ${data.name}`}
      intro={
        <>
          The full {data.name} directory of VISOR Elite personal trainers — home PT, gym PT
          and online coaching — is launching soon. Join the waitlist to hear the moment
          verified coaches are live in your city.
        </>
      }
      highlights={[
        "Home personal training",
        "Gym-based sessions",
        "Online coaching",
        `${data.name}, ${data.country}`,
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cities", href: "/coaches" },
        { label: data.name, href: path },
      ]}
      notifyTopic={`city-${city}`}
    />
  );
}
