import { motion } from "framer-motion";
import { Apple, PlayCircle, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  handleAppStoreClick,
  handleGooglePlayClick,
} from "@/lib/app-store";

const DownloadCTA = () => {
  const { t } = useTranslation();
  return (
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold"
          >
            <Sparkles size={16} />
            {t("download.launchBadge")}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("download.title")}{" "}
            <span className="text-gradient">{t("download.titleAccent")}</span>
            {t("download.titleSuffix")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            {t("download.subtitle")}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Store buttons */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAppStoreClick}
                aria-label="Download VISOR on the App Store"
                className="flex items-center gap-3 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_32px_-4px_hsl(28,100%,55%/0.5)]"
              >
                <Apple size={24} />
                <div className="text-left">
                  <div className="text-[10px] leading-none text-primary-foreground/80">{t("download.appStoreCaption")}</div>
                  <div className="text-base leading-tight">{t("download.appStore")}</div>
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
                  <div className="text-[10px] leading-none text-muted-foreground">{t("download.playCaption")}</div>
                  <div className="text-base leading-tight text-foreground">{t("download.play")}</div>
                </div>
              </a>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-3">
              <div className="glass-card-strong p-5 rounded-2xl">
                <QRCodeSVG
                  value={APP_STORE_URL}
                  size={140}
                  level="H"
                  fgColor="#f2f2f2"
                  bgColor="transparent"
                />
              </div>
              <span className="text-sm text-muted-foreground">{t("download.scan")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
