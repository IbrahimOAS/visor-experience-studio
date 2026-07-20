import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeoHead } from "@/components/seo/SeoHead";
import { toast } from "sonner";

type Status = "verifying" | "ready" | "error";

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recoveryRef = useRef(false);

  useEffect(() => {
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    const hasRecoveryHint =
      hash.includes("type=recovery") || search.includes("type=recovery");
    const hasError =
      hash.includes("error=") || search.includes("error=");

    if (hasError) {
      const params = new URLSearchParams(
        hash.startsWith("#") ? hash.slice(1) : search,
      );
      const desc = params.get("error_description") || params.get("error") || "";
      const lower = desc.toLowerCase();
      setErrorMsg(
        lower.includes("expired")
          ? "This password reset link has expired. Please request a new one."
          : "This password reset link is invalid. Please request a new one.",
      );
      setStatus("error");
      // Clean the URL so tokens/errors are not left in the address bar.
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        recoveryRef.current = true;
        setStatus("ready");
        // Strip tokens from the URL after Supabase parsed them.
        window.history.replaceState(null, "", window.location.pathname);
      }
    });

    // If there's no recovery hint in the URL, this page shouldn't be used
    // as a general password-change form. Decide redirect based on session.
    if (!hasRecoveryHint) {
      supabase.auth.getSession().then(({ data }) => {
        if (recoveryRef.current) return;
        navigate(data.session ? "/account" : "/auth", { replace: true });
      });
    } else {
      // Fallback: if PASSWORD_RECOVERY doesn't fire within a short window,
      // treat the link as invalid/expired.
      const timer = window.setTimeout(() => {
        if (!recoveryRef.current) {
          setErrorMsg(
            "This password reset link is invalid or has expired. Please request a new one.",
          );
          setStatus("error");
        }
      }, 4000);
      return () => {
        window.clearTimeout(timer);
        sub.subscription.unsubscribe();
      };
    }

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryRef.current) return;
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    navigate("/account", { replace: true });
  };

  return (
    <>
      <SeoHead
        title="Reset password — VISOR"
        description="Set a new password for your VISOR account."
        path="/reset-password"
      />
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
        {status === "verifying" && (
          <div className="text-muted-foreground" role="status" aria-live="polite">
            Verifying reset link…
          </div>
        )}

        {status === "error" && (
          <div className="w-full max-w-md glass-card-strong rounded-2xl p-8 space-y-4 text-center">
            <h1 className="text-2xl font-bold">Link not valid</h1>
            <p className="text-muted-foreground">{errorMsg}</p>
            <Button
              className="w-full"
              onClick={() => navigate("/auth", { replace: true })}
            >
              Request a new link
            </Button>
          </div>
        )}

        {status === "ready" && (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md glass-card-strong rounded-2xl p-8 space-y-4"
          >
            <h1 className="text-2xl font-bold">Set a new password</h1>
            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Updating…" : "Update password"}
            </Button>
          </form>
        )}
      </main>
    </>
  );
};

export default ResetPassword;
