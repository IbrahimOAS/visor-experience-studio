import { memo, useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

import appOnboarding from "@/assets/visor-app-70.png.asset.json";
import appNutritionPrefs from "@/assets/visor-app-71.png.asset.json";
import appBaselinePhotos from "@/assets/visor-app-72.png.asset.json";
import appFutureYou from "@/assets/visor-app-73.png.asset.json";
import appToday from "@/assets/visor-app-74.png.asset.json";
import appPlan from "@/assets/visor-app-75.png.asset.json";
import appSession from "@/assets/visor-app-76.png.asset.json";
import appCalories from "@/assets/visor-app-77.png.asset.json";
import appCoach from "@/assets/visor-app-78.png.asset.json";
import appCycle from "@/assets/visor-app-79.png.asset.json";

const cards = [
  appOnboarding.url, appFutureYou.url, appToday.url, appPlan.url, appSession.url,
  appCalories.url, appCoach.url, appNutritionPrefs.url, appBaselinePhotos.url, appCycle.url,
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
    const cylinderWidth = isSm ? 1600 : 2600;
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
          perspective: "1200px",
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
  const { t } = useTranslation();
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

      <div className="w-full max-w-[100vw] mx-auto relative z-10 px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.features.titlePre")}{" "}
            <span className="text-gradient">{t("landing.features.titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("landing.features.subtitle")}
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

          <div className="relative h-[600px] w-full overflow-visible">
            <Cylinder
              handleClick={handleClick}
              controls={controls}
              isActive={isCarouselActive}
            />
          </div>

          <p className="text-center text-muted-foreground text-sm mt-16">
            {t("landing.features.drag")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
