import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  // Get the 3 visible indices: left, center, right
  const leftIndex = (activeIndex - 1 + total) % total;
  const centerIndex = activeIndex;
  const rightIndex = (activeIndex + 1) % total;

  const panelData = [
    { index: leftIndex, position: "left" as const },
    { index: centerIndex, position: "center" as const },
    { index: rightIndex, position: "right" as const },
  ];

  // 3D transform configs for the concave room effect
  const panelStyles = {
    left: {
      transform: "translateX(-85%) rotateY(40deg) translateZ(-40px)",
      zIndex: 10,
      filter: "brightness(0.7)",
    },
    center: {
      transform: "translateX(0%) rotateY(0deg) translateZ(40px)",
      zIndex: 20,
      filter: "brightness(1)",
    },
    right: {
      transform: "translateX(85%) rotateY(-40deg) translateZ(-40px)",
      zIndex: 10,
      filter: "brightness(0.7)",
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
            AI Workout & Training Programs in{" "}
            <span className="text-gradient">VISOR</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium gym workouts and training videos designed for total body transformation — from HIIT to hypertrophy.
          </p>
        </motion.div>

        {/* 3D Curved Room Carousel */}
        <div
          className="relative h-[420px] md:h-[540px] flex items-center justify-center mx-auto"
          style={{ perspective: "1000px", perspectiveOrigin: "50% 45%" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Curved floor/base */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[700px] h-6 rounded-[50%]"
            style={{
              background: "linear-gradient(to top, hsl(0 0% 15%), hsl(0 0% 10%))",
              boxShadow: "0 4px 30px -5px hsl(0 0% 0% / 0.5)",
              transform: "translateX(-50%) rotateX(60deg) translateZ(-20px)",
            }}
          />

          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {panelData.map(({ index, position }) => (
              <div
                key={`${index}-${position}`}
                className="absolute flex items-center"
                style={{
                  ...panelStyles[position],
                  transition: "all 0.8s cubic-bezier(0.32, 0.72, 0, 1)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Orange divider - left side */}
                {position === "center" && (
                  <div
                    className="absolute -left-4 md:-left-5 top-0 bottom-0 w-4 md:w-5"
                    style={{
                      background: "linear-gradient(135deg, hsl(28, 100%, 55%), hsl(28, 100%, 45%))",
                      transformOrigin: "right center",
                      transform: "rotateY(-50deg)",
                      borderRadius: "2px 0 0 2px",
                      boxShadow: "inset 2px 0 8px hsl(28, 100%, 65% / 0.3)",
                    }}
                  />
                )}

                {/* Image panel */}
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  style={{
                    boxShadow:
                      position === "center"
                        ? "0 0 60px -10px hsl(28, 100%, 55% / 0.3), 0 20px 40px -15px hsl(0 0% 0% / 0.5)"
                        : "0 10px 30px -10px hsl(0 0% 0% / 0.4)",
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Concrete/gray wall background behind image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: position === "center"
                        ? "hsl(28, 100%, 55%)"
                        : "hsl(0, 0%, 25%)",
                      padding: position === "center" ? "8px" : "6px",
                    }}
                  />
                  <img
                    src={exercises[index].src}
                    alt={exercises[index].label}
                    className="relative w-48 md:w-64 h-72 md:h-[400px] object-cover rounded-md"
                    draggable={false}
                    style={{
                      filter: panelStyles[position].filter,
                    }}
                  />
                  
                  {/* Bottom label for center */}
                  {position === "center" && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                      <span className="text-foreground font-bold text-sm md:text-base tracking-wide">
                        {exercises[index].label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Orange divider - right side */}
                {position === "center" && (
                  <div
                    className="absolute -right-4 md:-right-5 top-0 bottom-0 w-4 md:w-5"
                    style={{
                      background: "linear-gradient(225deg, hsl(28, 100%, 55%), hsl(28, 100%, 45%))",
                      transformOrigin: "left center",
                      transform: "rotateY(50deg)",
                      borderRadius: "0 2px 2px 0",
                      boxShadow: "inset -2px 0 8px hsl(28, 100%, 65% / 0.3)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full glass-card-strong flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            aria-label="Previous exercise"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex gap-2">
            {exercises.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full glass-card-strong flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            aria-label="Next exercise"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExerciseCarousel;
