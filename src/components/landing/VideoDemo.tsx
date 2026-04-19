import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import demoVideo from "@/assets/visor-demo.mp4";
import showcaseVideo from "@/assets/visor-showcase.mp4";
import featureWorkout from "@/assets/feature-workout.png";
import featureCoach from "@/assets/feature-coach.png";
import featureActivity from "@/assets/feature-activity.png";
import featureAiCoach from "@/assets/feature-ai-coach.png";
import featureNutrition from "@/assets/feature-nutrition.png";
import featureMuscleAreas from "@/assets/feature-muscle-areas.png";
import featureWorkoutDetail from "@/assets/feature-workout-detail.png";
import featureWorkoutComplete from "@/assets/feature-workout-complete.png";
import featureCoachProfile from "@/assets/feature-coach-profile.png";
import featureCoachList from "@/assets/feature-coach-list.png";
import featureActivityRoute from "@/assets/feature-activity-route.png";
import featureActivityGoal from "@/assets/feature-activity-goal.png";

const videoCards: { title: string; description: string; youtubeId?: string; localVideo?: string; images?: string[] }[] = [
  
  {
    title: "Personalized Workouts",
    description: "Browse by muscle group, follow coach-led sessions and review your post-workout summary",
    images: [featureWorkout, featureWorkoutDetail, featureWorkoutComplete],
  },
  {
    title: "Find Your Ideal Coach",
    description: "Match with verified fitness coaches, browse profiles and book HIIT experts near you",
    images: [featureCoach, featureCoachProfile, featureCoachList],
  },
  { title: "Activity & Smart Insights", description: "Track every session and unlock data-driven insights into your progress", images: [featureActivity] },
  { title: "Meet Your AI Coach", description: "Fitness 3.0 — adaptive AI that nudges form, reps, and recovery in real time", images: [featureAiCoach] },
  { title: "Nutrition & Meal Plans", description: "Personalized meal plans and macro tracking to fuel your transformation", images: [featureNutrition] },
];

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const activeCard = activeIndex !== null ? videoCards[activeIndex] : null;
  const mainIsYoutube = activeCard?.youtubeId && !activeCard?.localVideo;
  const mainIsLocal = !!activeCard?.localVideo;
  const mainIsImage = !!activeCard?.images?.length && !activeCard?.localVideo && !activeCard?.youtubeId;
  const slides = activeCard?.images ?? [];

  const togglePlay = () => {
    if (mainIsYoutube) return;
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
    setSlideIndex(0);
    // Scroll to the main player
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextSlide = () => setSlideIndex((s) => (s + 1) % slides.length);
  const prevSlide = () => setSlideIndex((s) => (s - 1 + slides.length) % slides.length);

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
          className={`relative rounded-3xl overflow-hidden glass-card-strong glow-orange group mb-16 aspect-video ${mainIsYoutube || mainIsImage ? '' : 'cursor-pointer'}`}
          onClick={mainIsYoutube || mainIsLocal || mainIsImage ? undefined : togglePlay}
        >
          {mainIsYoutube ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeCard!.youtubeId}?rel=0&autoplay=1`}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={activeCard!.title}
            />
          ) : mainIsLocal ? (
            <video
              ref={videoRef}
              src={activeCard!.localVideo}
              className="w-full h-full object-cover"
              controls
              loop
              playsInline
            />
          ) : mainIsImage ? (
            <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6 px-4 md:px-8 py-6 bg-gradient-to-br from-background via-background to-primary/5">
              {slides.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${activeCard!.title} — screen ${idx + 1}`}
                  className="h-full w-auto max-h-full object-contain drop-shadow-[0_20px_60px_hsl(28_100%_55%/0.25)] animate-in fade-in duration-500"
                  style={{ animationDelay: `${idx * 80}ms` }}
                />
              ))}
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={demoVideo}
                className="w-full h-full object-cover"
                controls
                loop
                playsInline
                onEnded={() => setPlaying(false)}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
                  playing ? "opacity-0" : "opacity-100"
                }`}
                style={{ background: "radial-gradient(circle, hsl(0 0% 0% / 0.4) 0%, hsl(0 0% 0% / 0.2) 100%)" }}
              >
                <div className="w-24 h-24 rounded-full glass-card-elite flex items-center justify-center backdrop-blur-xl">
                  <Play size={36} className="text-primary ml-1" />
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
                  {card.images && card.images.length > 0 ? (
                    <>
                      <img
                        src={card.images[0]}
                        alt={card.title}
                        className="w-full h-full object-cover object-top opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                      />
                      {card.images.length > 1 && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-[10px] font-semibold text-primary">
                          {card.images.length} screens
                        </div>
                      )}
                    </>
                  ) : card.youtubeId && !card.localVideo ? (
                    <img
                      src={`https://img.youtube.com/vi/${card.youtubeId}/hqdefault.jpg`}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-500"
                    />
                  ) : (
                    <video
                      src={card.localVideo || demoVideo}
                      className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:scale-105 transform"
                      muted
                      playsInline
                      loop
                      onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
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
