import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    subtitle: "The Awakening",
    price: "$0",
    period: "forever",
    features: [
      "Month 1 Prediction (limited)",
      "Basic Static Coach",
      "Limited Ritual Access",
      "Hidden Soul Track Score",
      "Limited Daily Prompts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Core",
    subtitle: "The Builder",
    price: "$19.99",
    period: "/month",
    yearlyPrice: "$79.99/yr",
    features: [
      "Everything in Free +",
      "Month 1 + Month 3 Predictions",
      "Dynamic Coach Evolution",
      "Visible Soul Track Score",
      "Streak Recovery Rituals",
      "Prediction Comparison Engine",
      "Priority Render Queue",
    ],
    cta: "Go Core",
    highlighted: false,
  },
  {
    name: "Elite",
    subtitle: "The Olympia Path",
    price: "$29.99",
    period: "/month",
    yearlyPrice: "$99/yr",
    features: [
      "Everything in Core +",
      "Olympia Mode Prediction",
      "AI Nutrition Generator",
      "Goal-Based Workout Generator",
      "Full Coach Personality & Tone Shift",
      "Unlimited Predictions",
      "Faster AI Rendering",
      "Elite Ritual Library",
      "Early Access Features",
    ],
    cta: "Go Elite",
    highlighted: true,
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
        <p className="text-muted-foreground text-lg">Start free. Evolve when you're ready.</p>
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
            <h3 className="text-2xl font-bold mb-0.5">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 italic">{plan.subtitle}</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            {plan.yearlyPrice && (
              <p className="text-xs text-primary mb-5">
                or {plan.yearlyPrice}
                {plan.highlighted && (
                  <span className="ml-2 inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    7-day free trial
                  </span>
                )}
              </p>
            )}
            {!plan.yearlyPrice && <div className="mb-5" />}
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
