import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";

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
    name: "Pro",
    subtitle: "The Performer",
    price: "$24.99",
    period: "/month",
    features: [
      "Everything in Core +",
      "AI Workout Optimization",
      "Advanced Progress Insights",
      "Smart Recovery System",
      "Custom Coach Styles",
      "Faster AI Processing",
      "Goal-Based Training",
    ],
    cta: "Go Pro",
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
  <section id="pricing" className="py-28 px-6 relative overflow-hidden">
    {/* Ambient */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[140px]" />
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Fitness App Plans & <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-muted-foreground text-lg">Start free. Evolve when you're ready to transform.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-7 transition-all duration-500 flex flex-col ${
              plan.highlighted
                ? "glass-card-elite shimmer hover:shadow-[0_0_80px_-10px_hsl(28,100%,55%/0.4)] scale-[1.02]"
                : "glass-card-strong hover:shadow-[0_0_40px_-8px_hsl(28,100%,55%/0.15)] hover:border-primary/15"
            }`}
          >
            {plan.highlighted && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                <Crown size={14} />
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-0.5">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-4 italic">{plan.subtitle}</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            {plan.yearlyPrice && (
              <p className="text-xs text-primary mb-6">
                or {plan.yearlyPrice}
                {plan.highlighted && (
                  <span className="ml-2 inline-block bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    7-day free trial
                  </span>
                )}
              </p>
            )}
            {!plan.yearlyPrice && <div className="mb-6" />}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className={`block w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
                  : "glass-card-strong text-foreground hover:text-primary hover:border-primary/20"
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
