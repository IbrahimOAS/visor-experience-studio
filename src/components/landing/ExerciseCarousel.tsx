import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

/** A single booth panel — center gets orange walls, sides get concrete */
const BoothPanel = ({
  exercise,
  position,
  onClick,
}: {
  exercise: (typeof exercises)[0];
  position: "left" | "center" | "right";
  onClick: () => void;
}) => {
  const isCenter = position === "center";
  const wallColor = isCenter
    ? "hsl(28, 100%, 55%)"
    : "hsl(0, 0%, 72%)";
  const wallColorDark = isCenter
    ? "hsl(28, 100%, 42%)"
    : "hsl(0, 0%, 58%)";

  return (
    <div
      className="relative cursor-pointer select-none"
      onClick={onClick}
      style={{ width: isCenter ? 280 : 240, height: isCenter ? 380 : 340 }}
    >
      {/* Back wall */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background: `linear-gradient(180deg, ${wallColor} 0%, ${wallColorDark} 100%)`,
          boxShadow: isCenter
            ? "inset 0 0 40px hsl(28, 100%, 65% / 0.2)"
            : "inset 0 0 20px hsl(0, 0%, 50% / 0.15)",
        }}
      />

      {/* Left side wall (3D angled) */}
      <div
        className="absolute top-0 bottom-0 -left-[28px] w-[30px]"
        style={{
          background: `linear-gradient(90deg, ${wallColorDark}, ${wallColor})`,
          transform: "perspective(400px) rotateY(45deg)",
          transformOrigin: "right center",
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Right side wall (3D angled) */}
      <div
        className="absolute top-0 bottom-0 -right-[28px] w-[30px]"
        style={{
          background: `linear-gradient(270deg, ${wallColorDark}, ${wallColor})`,
          transform: "perspective(400px) rotateY(-45deg)",
          transformOrigin: "left center",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Image */}
      <div className="absolute inset-[10px] overflow-hidden rounded-sm">
        <img
          src={exercise.src}
          alt={exercise.label}
          className="w-full h-full object-cover"
          draggable={false}
          style={{
            filter: isCenter ? "brightness(1)" : "brightness(0.75) saturate(0.8)",
          }}
        />
      </div>
    </div>
  );
};

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

  const leftIndex = (activeIndex - 1 + total) % total;
  const centerIndex = activeIndex;
  const rightIndex = (activeIndex + 1) % total;

  const positions = [
    {
      index: leftIndex,
      position: "left" as const,
      style: {
        transform: "translateX(-110%) rotateY(32deg) scale(0.85)",
        zIndex: 10,
      },
    },
    {
      index: centerIndex,
      position: "center" as const,
      style: {
        transform: "translateX(0%) rotateY(0deg) scale(1)",
        zIndex: 20,
      },
    },
    {
      index: rightIndex,
      position: "right" as const,
      style: {
        transform: "translateX(110%) rotateY(-32deg) scale(0.85)",
        zIndex: 10,
      },
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
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

        {/* 3D Curved Room Carousel */}
        <div
          className="relative mx-auto"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 40%",
            height: 480,
            maxWidth: 900,
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Curved floor platform */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{
              width: "110%",
              height: 50,
              background: "linear-gradient(to top, hsl(0 0% 18%), hsl(0 0% 25%))",
              borderRadius: "50% / 100% 100% 0 0",
              transform: "translateX(-50%) rotateX(12deg)",
              boxShadow:
                "0 8px 30px -5px hsl(0 0% 0% / 0.5), inset 0 2px 0 0 hsl(0 0% 35% / 0.3)",
            }}
          />

          {/* Panels container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {positions.map(({ index, position, style }) => (
              <div
                key={`${position}-${index}`}
                className="absolute"
                style={{
                  ...style,
                  transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  transformStyle: "preserve-3d",
                }}
              >
                <BoothPanel
                  exercise={exercises[index]}
                  position={position}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pill-shaped nav button (like reference) */}
        <div className="flex justify-center mt-8">
          <div
            className="inline-flex items-center gap-0 rounded-full overflow-hidden"
            style={{
              background: "hsl(0 0% 95%)",
              boxShadow: "0 4px 16px hsl(0 0% 0% / 0.15)",
            }}
          >
            <button
              onClick={prev}
              className="px-4 py-3 hover:bg-primary/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} className="text-primary" />
            </button>
            <div className="w-px h-5 bg-primary/20" />
            <button
              onClick={next}
              className="px-4 py-3 hover:bg-primary/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseCarousel;
