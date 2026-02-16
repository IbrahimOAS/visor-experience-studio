import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Core",
    price: "$19.99",
    period: "/month",
    features: ["AI body transformations", "Ritual tracking", "Community leaderboard", "Basic workout plans", "Sandow AI Coach chat"],
    cta: "Get Core",
    highlighted: false,
  },
  {
    name: "Elite",
    price: "$29.99",
    period: "/month",
    features: [
      "Everything in Core",
      "Unlimited AI transformations",
      "Advanced analytics",
      "Personalized diet & workout plans",
      "Soul Track progression",
      "Offline mode",
    ],
    cta: "Go Elite",
    highlighted: true,
  },
  {
    name: "Yearly",
    price: "$99",
    period: "/year",
    features: ["Everything in Elite", "Billed annually", "Priority AI generation", "Early access to new features"],
    cta: "Go Yearly",
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 px-6 bg-secondary/30">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Choose Your <span className="text-gradient">Path</span>
        </h2>
        <p className="text-muted-foreground text-lg">Start free. Go Pro when you're ready.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-6 border ${
              plan.highlighted
                ? "border-primary bg-primary/5 glow-orange"
                : "border-border glass-card"
            }`}
          >
            {plan.highlighted && (
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Most Popular</div>
            )}
            <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className={`block w-full py-3 rounded-xl text-center font-semibold text-sm transition-colors ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
