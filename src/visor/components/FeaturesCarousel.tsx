import React, { memo, useEffect, useState, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { X, Sparkles, Hand } from 'lucide-react';
import logoAnimation from '@/assets/logo-animation.mp4.asset.json';

const logoVideo = logoAnimation.url;
const isVideo = (src: string) => src.endsWith('.mp4');

const cards = [
  '/app-screens/ui-1.jpeg',
  '/app-screens/ui-2.jpeg',
  '/app-screens/ui-3.jpeg',
  '/app-screens/ui-4.jpeg',
  '/app-screens/ui-5.jpeg',
  '/app-screens/ui-6.jpeg',
  '/app-screens/ui-7.jpeg',
  logoVideo,
  '/app-screens/ui-9.jpeg',
  '/app-screens/ui-10.jpeg',
];

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const };
const transitionOverlay = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

interface CylinderProps {
  handleClick: (imgUrl: string, index: number) => void;
  controls: ReturnType<typeof useAnimation>;
  isActive: boolean;
}

const Cylinder = memo(({ handleClick, controls, isActive }: CylinderProps) => {
  const isSm = useMediaQuery('(max-width: 640px)');
  const isMd = useMediaQuery('(max-width: 1024px)');
  const cylinderWidth = isSm ? 1400 : isMd ? 1900 : 2300;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (v: number) => `rotate3d(0, 1, 0, ${v}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center select-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <motion.div
        drag={isActive ? 'x' : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: 'preserve-3d',
        }}
        onDrag={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
          isActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
          isActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: 'spring', stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((imgUrl, i) => (
          <motion.div
            key={i}
            className="absolute flex h-full origin-center items-center justify-center rounded-xl p-1.5 cursor-pointer group"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(imgUrl, i)}
          >
            <div className="relative w-full rounded-xl overflow-hidden border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.7)] group-hover:border-[#99FFFF]/80 group-hover:shadow-[0_0_25px_rgba(153,255,255,0.3)] transition-all duration-300 bg-[#0d141f]">
              {isVideo(imgUrl) ? (
                <video
                  src={imgUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none w-full object-cover aspect-[9/20]"
                />
              ) : (
                <img
                  src={imgUrl}
                  alt={`VISOR app screen ${i + 1}`}
                  className="pointer-events-none w-full object-cover aspect-[9/20]"
                />
              )}
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-black/30 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export const FeaturesCarousel = () => {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  const handleClick = useCallback(
    (imgUrl: string, index: number) => {
      setActiveImg(imgUrl);
      setActiveIdx(index);
      setIsCarouselActive(false);
      controls.stop();
    },
    [controls]
  );

  const handleClose = useCallback(() => {
    setActiveImg(null);
    setIsCarouselActive(true);
  }, []);

  return (
    <div id="features-3d-cylinder" className="py-12 sm:py-16 px-2 sm:px-6 relative w-full overflow-hidden">
      {/* Ambient center glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#99FFFF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-[100vw] mx-auto relative z-10 px-0">
        <motion.div layout className="relative">
          {/* Expanded Modal Overlay */}
          <AnimatePresence mode="sync">
            {activeImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-8 cursor-pointer"
                style={{ willChange: 'opacity' }}
                transition={transitionOverlay}
              >
                <div
                  className="relative max-w-sm w-full flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleClose}
                    className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-[#99FFFF] hover:text-[#0b131e] text-white transition-all cursor-pointer border border-white/20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {isVideo(activeImg) ? (
                    <motion.video
                      src={activeImg}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full max-h-[75vh] rounded-3xl shadow-[0_0_50px_rgba(153,255,255,0.3)] object-contain border border-[#99FFFF]/40"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  ) : (
                    <motion.img
                      src={activeImg}
                      alt="VISOR App Preview"
                      className="w-full max-h-[75vh] rounded-3xl shadow-[0_0_50px_rgba(153,255,255,0.3)] object-contain border border-[#99FFFF]/40"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}

                  <div className="mt-4 text-center">
                    <h4 className="text-base font-semibold text-white">
                      VISOR Experience
                    </h4>
                    <p className="text-xs text-[#99FFFF]/80 font-mono mt-0.5">
                      Click anywhere to return to 3D cylinder
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Cylinder Container */}
          <div className="relative h-[420px] sm:h-[600px] md:h-[780px] w-full overflow-visible">
            <Cylinder handleClick={handleClick} controls={controls} isActive={isCarouselActive} />
          </div>

          {/* Interactive Drag Hint */}
          <div className="flex items-center justify-center gap-2 text-center text-white/50 text-xs sm:text-sm font-mono mt-8 sm:mt-10">
            <Hand className="w-4 h-4 text-[#99FFFF] animate-bounce" />
            <span>Drag horizontally to rotate 3D cylinder • Click any screen to expand</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesCarousel;
