import { motion } from "framer-motion";
import { Camera, Sparkles, Flame, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [Camera, Sparkles, Flame, TrendingUp];

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = t("landing.howItWorks.steps", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="how-it-works" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.howItWorks.titlePre")}{" "}
            <span className="text-gradient">{t("landing.howItWorks.titleAccent")}</span>{" "}
            {t("landing.howItWorks.titlePost")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("landing.howItWorks.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="glass-card-strong rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(28,100%,55%/0.2)] hover:border-primary/20 shimmer">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <div className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">
                    {t("landing.howItWorks.step")} {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
