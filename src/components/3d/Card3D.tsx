import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export const Card3D = ({ children, className = "", intensity = 14 }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rxVal = useMotionValue(0);
  const ryVal = useMotionValue(0);
  const rotateX = useSpring(rxVal, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(ryVal, { stiffness: 220, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    ryVal.set(relX * intensity);
    rxVal.set(-relY * (intensity * 0.65));
  };

  const onLeave = () => {
    rxVal.set(0);
    ryVal.set(0);
  };

  return (
    <div
      ref={ref}
      style={{ perspective: "900px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {children}
        {/* Ice sheen that slides on hover */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(115,199,255,0.09) 0%, rgba(165,219,255,0.04) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Card3D;
