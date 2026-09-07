import { Sparkles, ArrowRight, Crown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/visor/i18n";

type EliteCoachesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EliteCoachesDialog({ open, onOpenChange }: EliteCoachesDialogProps) {
  const { t } = useLanguage();
  const features = [t("elite.f1"), t("elite.f2"), t("elite.f3"), t("elite.f4")];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[200] w-[calc(100vw-1.5rem)] max-w-[520px] border-none bg-transparent p-0 shadow-none sm:rounded-3xl">
        <DialogTitle className="sr-only">VISOR Elite Coaches</DialogTitle>
        <DialogDescription className="sr-only">
          A curated network of verified personal trainers coming soon to VISOR.
        </DialogDescription>

        {/* Card container */}
        <div className="relative overflow-hidden rounded-3xl border border-[#99FFFF]/20 bg-[#0b131e]/90 p-1 shadow-[0_0_60px_rgba(153,255,255,0.12)] backdrop-blur-2xl">
          {/* Subtle cyan gradient orb */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#99FFFF]/10 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#99FFFF]/5 blur-[50px]" />

          <div className="relative flex flex-col rounded-[20px] border border-white/10 bg-[#0F1923]/80 p-6 sm:p-9">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link to="/" className="hover:text-[#99FFFF] transition-colors">
                {t("elite.home")}
              </Link>
              <span>/</span>
              <span className="text-white/80">{t("nav.eliteCoaches")}</span>
            </div>

            {/* Card header icon */}
            <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#99FFFF]/25 bg-[#99FFFF]/10 shadow-[0_0_24px_rgba(153,255,255,0.18)]">
              <Crown className="h-7 w-7 text-[#99FFFF]" />
            </div>

            {/* Coming soon badge */}
            <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#99FFFF]/30 bg-[#99FFFF]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#99FFFF] shadow-[0_0_12px_rgba(153,255,255,0.15)]">
              <Sparkles className="h-3 w-3" />
              {t("elite.badge")}
            </div>

            {/* Heading */}
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("elite.title")}
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {t("elite.desc")}
            </p>

            {/* Feature list */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-xs font-medium text-white/85 backdrop-blur-sm"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#99FFFF]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://apps.apple.com/us/app/visor-fitness/id6776579817"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#99FFFF] px-5 text-sm font-bold text-[#0A1926] shadow-[0_0_20px_rgba(153,255,255,0.35)] transition-all hover:bg-[#B3FFFF] hover:shadow-[0_0_28px_rgba(153,255,255,0.5)] active:scale-95"
              >
                {t("elite.getApp")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Button
                variant="outline"
                className="h-11 flex-1 rounded-full border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                {t("elite.notify")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EliteCoachesDialog;
