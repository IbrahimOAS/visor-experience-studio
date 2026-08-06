import { motion } from "framer-motion";
import { ArrowRight, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";

const JoinBanner = () => (
  <section className="py-20 px-6 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px]" />
    </div>

    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card-elite rounded-3xl p-10 md:p-14 text-center border border-primary/20"
      >
        {/* Pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
          <Users size={15} />
          Join thousands already transforming
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Start free.{" "}
          <span className="text-gradient">Refer and earn.</span>
        </h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-3">
          Create your account, subscribe, then share your referral link.
          Every friend who subscribes earns you{" "}
          <span className="text-primary font-semibold">15% recurring commission</span> — automatically.
        </p>

        {/* Referral hint */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
          <Gift size={14} className="text-primary" />
          No cap · No expiry · Paid every billing cycle
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_36px_-4px_hsl(28,100%,55%/0.55)] group"
          >
            Join now — it's free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View plans →
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default JoinBanner;
