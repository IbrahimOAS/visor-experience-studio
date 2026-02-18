import { memo, useEffect, useMemo, useState, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

import uiScreen2 from "@/assets/ui-screen-2.png";
import uiScreen3 from "@/assets/ui-screen-3.png";
import uiScreen4 from "@/assets/ui-screen-4.png";
import uiScreen5 from "@/assets/ui-screen-5.png";
import uiScreen6 from "@/assets/ui-screen-6.png";
import uiScreen7 from "@/assets/ui-screen-7.png";
import uiScreen8 from "@/assets/ui-screen-8.png";
import uiScreen9 from "@/assets/ui-screen-9.png";

const cards = [
  uiScreen2, uiScreen3, uiScreen4, uiScreen5,
  uiScreen6, uiScreen7, uiScreen8, uiScreen9,
];

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

const Cylinder = memo(
  ({
    handleClick,
    controls,
    isActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void;
    controls: any;
    isActive: boolean;
  }) => {
    const isSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isSm ? 1100 : 1800;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(
      rotation,
      (v) => `rotate3d(0, 1, 0, ${v}deg)`
    );

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isActive && rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={i}
              className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`Visor app screen ${i + 1}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-2xl object-cover aspect-[9/16] shadow-xl"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

const FeaturesCarousel = () => {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  const handleClick = useCallback((imgUrl: string, _index: number) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
    controls.stop();
  }, [controls]);

  const handleClose = useCallback(() => {
    setActiveImg(null);
    setIsCarouselActive(true);
  }, []);

  return (
    <section id="features" className="py-28 px-6 relative">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Transform</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seven powerful systems working together to reshape your body, mind, and identity.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div layout className="relative">
          <AnimatePresence mode="sync">
            {activeImg && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                layoutId={`img-container-${activeImg}`}
                layout="position"
                onClick={handleClose}
                className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-8 md:p-20 cursor-pointer"
                style={{ willChange: "opacity" }}
                transition={transitionOverlay}
              >
                <motion.img
                  layoutId={`img-${activeImg}`}
                  src={activeImg}
                  className="max-w-sm w-full max-h-[80vh] rounded-3xl shadow-2xl object-contain glow-orange"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ willChange: "transform" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative h-[500px] w-full overflow-hidden">
            <Cylinder
              handleClick={handleClick}
              controls={controls}
              isActive={isCarouselActive}
            />
          </div>

          <p className="text-center text-muted-foreground text-sm mt-16">
            Drag to explore · Click to expand
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
