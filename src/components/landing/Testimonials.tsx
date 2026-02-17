import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus J.",
    role: "Lost 15kg in 4 months",
    text: "Seeing my future body on Day 1 changed everything. I didn't just want it — I believed it. VISOR made me feel like the transformation had already begun.",
    rating: 5,
  },
  {
    name: "Aisha K.",
    role: "Fitness Coach",
    text: "The Visor AI coach is unlike anything I've seen. It adapts to my clients' moods and keeps them accountable. The Soul Track is pure genius for retention.",
    rating: 5,
  },
  {
    name: "Daniel R.",
    role: "Embodied in 6 months",
    text: "The ritual system turned my chaotic habits into an identity. I'm not 'trying to get fit' anymore — I am fit. VISOR made that shift happen.",
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Real <span className="text-gradient">Transformations</span>
        </h2>
        <p className="text-muted-foreground text-lg">People don't quit because they lack workouts — they quit because they can't see their future.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">"{t.text}"</p>
            <div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
