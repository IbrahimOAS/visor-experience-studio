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
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
          className="relative rounded-3xl overflow-hidden border border-border/50 glow-orange cursor-pointer group"
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
            className={`absolute inset-0 flex items-center justify-center bg-background/30 transition-opacity duration-300 ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
              {playing ? <Pause size={32} className="text-primary-foreground" /> : <Play size={32} className="text-primary-foreground ml-1" />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;
