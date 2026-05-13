import { motion } from "framer-motion";
import { Apple, PlayCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const APP_STORE_URL = "https://apps.apple.com/app/visor";
const APP_STORE_DEEP_LINK = "itms-apps://apps.apple.com/app/visor";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.visor.app";
const GOOGLE_PLAY_DEEP_LINK = "market://details?id=com.visor.app";

const handleAppStoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  if (isIOS) {
    e.preventDefault();
    window.location.href = APP_STORE_DEEP_LINK;
  }
};

const handleGooglePlayClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isAndroid) {
    e.preventDefault();
    window.location.href = GOOGLE_PLAY_DEEP_LINK;
  }
};

const DownloadCTA = () => (
  <section id="download" className="py-28 px-6 relative">
    {/* Ambient */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[160px]" />
    </div>

    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card-elite rounded-3xl p-10 md:p-16 text-center shimmer"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Download the <span className="text-gradient">AI Fitness App</span> Today
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Get VISOR on iOS or Android and see your before & after body transformation prediction in seconds.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Store buttons */}
          <div className="flex flex-col gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAppStoreClick}
              aria-label="Download VISOR on the App Store"
              className="flex items-center gap-3 px-7 py-4 rounded-xl glass-card-strong font-semibold hover:border-primary/20 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.3)] transition-all duration-300"
            >
              <Apple size={24} className="text-foreground" />
              <div className="text-left">
                <div className="text-[10px] leading-none text-muted-foreground">Download on the</div>
                <div className="text-base leading-tight text-foreground">App Store</div>
              </div>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGooglePlayClick}
              aria-label="Get VISOR on Google Play"
              className="flex items-center gap-3 px-7 py-4 rounded-xl glass-card-strong font-semibold hover:border-primary/20 hover:shadow-[0_0_24px_-4px_hsl(28,100%,55%/0.3)] transition-all duration-300"
            >
              <PlayCircle size={24} className="text-foreground" />
              <div className="text-left">
                <div className="text-[10px] leading-none text-muted-foreground">Get it on</div>
                <div className="text-base leading-tight text-foreground">Google Play</div>
              </div>
            </a>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="glass-card-strong p-5 rounded-2xl">
              <QRCodeSVG
                value="https://visor.app/download"
                size={140}
                level="H"
                fgColor="#f2f2f2"
                bgColor="transparent"
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
