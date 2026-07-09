import { motion } from "framer-motion";
import {
  Users,
  Home,
  Dumbbell,
  Video,
  Wallet,
  Eye,
  Image as ImageIcon,
  Sparkles,
  IdCard,
  BadgeCheck,
  FileCheck2,
  Stethoscope,
  Heart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { CoachApplicationForm } from "@/components/coaches/CoachApplicationForm";

const SITE = "https://visorfitness.com";

const whyJoin = [
  { icon: Users, title: "Premium client base", desc: "Reach motivated VISOR Elite members ready to transform." },
  { icon: Home, title: "Home, gym & online bookings", desc: "Serve clients in whichever format fits your business." },
  { icon: Wallet, title: "Stripe Connect payouts", desc: "Fast, transparent payouts direct to your bank." },
  { icon: Eye, title: "Profile visibility", desc: "Featured placement inside a curated verified network." },
  { icon: ImageIcon, title: "Transformation portfolio", desc: "Showcase results and social proof to potential clients." },
  { icon: Sparkles, title: "AI-assisted client context", desc: "See each client's VISOR AI plan, goals and rituals." },
];

const requirements = [
  { icon: IdCard, title: "Government ID" },
  { icon: BadgeCheck, title: "Professional certification" },
  { icon: FileCheck2, title: "Police clearance where legally required" },
  { icon: Stethoscope, title: "Insurance documentation where required" },
  { icon: Heart, title: "CPR / First Aid preferred" },
  { icon: ShieldCheck, title: "Manual VISOR review" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "VISOR Elite Coach",
  description:
    "Verified personal trainers join VISOR Elite Coaches to serve premium clients with home, gym and online sessions.",
  hiringOrganization: { "@type": "Organization", name: "VISOR", sameAs: SITE },
  employmentType: "CONTRACTOR",
  datePosted: new Date().toISOString().slice(0, 10),
  jobLocationType: "TELECOMMUTE",
  url: `${SITE}/for-coaches`,
};

const ForCoaches = () => {
  return (
    <>
      <SeoHead
        title="Become a VISOR Elite Coach — Verified Personal Trainer Network"
        description="Join VISOR Elite Coaches: a premium transformation platform connecting verified personal trainers with Elite members for home, gym and online sessions."
        path="/for-coaches"
        type="website"
        jsonLd={jsonLd}
      />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[160px]" />
          </div>
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 mb-6"
            >
              For Coaches
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] leading-tight mb-6"
            >
              Become a <span className="text-gradient">VISOR Elite Coach</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Join a premium transformation platform connecting verified coaches with Elite members. All booking and payment infrastructure lives inside the VISOR app.
            </motion.p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
            >
              Apply to Join <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Why join */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-center mb-14">
              Why <span className="text-gradient">join</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {whyJoin.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card-strong rounded-2xl p-6"
                >
                  <w.icon className="text-primary mb-3" size={22} />
                  <h3 className="font-semibold mb-1">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching formats highlight */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
            {[
              { icon: Home, label: "Home visits" },
              { icon: Dumbbell, label: "Gym sessions" },
              { icon: Video, label: "Online coaching" },
            ].map((f) => (
              <div key={f.label} className="glass-card rounded-2xl p-5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <f.icon size={18} />
                </div>
                <div className="font-semibold text-sm">{f.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
                <span className="text-gradient">Requirements</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Every applicant is manually reviewed. Requirements protect clients and your professional reputation.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {requirements.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <r.icon size={18} />
                  </div>
                  <div className="text-sm font-medium">{r.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <CoachApplicationForm />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ForCoaches;
