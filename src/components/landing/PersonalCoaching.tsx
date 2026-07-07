import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Video, MapPin, Calendar, Star, X, Award, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import coachingHero1 from "@/assets/coaching-hero-1.jpg";
import coachingHero2 from "@/assets/coaching-hero-2.jpg";
import coachMarcus from "@/assets/coach-marcus.jpg";
import coachPriya from "@/assets/coach-priya.jpg";
import coachJames from "@/assets/coach-james.jpg";

const FEATURE_ICONS = [ShieldCheck, MapPin, Video, Calendar];
const COACH_PHOTOS = [coachMarcus, coachPriya, coachJames];
const COACH_META = [
  { rating: 4.9, sessions: "2,400+", pricing: { session: "$149", weekly: "$399", monthly: "$1,199" } },
  { rating: 4.8, sessions: "1,800+", pricing: { session: "$169", weekly: "$449", monthly: "$1,349" } },
  { rating: 5.0, sessions: "3,100+", pricing: { session: "$189", weekly: "$499", monthly: "$1,499" } },
];

type PeriodKey = "session" | "weekly" | "monthly";

interface CoachI18n {
  name: string;
  specialty: string;
  badge: string;
  bio: string;
  certifications: string[];
  availability: string;
  locations: string[];
}

interface Coach extends CoachI18n {
  photo: string;
  rating: number;
  sessions: string;
  pricing: Record<PeriodKey, string>;
}

const CoachModal = ({ coach, onClose }: { coach: Coach; onClose: () => void }) => {
  const { t } = useTranslation();
  return (
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
        <button
          onClick={onClose}
          aria-label={t("landing.coaching.modal.close")}
          className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-primary/10 transition-colors"
        >
          <X size={18} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={coach.photo} alt={coach.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30" />
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
              <span>{coach.sessions} {t("landing.coaching.sessionsSuffix")}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2 text-foreground">{t("landing.coaching.modal.about")}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{coach.bio}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-1.5">
            <Award size={14} className="text-primary" />
            {t("landing.coaching.modal.certifications")}
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

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="glass-card rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("landing.coaching.modal.availability")}</span>
            </div>
            <p className="text-xs text-foreground">{coach.availability}</p>
          </div>
          <div className="glass-card rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={12} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("landing.coaching.modal.locations")}</span>
            </div>
            <p className="text-xs text-foreground">{coach.locations.join(", ")}</p>
          </div>
        </div>

        <div className="w-full py-4 rounded-xl bg-muted/50 border border-border text-center">
          <p className="text-sm font-semibold text-foreground mb-1">{t("landing.coaching.modal.comingSoonTitle")}</p>
          <p className="text-xs text-muted-foreground">
            {t("landing.coaching.modal.comingSoonBodyPre")}{" "}
            <a href="#features" onClick={onClose} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              {t("landing.coaching.modal.comingSoonBodyLink")}
            </a>
            {t("landing.coaching.modal.comingSoonBodySuffix")}
          </p>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          {t("landing.coaching.modal.beFirst")}
        </p>
      </motion.div>
    </motion.div>
  );
};

const PersonalCoaching = () => {
  const { t } = useTranslation();
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [period, setPeriod] = useState<PeriodKey>("session");

  const featureStrings = t("landing.coaching.features", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const coachStrings = t("landing.coaching.coaches", { returnObjects: true }) as CoachI18n[];
  const coaches: Coach[] = coachStrings.map((c, i) => ({ ...c, photo: COACH_PHOTOS[i], ...COACH_META[i] }));

  const periods: Array<{ key: PeriodKey; label: string }> = [
    { key: "session", label: t("landing.coaching.periodSession") },
    { key: "weekly", label: t("landing.coaching.periodWeekly") },
    { key: "monthly", label: t("landing.coaching.periodMonthly") },
  ];

  const perLabel = (p: PeriodKey) => p === "session" ? t("landing.coaching.perSession") : p === "weekly" ? t("landing.coaching.perWeek") : t("landing.coaching.perMonth");

  return (
    <section id="coaching" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 mb-6">
            {t("landing.coaching.badge")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.coaching.titlePre")} <span className="text-gradient">{t("landing.coaching.titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("landing.coaching.subtitle")}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grid md:grid-cols-2 gap-4 mb-20">
          <div className="rounded-3xl overflow-hidden relative group">
            <img src={coachingHero1} alt="Battle ropes training session" className="w-full h-[260px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          <div className="rounded-3xl overflow-hidden relative group">
            <img src={coachingHero2} alt="Personal coaching session" className="w-full h-[260px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xl md:text-2xl font-bold mb-1">
                {t("landing.coaching.heroCaptionPre")} <span className="text-gradient">{t("landing.coaching.heroCaptionAccent")}</span>
              </p>
              <p className="text-muted-foreground text-xs max-w-md">
                {t("landing.coaching.heroCaptionSub")}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {featureStrings.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-strong rounded-2xl p-6 hover:border-primary/20 transition-all duration-500">
                <Icon className="text-primary mb-3" size={24} />
                <h3 className="text-lg font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            {t("landing.coaching.meetTitlePre")} <span className="text-gradient">{t("landing.coaching.meetTitleAccent")}</span>
          </h3>
          <p className="text-muted-foreground text-sm mb-6">{t("landing.coaching.meetSubtitle")}</p>

          <div className="inline-flex items-center rounded-full glass-card-strong p-1 gap-1">
            {periods.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  period === p.key ? "bg-primary text-primary-foreground shadow-[0_0_16px_-4px_hsl(28,100%,55%/0.4)]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
                {p.key === "monthly" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[9px] font-bold uppercase tracking-wide">
                    {t("landing.coaching.save33")}
                  </span>
                )}
              </button>
            ))}
          </div>
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
              <img src={coach.photo} alt={coach.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex items-center justify-center gap-1 mb-1">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{coach.badge}</span>
              </div>
              <h4 className="text-lg font-bold mb-0.5">{coach.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{coach.specialty}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-primary fill-primary" />
                  {coach.rating}
                </span>
                <span className="text-border">|</span>
                <span>{coach.sessions} {t("landing.coaching.sessionsSuffix")}</span>
              </div>
              <p className="text-sm font-bold text-primary mb-1">
                {coach.pricing[period]}
                <span className="text-[10px] text-muted-foreground font-normal ml-1">/{perLabel(period)}</span>
              </p>
              <span className="text-[11px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("landing.coaching.viewProfile")}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card-strong border-primary/20 text-foreground font-semibold text-sm">
            {t("landing.coaching.comingSoon")}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {t("landing.coaching.startingAtPre")} <span className="text-primary font-semibold">$149/session</span> {t("landing.coaching.startingAtSuffix")}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t("landing.coaching.meanwhilePre")}{" "}
            <a href="#features" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">{t("landing.coaching.meanwhileTry")}</a>{" "}
            {t("landing.coaching.meanwhileOr")}{" "}
            <a href="#download" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">{t("landing.coaching.meanwhileDownload")}</a>{" "}
            {t("landing.coaching.meanwhileSuffix")}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCoach && <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default PersonalCoaching;
