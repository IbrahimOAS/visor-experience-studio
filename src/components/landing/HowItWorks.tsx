import { motion } from "framer-motion";
import { Camera, Sparkles, Flame, TrendingUp } from "lucide-react";

const steps = [
  { icon: Camera, title: "Upload Your Photo", desc: "Take a body photo and set your transformation goals." },
  { icon: Sparkles, title: "See Your Future", desc: "AI generates realistic previews of your body at Month 1, 3, and beyond." },
  { icon: Flame, title: "Build Daily Rituals", desc: "Your AI coach guides you through personalized habits and workouts." },
  { icon: TrendingUp, title: "Transform Your Identity", desc: "Track your Soul progression as fitness becomes who you are." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-28 px-6 relative overflow-hidden">
    {/* Ambient background */}
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
          How <span className="text-gradient">VISOR</span> Works
        </h2>
        <p className="text-muted-foreground text-lg">Four steps to becoming who you want to be.</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
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
                <step.icon className="text-primary" size={28} />
              </div>
              <div className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">Step {i + 1}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
