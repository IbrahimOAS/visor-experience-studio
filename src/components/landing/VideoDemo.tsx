import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import demoVideo from "@/assets/visor-demo.mp4";

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section className="py-28 px-6 relative">
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
            Watch how AI-powered body visualization, adaptive coaching, and identity tracking work together to transform your life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden glass-card-strong glow-orange cursor-pointer group"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={demoVideo}
            className="w-full h-auto"
            loop
            muted
            playsInline
            onEnded={() => setPlaying(false)}
          />
          {/* Play/Pause overlay */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;
