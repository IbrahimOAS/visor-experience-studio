import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, CalendarClock, Check, CheckCircle2, Copy,
  CreditCard, Crown, Gift, Loader2, Lock, RefreshCw,
  ShieldCheck, Sparkles, Star, TrendingUp, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { createPortalSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

// ── Tier config ───────────────────────────────────────────────────────────────
const tierRank: Record<string, number> = { free: 0, core: 1, pro: 2, elite: 3 };

const TIERS = [
  { key: "free",  label: "Free",  color: "text-muted-foreground", bg: "bg-white/10"  },
  { key: "core",  label: "Core",  color: "text-sky-400",          bg: "bg-sky-400/10" },
  { key: "pro",   label: "Pro",   color: "text-primary",          bg: "bg-primary/10" },
  { key: "elite", label: "Elite", color: "text-amber-400",        bg: "bg-amber-400/10" },
];

const featureRows = [
  { label: "AI Workout Plans",      desc: "Personalised to your goals",     icon: Sparkles,    key: "ai_plan_full",            minTier: "core"  },
  { label: "Food Scanner",          desc: "Instant nutrition from camera",  icon: Zap,         key: "food_scanner",            minTier: "pro"   },
  { label: "Olympia Mode",          desc: "Elite-level programming",        icon: Crown,       key: "olympia_mode",            minTier: "elite" },
  { label: "Priority AI Rendering", desc: "Fastest response times",         icon: TrendingUp,  key: "priority_ai_rendering",   minTier: "elite" },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

// ── Component ─────────────────────────────────────────────────────────────────
const Account = () => {
  const navigate       = useNavigate();
  const [status, setStatus]           = useState<SubscriptionStatus | null>(null);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [copied, setCopied]           = useState(false);
  const session = getSession();

  const loadStatus = async () => {
    setError("");
    setLoading(true);
    try { setStatus(await getSubscriptionStatus()); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load account"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!session) { navigate(`/login?redirect=${encodeURIComponent("/account")}`); return; }
    loadStatus();
  }, [navigate, session]);

  const openPortal = async () => {
    setError("");
    setPortalLoading(true);
    try { const { url } = await createPortalSession(); window.location.href = url; }
    catch (err) { setError(err instanceof Error ? err.message : "Could not open billing portal"); setPortalLoading(false); }
  };

  if (!session) return null;

  const referralLink = `https://visorfitness.com?fpr=${session.user.username ?? ""}`;
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const subscribed = Boolean(status?.is_subscribed && status?.tier_type !== "free");
  const currentRank = tierRank[status?.tier_type ?? "free"] ?? 0;

  return (
    <AccountShell>
      <div className="space-y-5">

        {/* ── Hero tier banner ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-2xl border border-primary/20 p-[1px]">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-background/80 to-background p-6 sm:p-8 overflow-hidden">
            {/* Background shimmer */}
            <div className="absolute inset-0 shimmer pointer-events-none opacity-40" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/8 blur-[80px]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: plan info */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <span className={`absolute -bottom-1.5 -right-1.5 rounded-full border-2 border-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${subscribed ? "bg-primary text-background" : "bg-white/15 text-muted-foreground"}`}>
                    {status?.tier_type ?? "FREE"}
                  </span>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${subscribed ? "bg-primary/15 text-primary border border-primary/25" : "bg-white/8 text-muted-foreground border border-white/10"}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {loading ? "Syncing…" : subscribed ? "Active subscription" : "Free account"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{loading ? "Loading…" : (status?.tier_name ?? "VISOR FREE")}</h2>
                  <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                    {subscribed
                      ? "Linked to your VISOR mobile account — all features sync automatically."
                      : "Upgrade to unlock AI plans, food scanner, and elite coaching tools."}
                  </p>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex flex-col gap-2 sm:items-end">
                <Button className="gap-2 rounded-xl bg-primary text-background hover:bg-primary/90" asChild>
                  <Link to="/pricing"><Star className="h-4 w-4" /> Upgrade plan</Link>
                </Button>
                <Button variant="outline" className="gap-2 rounded-xl border-white/15 hover:bg-white/8" onClick={loadStatus} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Refresh
                </Button>
              </div>
            </div>

            {/* Tier progress bar */}
            <div className="relative mt-8">
              <div className="mb-3 flex justify-between">
                {TIERS.map((t, i) => (
                  <div key={t.key} className="flex flex-col items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${i <= currentRank ? "bg-primary" : "bg-white/15"}`} />
                    <span className={`text-xs font-medium ${i <= currentRank ? t.color : "text-white/25"}`}>{t.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentRank / 3) * 100}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats row ─────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            {
              icon: CalendarClock,
              label: "Renewal",
              value: status?.expires_at ? new Date(status.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—",
            },
            {
              icon: Sparkles,
              label: "Current tier",
              value: status?.tier_type ? status.tier_type.charAt(0).toUpperCase() + status.tier_type.slice(1) : "Free",
            },
            {
              icon: ShieldCheck,
              label: "Status",
              value: subscribed ? "Active" : "Free",
              highlight: subscribed,
            },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-0.5 text-lg font-bold ${s.highlight ? "text-primary" : ""}`}>{loading ? "—" : s.value}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Billing + Features grid ───────────────────────────────────────── */}
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">

          {/* Billing card */}
          <motion.section {...fadeUp(0.12)} id="billing" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
              <CreditCard className="h-5 w-5 text-primary" />
              Billing
            </h3>
            <div className="grid gap-3">
              <button
                onClick={openPortal}
                disabled={portalLoading}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-primary/25 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 group-hover:bg-primary/10 transition">
                    <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Manage billing</p>
                    <p className="text-xs text-muted-foreground">Invoices, payment methods &amp; receipts</p>
                  </div>
                </div>
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />}
              </button>

              <Link
                to="/pricing"
                className="group flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4 transition hover:border-primary/40 hover:bg-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Change plan</p>
                    <p className="text-xs text-muted-foreground">Compare tiers &amp; upgrade</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </Link>
            </div>
            {error && <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}
          </motion.section>

          {/* Referral card */}
          <motion.section {...fadeUp(0.16)} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/8 to-transparent p-6">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-[60px] pointer-events-none" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/25">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Refer &amp; Earn</h3>
                  <p className="text-xs text-muted-foreground">Share VISOR, earn forever</p>
                </div>
              </div>

              <div className="mb-4 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-center">
                <span className="text-3xl font-bold text-primary">15%</span>
                <p className="text-xs text-muted-foreground mt-0.5">recurring commission · no cap · no expiry</p>
              </div>

              <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
                Every time someone subscribes through your link you earn a cut — automatically, every renewal.
              </p>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <span className="flex-1 truncate text-xs font-mono text-muted-foreground">{referralLink}</span>
                <button onClick={copyReferralLink} className="shrink-0 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/8 px-2.5 py-1.5 text-xs font-medium transition hover:bg-primary/15 hover:border-primary/30 hover:text-primary">
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <a href="https://visorfitness.firstpromoter.com" target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline">
                Track earnings at firstpromoter <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </motion.section>
        </div>

        {/* ── Feature access ─────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0.2)} id="security" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <Zap className="h-5 w-5 text-primary" />
            Feature access
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {featureRows.map((feature, i) => {
              const enabled =
                typeof status?.feature_flags?.[feature.key] === "boolean"
                  ? Boolean(status?.feature_flags?.[feature.key])
                  : currentRank >= (tierRank[feature.minTier] ?? 0);
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.05, duration: 0.4 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                    enabled
                      ? "border-primary/20 bg-primary/5"
                      : "border-white/8 bg-white/[0.02]"
                  }`}
                >
                  {/* Lock overlay for disabled */}
                  {!enabled && (
                    <div className="absolute inset-0 flex items-center justify-end pr-5 pointer-events-none">
                      <Lock className="h-10 w-10 text-white/5" />
                    </div>
                  )}
                  <div className="relative flex items-start gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${enabled ? "bg-primary/15 border-primary/25" : "bg-white/5 border-white/10"}`}>
                      <Icon className={`h-5 w-5 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-sm font-semibold ${!enabled && "text-muted-foreground"}`}>{feature.label}</p>
                        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          enabled
                            ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20"
                            : "bg-white/8 text-white/30 border border-white/10"
                        }`}>
                          {enabled ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          {enabled ? "Enabled" : `${feature.minTier.toUpperCase()}+`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {!subscribed && (
            <motion.div {...fadeUp(0.35)} className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <p className="text-sm text-muted-foreground">Unlock all features by upgrading your plan.</p>
              <Button asChild className="shrink-0 rounded-xl bg-primary text-background hover:bg-primary/90">
                <Link to="/pricing">View plans</Link>
              </Button>
            </motion.div>
          )}
        </motion.section>

      </div>
    </AccountShell>
  );
};

export default Account;
