import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import demoVideo from "@/assets/visor-demo.mp4";

const videoCards: { title: string; description: string; youtubeId?: string }[] = [
  { title: "AI Body Scan", description: "Real-time body composition analysis powered by computer vision" },
  { title: "Transformation Preview", description: "See your future physique rendered in stunning detail" },
  { title: "Coach Interaction", description: "Adaptive AI coaching that responds to your emotional state" },
  { title: "Ritual Tracking", description: "Build unbreakable habits with streak-powered rituals" },
  { title: "Soul Progression", description: "Track your identity evolution from Initiate to Embodied" },
  { title: "Workout Engine", description: "Personalized training plans that adapt to your progress", youtubeId: "o3KFfOra4dU" },
  { title: "Nutrition AI", description: "Smart meal logging with macro tracking and diet plans" },
  { title: "Leaderboard", description: "Compete with your community and climb the XP rankings" },
  { title: "Progress Analytics", description: "Deep insights into your transformation journey over time" },
  { title: "Visor Pro", description: "Unlock unlimited AI generations and advanced features" },
];

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeCard = activeIndex !== null ? videoCards[activeIndex] : null;
  const mainIsYoutube = activeCard?.youtubeId;

  const togglePlay = () => {
    if (mainIsYoutube) return; // YouTube has its own controls
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const selectCard = (i: number) => {
    // Stop current local video if playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setPlaying(false);
    setActiveIndex(i);
    // Scroll to the main player
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="py-28 px-6 relative">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            See <span className="text-gradient">VISOR</span> in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {activeCard
              ? <><span className="text-primary font-semibold">{activeCard.title}</span> — {activeCard.description}</>
              : "Watch how AI-powered body visualization, adaptive coaching, and identity tracking work together."
            }
          </p>
        </motion.div>

        {/* Main video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass-card-strong glow-orange cursor-pointer group mb-16 aspect-video"
          onClick={mainIsYoutube ? undefined : togglePlay}
        >
          {mainIsYoutube ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeCard.youtubeId}?rel=0&autoplay=1`}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={activeCard.title}
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={demoVideo}
                className="w-full h-full object-cover"
                loop
                playsInline
                onEnded={() => setPlaying(false)}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
                style={{ background: "radial-gradient(circle, hsl(0 0% 0% / 0.4) 0%, hsl(0 0% 0% / 0.2) 100%)" }}
              >
                <div className="w-24 h-24 rounded-full glass-card-elite flex items-center justify-center backdrop-blur-xl transition-transform duration-300 group-hover:scale-110">
                  {playing ? (
                    <Pause size={36} className="text-primary" />
                  ) : (
                    <Play size={36} className="text-primary ml-1" />
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Scrollable video cards */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-strong flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card-strong flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videoCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => selectCard(i)}
                className={`flex-shrink-0 w-72 glass-card-strong rounded-2xl overflow-hidden group/card hover:glow-orange transition-all duration-500 cursor-pointer ${
                  activeIndex === i ? "ring-2 ring-primary glow-orange scale-[1.02]" : ""
                }`}
              >
                {/* Video thumbnail */}
                <div className="relative h-40 overflow-hidden bg-background/50">
                  {card.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${card.youtubeId}/hqdefault.jpg`}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-500"
                    />
                  ) : (
                    <video
                      src={demoVideo}
                      className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:scale-105 transform"
                      muted
                      playsInline
                      loop
                      onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = i * 2;
                      }}
                      onLoadedMetadata={(e) => {
                        (e.target as HTMLVideoElement).currentTime = i * 2;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover/card:opacity-0 transition-opacity duration-300">
                    <Play size={28} className="text-primary" />
                  </div>
                </div>
                {/* Card info */}
                <div className="p-5">
                  <h4 className="font-semibold text-foreground mb-1.5">{card.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
