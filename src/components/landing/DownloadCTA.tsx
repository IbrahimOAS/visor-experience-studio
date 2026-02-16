import { motion } from "framer-motion";
import { Apple, PlayCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const DownloadCTA = () => (
  <section id="download" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-10 md:p-16 text-center glow-orange"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Start Your <span className="text-gradient">Transformation</span> Today
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Download VISOR and see who you're about to become.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Store buttons */}
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-7 py-4 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              <Apple size={24} />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-70">Download on the</div>
                <div className="text-base leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-7 py-4 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              <PlayCircle size={24} />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-70">Get it on</div>
                <div className="text-base leading-tight">Google Play</div>
              </div>
            </a>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white p-4 rounded-2xl">
              <QRCodeSVG
                value="https://visor.app/download"
                size={140}
                level="H"
                fgColor="#0a0a0a"
                bgColor="#ffffff"
              />
            </div>
            <span className="text-sm text-muted-foreground">Scan to download</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DownloadCTA;
