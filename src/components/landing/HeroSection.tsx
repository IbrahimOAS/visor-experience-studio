import { motion } from "framer-motion";
import { Apple, ArrowDown, Globe, Star, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APP_STORE_URL, handleAppStoreClick } from "@/lib/app-store";
import heroBg from "@/assets/hero-bg.jpg";

const heroVideo = { url: "/media/visor-hero-loop.mp4" };
const heroPoster = { url: "/media/visor-hero-poster.jpg" };

const HeroSection = () => {
  const { t } = useTranslation();

  const trust = [
    { icon: Sparkles, label: t("hero.trust.live", "Live on the App Store") },
    { icon: ShieldCheck, label: t("hero.trust.cancel", "Cancel anytime") },
    { icon: Star, label: t("hero.trust.trial", "7-day free trial on Elite") },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Cinematic background video (image fallback beneath) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AI-powered body transformation visualization background"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70 animate-hero-kenburns will-change-transform"
        />
        <video
          className="relative w-full h-full object-cover opacity-70"
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block mb-6 px-5 py-2 rounded-full glass-card-strong text-primary text-sm font-medium shimmer"
        >
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          {t("hero.titleA")}{" "}
          <span className="text-gradient">{t("hero.titleB")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAppStoreClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(28,100%,55%/0.5)] group"
          >
            <Apple size={20} />
            {t("hero.cta")}
          </a>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-card-strong text-primary font-semibold hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(28,100%,55%/0.3)] group"
          >
            <Globe size={18} />
            {t("hero.ctaWeb", "Start free on the web")}
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 group"
          >
            {t("hero.secondaryCta")} <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon size={15} className="text-primary" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default HeroSection;
