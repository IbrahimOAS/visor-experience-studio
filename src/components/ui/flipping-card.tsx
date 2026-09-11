import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className="group/flipping-card [perspective:1000px]"
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className={cn(
          "relative cursor-pointer select-none rounded-xl border border-white/10 bg-[#070d16] shadow-lg transition-all duration-700 [transform-style:preserve-3d] md:group-hover/flipping-card:[transform:rotateY(180deg)]",
          "h-[var(--height)] w-[var(--width)]",
          flipped && "[transform:rotateY(180deg)]",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#070d16] text-white [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#070d16] text-white [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
