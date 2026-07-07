import { motion } from "framer-motion";
import {
  Sparkles, CalendarRange, TrendingUp, Activity, Flame, Camera,
  Dumbbell, ClipboardList, Wrench, Moon, MessageCircle, Bot,
  Repeat, Compass, Users, UsersRound, Bell, Crown,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [
  Sparkles, CalendarRange, TrendingUp, Activity, Flame, Camera,
  Dumbbell, ClipboardList, Wrench, Moon, MessageCircle, Bot,
  Repeat, Compass, Users, UsersRound, Bell, Crown,
];

const WhatsInside = () => {
  const { t } = useTranslation();
  const features = t("landing.whatsInside.features", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="whats-inside" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.whatsInside.titlePre")}{" "}
            <span className="text-gradient">{t("landing.whatsInside.titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("landing.whatsInside.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                className="glass-card-strong rounded-2xl p-6 hover:border-primary/20 hover:shadow-[0_0_30px_-8px_hsl(28,100%,55%/0.2)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1.5 font-['Space_Grotesk']">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatsInside;
