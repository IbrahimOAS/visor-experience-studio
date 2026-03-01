import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Video, MapPin, Calendar, Star, ArrowRight, X, Award, Clock, Users } from "lucide-react";
import coachingHero from "@/assets/coaching-hero.jpg";
import coachMarcus from "@/assets/coach-marcus.jpg";
import coachPriya from "@/assets/coach-priya.jpg";
import coachJames from "@/assets/coach-james.jpg";

const coaches = [
  {
    name: "Marcus Cole",
    specialty: "Strength & Hypertrophy",
    rating: 4.9,
    sessions: "2,400+",
    badge: "IFBB Pro",
    photo: coachMarcus,
    bio: "Marcus is a former competitive bodybuilder turned elite coach with over 12 years of hands-on experience. He specializes in progressive overload programming, body recomposition, and contest prep. His clients have collectively lost over 5,000 lbs and gained lean muscle mass under his guidance.",
    certifications: ["IFBB Professional League", "NASM Certified Personal Trainer", "Precision Nutrition Level 2", "CPR/AED Certified"],
    availability: "Mon–Sat, 6AM–8PM",
    locations: ["Los Angeles", "Orange County"],
    price: "$149",
  },
  {
    name: "Priya Sharma",
    specialty: "Mobility & Recovery",
    rating: 4.8,
    sessions: "1,800+",
    badge: "DPT Certified",
    photo: coachPriya,
    bio: "Dr. Priya Sharma is a Doctor of Physical Therapy who bridges the gap between rehabilitation and peak performance. She combines corrective exercise, breathwork, and dynamic mobility protocols to help clients move pain-free and perform at their best — whether recovering from injury or training for competition.",
    certifications: ["Doctor of Physical Therapy (DPT)", "Functional Movement Screen (FMS) Level 2", "Yoga Alliance RYT-500", "Dry Needling Certified"],
    availability: "Mon–Fri, 7AM–6PM",
    locations: ["New York City", "Brooklyn"],
    price: "$169",
  },
  {
    name: "James Rivera",
    specialty: "Athletic Performance",
    rating: 5.0,
    sessions: "3,100+",
    badge: "CSCS Elite",
    photo: coachJames,
    bio: "James has trained NCAA Division I athletes, MMA fighters, and weekend warriors alike. His evidence-based approach blends explosive power training, speed development, and sport-specific conditioning. He's known for building unshakeable mental toughness alongside physical performance.",
    certifications: ["NSCA CSCS (Certified Strength & Conditioning Specialist)", "USA Weightlifting Level 2", "First Responder Sports Medicine", "TRX Suspension Training Certified"],
    availability: "Mon–Sun, 5AM–9PM",
    locations: ["Miami", "Fort Lauderdale"],
    price: "$189",
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

type Coach = typeof coaches[number];

const CoachModal = ({ coach, onClose }: { coach: Coach; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={(e) => e.stopPropagation()}
      className="relative glass-card-elite rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-primary/10 transition-colors"
      >
        <X size={18} className="text-muted-foreground" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={coach.photo}
          alt={coach.name}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30"
        />
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{coach.badge}</span>
          </div>
          <h3 className="text-2xl font-bold">{coach.name}</h3>
          <p className="text-sm text-muted-foreground">{coach.specialty}</p>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-primary fill-primary" />
              {coach.rating}
            </span>
            <span className="text-border">·</span>
            <span>{coach.sessions} sessions</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2 text-foreground">About</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{coach.bio}</p>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-1.5">
          <Award size={14} className="text-primary" />
          Certifications
        </h4>
        <div className="space-y-2">
          {coach.certifications.map((cert, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass-card rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock size={12} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Availability</span>
          </div>
          <p className="text-xs text-foreground">{coach.availability}</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={12} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Locations</span>
          </div>
          <p className="text-xs text-foreground">{coach.locations.join(", ")}</p>
        </div>
      </div>

      {/* CTA */}
      <a
        href="#download"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)] group"
      >
        Book Session — {coach.price}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
      <p className="text-center text-[10px] text-muted-foreground mt-2">
        First session includes a free consultation
      </p>
    </motion.div>
  </motion.div>
);

const PersonalCoaching = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  return (
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
              onClick={() => setSelectedCoach(coach)}
              className="glass-card-strong rounded-2xl p-6 text-center hover:shadow-[0_0_50px_-10px_hsl(28,100%,55%/0.2)] transition-all duration-500 group cursor-pointer"
            >
              <img
                src={coach.photo}
                alt={coach.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex items-center justify-center gap-1 mb-1">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{coach.badge}</span>
              </div>
              <h4 className="text-lg font-bold mb-0.5">{coach.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{coach.specialty}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-primary fill-primary" />
                  {coach.rating}
                </span>
                <span className="text-border">|</span>
                <span>{coach.sessions} sessions</span>
              </div>
              <span className="text-[11px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Profile →
              </span>
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

      {/* Coach Detail Modal */}
      <AnimatePresence>
        {selectedCoach && (
          <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PersonalCoaching;
