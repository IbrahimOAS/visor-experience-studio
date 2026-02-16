import { motion } from "framer-motion";
import { Camera, Sparkles, Flame, TrendingUp } from "lucide-react";

const steps = [
  { icon: Camera, title: "Upload Your Photo", desc: "Take a body photo and set your transformation goals." },
  { icon: Sparkles, title: "See Your Future", desc: "AI generates realistic previews of your body at Month 1, 3, and beyond." },
  { icon: Flame, title: "Build Daily Rituals", desc: "Your AI coach guides you through personalized habits and workouts." },
  { icon: TrendingUp, title: "Transform Your Identity", desc: "Track your Soul progression as fitness becomes who you are." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-secondary/30">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          How <span className="text-gradient">VISOR</span> Works
        </h2>
        <p className="text-muted-foreground text-lg">Four steps to becoming who you want to be.</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
              <step.icon className="text-primary" size={28} />
            </div>
            <div className="text-sm font-bold text-primary mb-2">Step {i + 1}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
