import { useParams, Navigate } from "react-router-dom";
import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

const COACHES: Record<
  string,
  { name: string; specialty: string; city: string; intro: string }
> = {
  "marcus-cole": {
    name: "Marcus Cole",
    specialty: "Strength & Hypertrophy",
    city: "Los Angeles",
    intro:
      "IFBB Pro strength and hypertrophy coach based in Los Angeles. Marcus's full VISOR Elite profile — gallery, video intro, certifications, transformation portfolio and reviews — launches soon.",
  },
  "priya-sharma": {
    name: "Priya Sharma",
    specialty: "Mobility & Recovery",
    city: "New York",
    intro:
      "Doctor of Physical Therapy specialising in mobility, longevity and recovery. Priya's full VISOR Elite profile launches soon on the marketing site.",
  },
  "james-rivera": {
    name: "James Rivera",
    specialty: "Athletic Performance",
    city: "Miami",
    intro:
      "CSCS Elite performance coach for athletes and high-output professionals. James's full VISOR Elite profile launches soon on the marketing site.",
  },
};

export default function CoachProfile() {
  const { slug } = useParams<{ slug: string }>();
  const coach = slug ? COACHES[slug] : undefined;
  if (!coach) return <Navigate to="/coaches" replace />;

  const path = `/coaches/${slug}`;

  return (
    <ComingSoonPage
      title={`${coach.name} — VISOR Elite Coach (${coach.specialty})`}
      description={`${coach.name}, VISOR Elite ${coach.specialty} coach based in ${coach.city}. Full public profile launching soon.`}
      path={path}
      eyebrow="Profile launching soon"
      h1={coach.name}
      intro={<>{coach.intro}</>}
      highlights={[
        `Specialty: ${coach.specialty}`,
        `Based in ${coach.city}`,
        "Identity, insurance & CPR verified",
        "Home, gym and online sessions",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Coaches", href: "/coaches" },
        { label: coach.name, href: path },
      ]}
      notifyTopic={`coach-${slug}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: coach.name,
        jobTitle: `${coach.specialty} Coach`,
        address: { "@type": "PostalAddress", addressLocality: coach.city },
        worksFor: { "@type": "Organization", name: "VISOR" },
      }}
    />
  );
}
