import { useParams, Navigate } from "react-router-dom";
import SpecialtyTemplate from "@/templates/SpecialtyTemplate";

const SPECIALTIES: Record<string, { label: string; blurb: string }> = {
  "strength-coach": { label: "Strength Coach", blurb: "Strength, powerlifting, hypertrophy and progressive overload." },
  "bodybuilding-coach": { label: "Bodybuilding Coach", blurb: "Physique work, hypertrophy, cutting and contest prep." },
  "weight-loss-coach": { label: "Weight Loss Coach", blurb: "Sustainable fat loss with training, nutrition and behavior coaching." },
  "home-personal-trainer": { label: "Home Personal Trainer", blurb: "Verified trainers who travel to you — CPR, insurance and identity checked." },
  "online-fitness-coach": { label: "Online Fitness Coach", blurb: "1:1 online coaching with programming, check-ins and video reviews." },
  "women-fitness-coach": { label: "Women's Fitness Coach", blurb: "Female coaches focused on strength, hormones, pre/postnatal and identity change." },
  "sports-performance-coach": { label: "Sports Performance Coach", blurb: "Speed, power and sport-specific training." },
  "mobility-coach": { label: "Mobility Coach", blurb: "Mobility, movement quality and longevity coaching." },
};

export default function SpecialtyPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? SPECIALTIES[slug] : undefined;
  if (!slug || !data) return <Navigate to="/coaches" replace />;
  return (
    <SpecialtyTemplate
      state="coming-soon"
      data={{ slug, label: data.label, blurb: data.blurb }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Specialties", href: "/coaches" },
        { label: data.label, href: `/specialties/${slug}` },
      ]}
    />
  );
}
