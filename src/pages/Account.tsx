import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Copy, CreditCard, Gift, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";
import { createPortalSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";

const Account = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [error, setError] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const session = getSession();

  useEffect(() => {
    if (!session) {
      navigate(`/login?redirect=${encodeURIComponent("/account")}`);
      return;
    }

    getSubscriptionStatus()
      .then(setStatus)
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load account"));
  }, [navigate, session]);

  const openPortal = async () => {
    setError("");
    setPortalLoading(true);
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open billing portal");
      setPortalLoading(false);
    }
  };

  const logout = async () => {
    await clearSession();
    navigate("/");
  };

  const referralLink = `https://visorfitness.com?fpr=${session?.user.username ?? ""}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!session) return null;

  return (
    <main className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between py-3">
          <Link to="/" className="font-['Space_Grotesk'] text-xl font-bold">
            VISOR
          </Link>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </header>

        <section className="py-14">
          <h1 className="text-4xl font-bold md:text-5xl">Account</h1>
          <p className="mt-3 text-muted-foreground">{session.user.email}</p>
        </section>

        <section className="glass-card-strong rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                {status?.is_subscribed ? "Active subscription" : "Free account"}
              </div>
              <h2 className="text-3xl font-bold">{status?.tier_name ?? "Loading..."}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {status?.expires_at
                  ? `Current period ends ${new Date(status.expires_at).toLocaleDateString()}`
                  : "No renewal date on file."}
              </p>
              {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            </div>
            <div className="flex flex-col gap-3 sm:min-w-52">
              <Button onClick={openPortal} disabled={portalLoading}>
                <CreditCard className="h-4 w-4" />
                {portalLoading ? "Opening..." : "Manage billing"}
              </Button>
              <Button asChild variant="outline">
                <Link to="/pricing">Change plan</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Referral section */}
        <section className="mt-6 glass-card-strong rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Refer &amp; Earn</h2>
              <p className="text-sm text-muted-foreground">Earn 15% of every subscription your friends start</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Share your personal link. When someone subscribes through it, you automatically earn{" "}
            <span className="text-primary font-semibold">15% recurring commission</span> — no cap, no expiry.
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex-1 truncate text-sm font-mono text-muted-foreground">{referralLink}</span>
            <Button size="sm" variant="outline" onClick={copyReferralLink} className="shrink-0 gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Commissions are tracked automatically. Check your earnings at{" "}
            <a
              href="https://visorfitness.firstpromoter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              visorfitness.firstpromoter.com
            </a>
          </p>
        </section>

      </div>
    </main>
  );
};

export default Account;
