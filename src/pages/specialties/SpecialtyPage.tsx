import { useParams, Navigate } from "react-router-dom";
import { ComingSoonPage } from "@/components/seo/ComingSoonPage";

const SPECIALTIES: Record<string, { label: string; blurb: string }> = {
  "strength-coach": {
    label: "Strength Coach",
    blurb: "Get matched with VISOR Elite strength coaches for powerlifting, hypertrophy and progressive overload programming.",
  },
  "bodybuilding-coach": {
    label: "Bodybuilding Coach",
    blurb: "Physique-focused VISOR Elite coaches for hypertrophy, cutting, contest prep and structured bodybuilding.",
  },
  "weight-loss-coach": {
    label: "Weight Loss Coach",
    blurb: "Sustainable fat loss with VISOR Elite coaches combining training, nutrition and behavior coaching.",
  },
  "home-personal-trainer": {
    label: "Home Personal Trainer",
    blurb: "Verified home personal trainers who travel to you — CPR, insurance and identity checked.",
  },
  "online-fitness-coach": {
    label: "Online Fitness Coach",
    blurb: "1:1 online fitness coaching from VISOR Elite trainers with programming, check-ins and video reviews.",
  },
  "women-fitness-coach": {
    label: "Women's Fitness Coach",
    blurb: "Female VISOR Elite coaches focused on strength, hormones, pre/postnatal and long-term identity change.",
  },
  "sports-performance-coach": {
    label: "Sports Performance Coach",
    blurb: "Speed, power and sport-specific training from VISOR Elite performance coaches.",
  },
  "mobility-coach": {
    label: "Mobility Coach",
    blurb: "Mobility, movement quality and longevity coaching from qualified VISOR Elite specialists.",
  },
};

export default function SpecialtyPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? SPECIALTIES[slug] : undefined;
  if (!data) return <Navigate to="/coaches" replace />;

  const path = `/specialties/${slug}`;

  return (
    <ComingSoonPage
      title={`${data.label} — VISOR Elite`}
      description={data.blurb}
      path={path}
      h1={`Find a ${data.label}`}
      intro={<>{data.blurb} The dedicated specialty directory is launching soon.</>}
      highlights={[
        "Verified VISOR Elite coaches only",
        "Home, gym & online options",
        "CPR & insurance checked",
        "Booking inside the VISOR app",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Specialties", href: "/coaches" },
        { label: data.label, href: path },
      ]}
      notifyTopic={`specialty-${slug}`}
    />
  );
}
