import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Home,
  Dumbbell,
  Video,
  UserCheck,
  Sparkles,
  BadgeCheck,
  FileCheck2,
  Stethoscope,
  Heart,
  Search,
  MessageSquareLock,
  AlertTriangle,
  PhoneCall,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "@/components/seo/SeoHead";

const SITE = "https://visorfitness.com";

const steps = [
  { title: "Upgrade to Elite", desc: "Unlock the VISOR Elite tier from inside the app." },
  { title: "Browse verified coaches", desc: "Discover trainers filtered by specialty and location." },
  { title: "Book home, gym or online", desc: "Pick a session format and time that fits your life." },
  { title: "Transform with AI + human coaching", desc: "Your coach syncs with your VISOR AI plan." },
];

const trustItems = [
  { icon: UserCheck, title: "Identity verification", desc: "Government ID checked before any client sees a profile." },
  { icon: BadgeCheck, title: "Certification review", desc: "Recognized credentials manually validated by our team." },
  { icon: FileCheck2, title: "Police clearance", desc: "Background checks where legally applicable." },
  { icon: Stethoscope, title: "Insurance verification", desc: "Professional liability documentation on file." },
  { icon: Heart, title: "CPR / First Aid", desc: "Safety qualifications recognized as trust badges." },
  { icon: ShieldCheck, title: "Manual VISOR approval", desc: "No self-serve listings. Every coach is reviewed by a human." },
];

const coachingOptions = [
  { icon: Home, title: "Home Personal Training", desc: "Verified coaches come to your door with equipment on request." },
  { icon: Dumbbell, title: "Gym Sessions", desc: "Meet your coach at a partnered gym or your own." },
  { icon: Video, title: "Online Coaching", desc: "Live video sessions from anywhere in the world." },
  { icon: MessageSquareLock, title: "Dedicated Remote Coach", desc: "Ongoing programming, check-ins and messaging." },
  { icon: Sparkles, title: "Transformation Packages", desc: "Multi-week bundles built around your goal." },
];

const safety = [
  { icon: ClipboardCheck, title: "Session check-in" },
  { icon: BadgeCheck, title: "Session completion confirmation" },
  { icon: PhoneCall, title: "Emergency contact" },
  { icon: AlertTriangle, title: "Incident reporting" },
  { icon: MessageSquareLock, title: "Private in-app messaging" },
  { icon: ShieldCheck, title: "Verified coach identity" },
];

const pricingExamples = [
  { label: "Sessions from", price: "$149" },
  { label: "Weekly packages from", price: "$399" },
  { label: "Dedicated remote coaching from", price: "$199/mo" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "VISOR Elite Coaches",
  serviceType: "Verified personal training",
  provider: { "@type": "Organization", name: "VISOR" },
  areaServed: "Worldwide",
  description:
    "VISOR Elite members connect with verified personal trainers for home, gym or online coaching, powered by AI-assisted context.",
  url: `${SITE}/elite-coaches`,
};

const EliteCoaches = () => {
  return (
    <>
      <SeoHead
        title="VISOR Elite Coaches — Verified Personal Trainers, Home / Gym / Online"
        description="Meet your verified transformation partner. VISOR Elite members book vetted personal trainers for home, gym or online coaching — powered by AI + human accountability."
        path="/elite-coaches"
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
              Elite tier · Verified Coaches
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] leading-tight mb-6"
            >
              Meet Your Verified{" "}
              <span className="text-gradient">Transformation Partner</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              VISOR Elite members can connect with verified personal trainers for home, gym or online coaching. All booking, payments and messaging happen inside the VISOR app.
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
              >
                Download VISOR <ArrowRight size={16} />
              </a>
              <a
                href="/#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card-strong text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
              >
                Explore Elite
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-center mb-14">
              How it <span className="text-gradient">works</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card-strong rounded-2xl p-6 relative"
                >
                  <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Verification trust */}
        <section className="py-20 px-6 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
                Every coach, <span className="text-gradient">verified</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No self-serve listings. No unvetted profiles. Just trainers who have passed our manual verification pipeline.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {trustItems.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card rounded-2xl p-6 hover:border-primary/20 transition-colors"
                >
                  <t.icon className="text-primary mb-3" size={22} />
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coaching Options */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-center mb-14">
              Coaching <span className="text-gradient">options</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {coachingOptions.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card-strong rounded-2xl p-6"
                >
                  <c.icon className="text-primary mb-3" size={22} />
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Pricing <span className="text-gradient">preview</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm">
              Elite membership unlocks access to verified coaches. Coaching is purchased separately inside the VISOR app.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {pricingExamples.map((p) => (
                <div key={p.label} className="glass-card-strong rounded-2xl p-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {p.label}
                  </div>
                  <div className="text-2xl font-bold text-primary">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety center */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-center mb-14">
              Safety <span className="text-gradient">center</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {safety.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <s.icon size={18} />
                  </div>
                  <div className="text-sm font-medium">{s.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center glass-card-elite rounded-3xl p-10">
            <ShieldCheck className="text-primary mx-auto mb-4" size={36} />
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Unlock <span className="text-gradient">VISOR Elite Coaches</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Coach discovery, booking and messaging live inside the VISOR mobile app. Download to get started.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/#download"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
              >
                Download the App <ArrowRight size={16} />
              </a>
              <Link
                to="/for-coaches"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card-strong text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
              >
                Are you a coach? <Search size={16} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default EliteCoaches;
