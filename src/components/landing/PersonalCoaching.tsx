import { motion } from "framer-motion";
import { ShieldCheck, Video, MapPin, Calendar, Sparkles, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import coachingHero1 from "@/assets/coaching-hero-1.jpg";
import coachingHero2 from "@/assets/coaching-hero-2.jpg";

const FEATURE_ICONS = [ShieldCheck, MapPin, Video, Calendar];

const PersonalCoaching = () => {
  const { t } = useTranslation();

  const featureStrings = t("landing.coaching.features", { returnObjects: true }) as Array<{ title: string; description: string }>;

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card-elite rounded-3xl p-8 md:p-12 text-center border border-white/10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles size={14} />
            {t("landing.coaching.comingSoon")}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            {t("landing.coaching.meetTitlePre")} <span className="text-gradient">{t("landing.coaching.meetTitleAccent")}</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("landing.coaching.meetSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/support?topic=elite-coaches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
            >
              <Bell size={16} /> {t("landing.coaching.notifyMe") || "Notify me when it launches"}
            </Link>
            <Link
              to="/for-coaches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card-strong text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
            >
              {t("landing.coaching.coachCta") || "Are you a coach?"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalCoaching;
