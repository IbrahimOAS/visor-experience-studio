import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, UserPlus } from "lucide-react";

const EliteCoachesTeaser = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-primary/5 rounded-full blur-[140px]" />
    </div>
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card-elite rounded-3xl p-8 md:p-12 text-center"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 mb-5">
          <ShieldCheck size={12} /> New · Elite Tier
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
          Meet <span className="text-gradient">VISOR Elite Coaches</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Verified personal trainers for home, gym or online sessions — booked entirely inside the VISOR app for Elite members.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/elite-coaches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.5)]"
          >
            Explore Elite Coaches <ArrowRight size={16} />
          </Link>
          <Link
            to="/for-coaches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card-strong text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
          >
            <UserPlus size={16} /> Are you a coach?
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default EliteCoachesTeaser;
