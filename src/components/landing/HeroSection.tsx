import { motion } from "framer-motion";
import { Apple, PlayCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import screen1 from "@/assets/app-screen-1.png";
import screen2 from "@/assets/app-screen-2.png";
import screen3 from "@/assets/app-screen-5.png";

const screens = [screen1, screen2, screen3, screen1, screen2, screen3];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
        >
          AI-Powered Identity Transformation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          See Your Future.{" "}
          <span className="text-gradient">Become It.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          VISOR lets you visualize your body transformation, build belief through daily rituals, and receive emotionally adaptive AI coaching to turn consistency into lifestyle change.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
          >
            <Apple size={22} />
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-70">Download on the</div>
              <div className="text-sm leading-tight">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
          >
            <PlayCircle size={22} />
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-70">Get it on</div>
              <div className="text-sm leading-tight">Google Play</div>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Marquee of app screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 w-full overflow-hidden pb-8"
      >
        <div className="flex animate-marquee gap-6 w-max">
          {[...screens, ...screens].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-56 md:w-72 rounded-2xl overflow-hidden border border-border/40 glow-orange"
            >
              <img src={src} alt="VISOR App Screen" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
