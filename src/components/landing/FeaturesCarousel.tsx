import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Brain, Flame, Heart, Utensils, Trophy, CreditCard } from "lucide-react";
import screen1 from "@/assets/app-screen-1.png";
import screen2 from "@/assets/app-screen-2.png";
import screen3 from "@/assets/app-screen-3.png";
import screen4 from "@/assets/app-screen-4.png";
import screen5 from "@/assets/app-screen-5.png";
import screen6 from "@/assets/app-screen-6.png";

const features = [
  {
    icon: Eye,
    label: "AI Body Transformation",
    title: "See Your Future Body",
    description: "Upload your photo and watch AI generate realistic transformation previews — Month 1, Month 3, and beyond. See the destination before you start the journey.",
    image: screen1,
  },
  {
    icon: Brain,
    label: "Sandow AI Coach",
    title: "A Coach That Knows You",
    description: "Choose your coach personality — Commander, Visionary, Guardian, or Strategist. The AI adapts tone based on your streaks, mood, and progress.",
    image: screen2,
  },
  {
    icon: Heart,
    label: "Soul Track",
    title: "Belief Alignment System",
    description: "Move through identity states: Unawakened → Initiate → Aligned → Disciplined → Embodied. VISOR turns fitness into identity.",
    image: screen3,
  },
  {
    icon: Flame,
    label: "Ritual System",
    title: "Build Unbreakable Habits",
    description: "Commit to daily rituals with streak tracking, expiry timers, XP rewards, and coach-driven starter packs. Your habits fuel your soul progression.",
    image: screen4,
  },
  {
    icon: Utensils,
    label: "Nutrition & Plans",
    title: "Fuel Your Transformation",
    description: "Meal logging, daily macro summaries, AI-generated diet plans, and personalized workout recommendations — all integrated into one system.",
    image: screen5,
  },
  {
    icon: Trophy,
    label: "Gamification & XP",
    title: "Level Up Your Life",
    description: "Earn XP, unlock archetypes (Initiate → Warrior → Champion), climb the leaderboard, and compete with your community.",
    image: screen6,
  },
  {
    icon: CreditCard,
    label: "Visor Pro",
    title: "Unlock Everything",
    description: "Go Pro for €9.99/month — unlock advanced analytics, more AI transformations, personalized plans, coach chat, and offline mode.",
    image: screen1,
  },
];

const FeaturesCarousel = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? features.length - 1 : p - 1));
  const next = () => setActive((p) => (p === features.length - 1 ? 0 : p + 1));

  const f = features[active];
  const Icon = f.icon;

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Transform</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seven powerful systems working together to reshape your body, mind, and identity.
          </p>
        </motion.div>

        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {feat.label}
            </button>
          ))}
        </div>

        {/* Active feature display - ByteDance Seed style */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                  <Icon size={16} />
                  {f.label}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{f.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{f.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Image card - 3D tilt style */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto max-w-sm"
              >
                <div className="rounded-3xl overflow-hidden border border-border/50 glow-orange">
                  <img src={f.image} alt={f.title} className="w-full h-auto" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
