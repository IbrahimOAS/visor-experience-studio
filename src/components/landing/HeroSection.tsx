import React from "react";
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Scoped Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .hero-delay-100 { animation-delay: 0.1s; }
        .hero-delay-200 { animation-delay: 0.2s; }
        .hero-delay-300 { animation-delay: 0.3s; }
        .hero-delay-400 { animation-delay: 0.4s; }
        .hero-delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="hero-fade-in hero-delay-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-strong text-primary text-sm font-medium shimmer">
                <Star size={14} className="text-primary" />
                AI-Powered Identity Transformation
              </div>
            </div>

            {/* Heading */}
            <h1 className="hero-fade-in hero-delay-200 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              See Your Future.{" "}
              <span className="text-gradient">Become</span>{" "}
              It.
            </h1>

            {/* Description */}
            <p className="hero-fade-in hero-delay-300 text-lg text-muted-foreground max-w-lg">
              VISOR lets you visualize your body transformation, build belief through daily rituals, and receive emotionally adaptive AI coaching to turn consistency into lifestyle change.
            </p>

            {/* CTA Buttons */}
            <div className="hero-fade-in hero-delay-400 flex flex-wrap items-center gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(28,100%,55%/0.4)] group"
              >
                Explore Features
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="#video"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-card-strong text-foreground font-medium hover:bg-primary/10 transition-all duration-300 group"
              >
                <Play size={16} className="text-primary" />
                Watch Showreel
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hero-fade-in hero-delay-300 flex flex-col gap-5">

            {/* Stats Card */}
            <div className="relative rounded-3xl glass-card-strong p-6 overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl glass-card-elite flex items-center justify-center">
                    <Target size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">150+</p>
                    <p className="text-sm text-muted-foreground">Transformations Delivered</p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">User Satisfaction</span>
                    <span className="text-primary font-semibold">98%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(40,100%,65%)]" style={{ width: "98%" }} />
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <StatItem value="4.9★" label="App Rating" />
                  <StatItem value="30+" label="AI Models" />
                  <StatItem value="24/7" label="Coaching" />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary">
                    <Crown size={12} />
                    PREMIUM
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="rounded-2xl glass-card p-4 overflow-hidden">
              <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wider uppercase">
                Trusted by Industry Leaders
              </p>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee gap-8 w-max">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => {
                    const Icon = client.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <Icon size={20} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">{client.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
