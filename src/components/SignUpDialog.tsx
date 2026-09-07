import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisorLogo } from "@/visor/components/VisorLogo";
import { useLanguage } from "@/visor/i18n";

type SignUpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn?: () => void;
};

export function SignUpDialog({ open, onOpenChange, onSignIn }: SignUpDialogProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[200] w-[calc(100vw-2rem)] max-w-[440px] max-h-[90vh] overflow-y-auto border-white/10 bg-[#0b131e]/95 p-0 text-white backdrop-blur-2xl sm:rounded-2xl">
        <DialogTitle className="sr-only">Create your VISOR account</DialogTitle>
        <DialogDescription className="sr-only">
          Create a VISOR account to unlock your web subscription
        </DialogDescription>

        {/* Brand header */}
        <div className="flex items-center gap-2.5 px-7 pt-6 sm:px-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#99FFFF]/30 bg-gradient-to-b from-[#1E293B] to-[#020617] shadow-[0_0_15px_rgba(153,255,255,0.2)]">
            <VisorLogo size={20} />
          </div>
          <span className="text-sm font-bold tracking-widest text-white">VISOR</span>
        </div>

        <div className="flex flex-col p-7 pt-5 sm:p-8 sm:pt-5">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {t("signup.title")}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {t("signup.sub")}
          </p>

          <Button
            variant="outline"
            className="mt-6 h-11 w-full rounded-xl border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {t("signin.google")}
          </Button>

          <div className="relative my-6 flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="mx-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">{t("signin.email")}</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="signup-name" className="text-sm font-medium text-white/90">
                {t("signup.name")}
              </Label>
              <Input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Carter"
                className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus-visible:border-[#99FFFF]/50 focus-visible:ring-[#99FFFF]/30"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-email" className="text-sm font-medium text-white/90">
                {t("signin.email")}
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus-visible:border-[#99FFFF]/50 focus-visible:ring-[#99FFFF]/30"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password" className="text-sm font-medium text-white/90">
                {t("signin.password")}
              </Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-white/10 bg-white/5 px-4 pr-10 text-sm text-white placeholder:text-white/30 focus-visible:border-[#99FFFF]/50 focus-visible:ring-[#99FFFF]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-confirm" className="text-sm font-medium text-white/90">
                {t("signup.confirm")}
              </Label>
              <div className="relative">
                <Input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-white/10 bg-white/5 px-4 pr-10 text-sm text-white placeholder:text-white/30 focus-visible:border-[#99FFFF]/50 focus-visible:ring-[#99FFFF]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-[#99FFFF] text-sm font-bold text-[#0A1926] hover:bg-[#B3FFFF] shadow-[0_0_20px_rgba(153,255,255,0.35)]"
            >
              <UserPlus className="mr-1.5 h-4 w-4" />
              {t("signup.submit")}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-white/60">
            {t("signup.have")}{" "}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSignIn?.();
              }}
              className="font-semibold text-[#99FFFF] hover:underline"
            >
              {t("signin.submit")}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpDialog;
