import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import exercise1 from "@/assets/exercise-1.jpg";
import exercise2 from "@/assets/exercise-2.jpg";
import exercise3 from "@/assets/exercise-3.jpg";
import exercise4 from "@/assets/exercise-4.jpg";
import exercise5 from "@/assets/exercise-5.jpg";
import exercise6 from "@/assets/exercise-6.jpg";

const exercises = [
  { src: exercise1, label: "Seated Focus" },
  { src: exercise2, label: "Leg Press" },
  { src: exercise3, label: "Hack Squat" },
  { src: exercise4, label: "Air Bike" },
  { src: exercise5, label: "Lat Pulldown" },
  { src: exercise6, label: "Overhead Press" },
];

const ExerciseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const total = exercises.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const getPosition = (index: number) => {
    const diff = ((index - activeIndex + total) % total);
    if (diff === 0) return "center";
    if (diff === 1 || diff === -total + 1) return "right";
    if (diff === total - 1 || diff === -1) return "left";
    return "hidden";
  };

  const variants: Record<string, any> = {
    center: {
      x: 0,
      z: 50,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
    },
    left: {
      x: "-55%",
      z: 0,
      scale: 0.75,
      rotateY: 35,
      opacity: 0.8,
      zIndex: 20,
    },
    right: {
      x: "55%",
      z: 0,
      scale: 0.75,
      rotateY: -35,
      opacity: 0.8,
      zIndex: 20,
    },
    hidden: {
      x: 0,
      z: -100,
      scale: 0.5,
      rotateY: 0,
      opacity: 0,
      zIndex: 10,
    },
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Train Like a <span className="text-gradient">Machine</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium workout programs designed for total body transformation.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div
          className="relative h-[500px] md:h-[600px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="popLayout">
            {exercises.map((exercise, index) => {
              const position = getPosition(index);
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  initial={variants.hidden}
                  animate={variants[position]}
                  exit={variants.hidden}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Card with orange side panels like reference */}
                  <div className="relative">
                    {/* Orange side accent - left */}
                    {position === "center" && (
                      <>
                        <div
                          className="absolute -left-3 top-0 bottom-0 w-3 rounded-l-lg"
                          style={{
                            background: "hsl(28, 100%, 55%)",
                            transformOrigin: "right center",
                            transform: "rotateY(-30deg)",
                          }}
                        />
                        <div
                          className="absolute -right-3 top-0 bottom-0 w-3 rounded-r-lg"
                          style={{
                            background: "hsl(28, 100%, 55%)",
                            transformOrigin: "left center",
                            transform: "rotateY(30deg)",
                          }}
                        />
                      </>
                    )}

                    {/* Image */}
                    <div
                      className={`overflow-hidden rounded-2xl ${
                        position === "center" ? "glow-orange" : ""
                      }`}
                    >
                      <img
                        src={exercise.src}
                        alt={exercise.label}
                        className="w-56 md:w-72 h-80 md:h-[420px] object-cover"
                        draggable={false}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl" />
                      
                      {/* Label */}
                      {position === "center" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="absolute bottom-4 left-0 right-0 text-center"
                        >
                          <span className="text-foreground font-bold text-lg tracking-wide">
                            {exercise.label}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass-card-strong flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            aria-label="Previous exercise"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {exercises.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass-card-strong flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            aria-label="Next exercise"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExerciseCarousel;
