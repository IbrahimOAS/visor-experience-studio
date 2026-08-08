import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useTranslation } from "react-i18next";
import { Apple } from "lucide-react";
import { APP_STORE_URL, handleAppStoreClick } from "@/lib/app-store";
import stairs from "@/assets/visor-stairs.mp4.asset.json";
import doorway from "@/assets/visor-doorway.mp4.asset.json";
import mirror from "@/assets/visor-mirror.mp4.asset.json";
import energy from "@/assets/visor-energy.mp4.asset.json";

type Beat = {
  src: string;
  step: string;
  title: string;
  body: string;
};

const LazyVideo = ({ src, label }: { src: string; label: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) void el.play().catch(() => undefined);
    else el.pause();
  }, [inView]);


  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="w-full h-full object-cover"
    />
  );
};

const CinematicStory = () => {
  const { t } = useTranslation();

  const beats: Beat[] = [
    {
      src: stairs.url,
      step: t("landing.story.beats.0.step", "01 — The climb"),
      title: t("landing.story.beats.0.title", "Most plans fail because they ignore you"),
      body: t(
        "landing.story.beats.0.body",
        "Generic programs don't know your sleep, stress or schedule. VISOR reads your day and adapts the plan before you quit on it."
      ),
    },
    {
      src: doorway.url,
      step: t("landing.story.beats.1.step", "02 — The threshold"),
      title: t("landing.story.beats.1.title", "See the version of you that's possible"),
      body: t(
        "landing.story.beats.1.body",
        "Three honest baseline photos. AI projects your Month 1, Month 3 and peak physique — so the goal stops being abstract."
      ),
    },
    {
      src: mirror.url,
      step: t("landing.story.beats.2.step", "03 — The mirror"),
      title: t("landing.story.beats.2.title", "A coach that answers at 6am and 11pm"),
      body: t(
        "landing.story.beats.2.body",
        "Training, nutrition and recovery in one thread. Your AI coach adjusts tone and intensity to how you actually feel."
      ),
    },
  ];

  return (
    <section id="story" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[170px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 mb-6">
            {t("landing.story.badge", "The transformation")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.story.titlePre", "From where you are to")}{" "}
            <span className="text-gradient">{t("landing.story.titleAccent", "who you become")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("landing.story.subtitle", "Three moments that decide whether a transformation sticks — engineered into the app.")}
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-14">
          {beats.map((beat, i) => (
            <motion.div
              key={beat.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative rounded-3xl overflow-hidden aspect-video glass-card-strong [direction:ltr]">
                <LazyVideo src={beat.src} label={beat.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="[direction:ltr]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{beat.step}</p>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{beat.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{beat.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-16 rounded-3xl overflow-hidden glass-card-elite"
        >
          <div className="absolute inset-0">
            <LazyVideo src={energy.url} label={t("landing.story.ctaTitle", "Your transformation starts today")} />
            <div className="absolute inset-0 bg-background/70" />
          </div>
          <div className="relative z-10 px-6 py-14 md:py-20 text-center">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              {t("landing.story.ctaTitle", "Your transformation starts today")}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {t("landing.story.ctaSubtitle", "Download VISOR, take three photos, and meet your future self in under five minutes.")}
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAppStoreClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(28,100%,55%/0.5)]"
            >
              <Apple size={20} />
              {t("hero.cta")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicStory;
