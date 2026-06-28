import { motion } from "framer-motion";
import {
  Sparkles, CalendarRange, TrendingUp, Activity, Flame, Camera,
  Dumbbell, ClipboardList, Wrench, Moon, MessageCircle, Bot,
  Repeat, Compass, Users, UsersRound, Bell, Crown,
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Body Transformation", desc: "See your Month 1, 3, 6 and Olympia future-self predictions." },
  { icon: CalendarRange, title: "AI 12-Week Plan", desc: "An adaptive program that evolves with your progress." },
  { icon: TrendingUp, title: "Level Progression", desc: "Beginner → Intermediate → Advanced, unlocked by behavior." },
  { icon: Activity, title: "Activity Tracker", desc: "Log sessions, routes, and effort with smart insights." },
  { icon: Flame, title: "Calorie Tracker", desc: "Macro & calorie logging with goal-aware feedback." },
  { icon: Camera, title: "AI Food Scanner", desc: "Camera auto-logs meals — no manual entry." },
  { icon: Dumbbell, title: "Exercise Library", desc: "Hundreds of moves with embedded YouTube demos." },
  { icon: ClipboardList, title: "Workout Programs", desc: "Structured programs with Personal Records tracking." },
  { icon: Wrench, title: "Custom Workout Builder", desc: "Design your own sessions, sets and progressions." },
  { icon: Moon, title: "Sleep & Health Charts", desc: "Recovery, sleep and trend visualisations." },
  { icon: MessageCircle, title: "VISOR AI Chat", desc: "Always-on coach for form, food and motivation." },
  { icon: Bot, title: "Dynamic AI Coach", desc: "Personality and tone shifts with your mood and goals." },
  { icon: Repeat, title: "Rituals & Streak Recovery", desc: "Daily rituals with forgiveness when life happens." },
  { icon: Compass, title: "Soul Track", desc: "Identity-aligned gamification — vote for who you become." },
  { icon: Users, title: "Community Feed", desc: "Discover, follow and learn from real transformations." },
  { icon: UsersRound, title: "Groups & Direct Messages", desc: "Train with friends, coaches and private circles." },
  { icon: Bell, title: "Smart Push Alerts", desc: "Context-aware nudges — never spammy." },
  { icon: Crown, title: "Olympia Mode", desc: "Top-tier AI rendering, priority queue & elite rituals." },
];

const WhatsInside = () => (
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
          What's inside <span className="text-gradient">VISOR</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          18 features. One identity transformation engine.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            className="glass-card-strong rounded-2xl p-6 hover:border-primary/20 hover:shadow-[0_0_30px_-8px_hsl(28,100%,55%/0.2)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <f.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-1.5 font-['Space_Grotesk']">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatsInside;
