import { motion } from "framer-motion";
import { ShieldCheck, Video, MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import coachingHero from "@/assets/coaching-hero.jpg";

const coaches = [
  {
    name: "Marcus Cole",
    specialty: "Strength & Hypertrophy",
    rating: 4.9,
    sessions: "2,400+",
    badge: "IFBB Pro",
  },
  {
    name: "Priya Sharma",
    specialty: "Mobility & Recovery",
    rating: 4.8,
    sessions: "1,800+",
    badge: "DPT Certified",
  },
  {
    name: "James Rivera",
    specialty: "Athletic Performance",
    rating: 5.0,
    sessions: "3,100+",
    badge: "CSCS Elite",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Vetted Coaches",
    description: "Every coach is background-checked, certified, and reviewed by our team before onboarding.",
  },
  {
    icon: MapPin,
    title: "At-Home or Gym Sessions",
    description: "Your coach comes to you — at home, in the park, or at your gym. You choose the location.",
  },
  {
    icon: Video,
    title: "Hybrid Coaching",
    description: "Combine in-person sessions with live video check-ins for accountability between visits.",
  },
  {
    icon: Calendar,
    title: "Flexible Booking",
    description: "Book single sessions or weekly packages. Reschedule anytime, no penalties.",
  },
];

const PersonalCoaching = () => (
  <section id="coaching" className="py-28 px-6 relative overflow-hidden">
    {/* Ambient */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 mb-6">
          Premium · Elite Members Only
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Your Coach, <span className="text-gradient">Your Door</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Book verified, world-class coaches for personalized 1-on-1 training sessions
          at your home. Real coaching. Real results.
        </p>
      </motion.div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl overflow-hidden mb-20 relative group"
      >
        <img
          src={coachingHero}
          alt="Personal coaching session at home"
          className="w-full h-[340px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-2xl md:text-3xl font-bold mb-2">
            Personalized fitness that comes to <span className="text-gradient">you</span>
          </p>
          <p className="text-muted-foreground text-sm max-w-lg">
            Custom training plans, real-time adjustments, and supportive coaching — all in person.
          </p>
        </div>
      </motion.div>

      {/* Features grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-20">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-strong rounded-2xl p-6 hover:border-primary/20 transition-all duration-500"
          >
            <feature.icon className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-semibold mb-1.5">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Coaches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-3">
          Meet Your <span className="text-gradient">Coaches</span>
        </h3>
        <p className="text-muted-foreground text-sm">
          Hand-picked professionals. Background-checked. Peer-reviewed.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {coaches.map((coach, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="glass-card-strong rounded-2xl p-6 text-center hover:shadow-[0_0_50px_-10px_hsl(28,100%,55%/0.2)] transition-all duration-500 group"
          >
            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {coach.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{coach.badge}</span>
            </div>
            <h4 className="text-lg font-bold mb-0.5">{coach.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{coach.specialty}</p>
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star size={12} className="text-primary fill-primary" />
                {coach.rating}
              </span>
              <span className="text-border">|</span>
              <span>{coach.sessions} sessions</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href="#download"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(28,100%,55%/0.5)] group"
        >
          Book a Coach
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
        <p className="text-xs text-muted-foreground mt-4">
          Starting at <span className="text-primary font-semibold">$149/session</span> · Available in select cities
        </p>
      </motion.div>
    </div>
  </section>
);

export default PersonalCoaching;
