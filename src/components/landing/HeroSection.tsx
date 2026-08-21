import { motion } from "framer-motion";
import { Apple, ArrowDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APP_STORE_URL, handleAppStoreClick } from "@/lib/app-store";
import heroBg from "@/assets/hero-bg.jpg";
import heroFigure from "@/assets/hero-figure.png";
import screen1 from "@/assets/app-screen-1.png";
import screen2 from "@/assets/app-screen-2.png";
import screen3 from "@/assets/app-screen-5.png";

const screens = [screen1, screen2, screen3, screen1, screen2, screen3];

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute -inset-8 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="AI-powered body transformation visualization background"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      {/* Extracted athlete figure */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex justify-center pointer-events-none">
        <img
          src={heroFigure}
          alt="Muscular athlete silhouette representing your future self"
          loading="lazy"
          decoding="async"
          className="h-[70vh] w-auto object-contain object-bottom drop-shadow-[0_0_60px_hsl(28,100%,55%,0.25)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
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
            Join now — web
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-muted-foreground font-medium hover:text-foreground transition-colors duration-300 group"
          >
            {t("hero.secondaryCta")} <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
