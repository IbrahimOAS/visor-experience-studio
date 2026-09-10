import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, CalendarClock, CreditCard, ExternalLink,
  Loader2, RefreshCw, ShieldCheck, Sparkles, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { createPortalSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const AccountBilling = () => {
  const navigate = useNavigate();
  const [status, setStatus]             = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading]           = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError]               = useState("");
  const loadStatus = async () => {
    setError("");
    setLoading(true);
    try { setStatus(await getSubscriptionStatus()); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load billing info"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const s = getSession();
    if (!s) { navigate(`/login?redirect=${encodeURIComponent("/account/billing")}`); return; }
    loadStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPortal = async () => {
    setError("");
    setPortalLoading(true);
    try {
      const returnUrl = `${window.location.origin}/account/billing`;
      const { url } = await createPortalSession(returnUrl);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open billing portal");
      setPortalLoading(false);
    }
  };

  const session = getSession();
  if (!session) return null;

  const subscribed = Boolean(status?.is_subscribed && status?.tier_type !== "free");
  const renewalDate = status?.expires_at
    ? new Date(status.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <AccountShell>
      <div className="space-y-5">

        {/* ── Subscription status card ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Subscription
          </h3>

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading subscription…
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="mb-1 text-xs text-muted-foreground">Plan</p>
                <p className="text-lg font-bold">{status?.tier_name ?? "Free"}</p>
                <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  subscribed
                    ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20"
                    : "bg-white/8 text-white/40 border border-white/10"
                }`}>
                  {subscribed ? "Active" : "Free"}
                </span>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="mb-1 text-xs text-muted-foreground">
                  {status?.will_renew ? "Renews on" : "Expires on"}
                </p>
                <p className="flex items-center gap-2 text-lg font-bold">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  {renewalDate ?? "—"}
                </p>
                {status?.will_renew === false && renewalDate && (
                  <p className="mt-1 text-xs text-amber-400">Will not auto-renew</p>
                )}
              </div>

              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="mb-1 text-xs text-muted-foreground">Billing status</p>
                <p className="text-lg font-bold capitalize">{status?.status ?? "—"}</p>
                <Button variant="ghost" size="sm" onClick={loadStatus} disabled={loading} className="mt-1 h-6 px-0 text-xs text-muted-foreground hover:text-foreground">
                  <RefreshCw className="mr-1 h-3 w-3" /> Refresh
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Billing actions ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.08)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
            <CreditCard className="h-5 w-5 text-primary" />
            Billing actions
          </h3>

          <div className="grid gap-3">
            {/* Manage billing — Stripe portal */}
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-primary/25 hover:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition">
                  <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Manage billing</p>
                  <p className="text-xs text-muted-foreground">Invoices, payment methods &amp; cancellation</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {portalLoading
                  ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  : <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                }
              </div>
            </button>

            {/* Change plan */}
            <Link
              to="/account/plan"
              className="group flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4 transition hover:border-primary/40 hover:bg-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Change plan</p>
                  <p className="text-xs text-muted-foreground">Compare tiers &amp; upgrade inside your account</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </Link>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </motion.div>

        {/* ── Info note ─────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.12)} className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            Web subscriptions are managed through Stripe. When you click <strong className="text-foreground">Manage billing</strong> you will be taken to the Stripe Customer Portal — your return path back to VISOR is set automatically.
          </p>
          <p className="mt-2">
            App Store &amp; Google Play subscriptions are managed through Apple or Google account settings and are not shown here.
          </p>
        </motion.div>

      </div>
    </AccountShell>
  );
};

export default AccountBilling;
