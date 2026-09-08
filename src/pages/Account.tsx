import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, BarChart3, CalendarClock, Check, Copy,
  CreditCard, Crown, Gift, Loader2, RefreshCw,
  ShieldCheck, Shield, Sparkles, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

const tierRank: Record<string, number> = { free: 0, core: 1, pro: 2, elite: 3 };

const TIERS = [
  { key: "free",  label: "Free",  color: "text-muted-foreground", bg: "bg-white/10"  },
  { key: "core",  label: "Core",  color: "text-sky-400",          bg: "bg-sky-400/10" },
  { key: "pro",   label: "Pro",   color: "text-primary",          bg: "bg-primary/10" },
  { key: "elite", label: "Elite", color: "text-amber-400",        bg: "bg-amber-400/10" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const Account = () => {
  const navigate = useNavigate();
  const [status, setStatus]   = useState<SubscriptionStatus | null>(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied]   = useState(false);
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

  if (!session) return null;

  const referralLink = `https://visorfitness.com?fpr=${session.user.username ?? ""}`;
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const subscribed  = Boolean(status?.is_subscribed && status?.tier_type !== "free");
  const currentRank = tierRank[status?.tier_type ?? "free"] ?? 0;

  return (
    <AccountShell>
      <div className="space-y-5">

        {/* ── Hero tier banner ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-2xl border border-primary/20 p-[1px]">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-background/80 to-background p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 shimmer pointer-events-none opacity-40" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/8 blur-[80px]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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

              <div className="flex flex-col gap-2 sm:items-end">
                <Button className="gap-2 rounded-xl bg-primary text-background hover:bg-primary/90" asChild>
                  <Link to="/account/plan"><Star className="h-4 w-4" /> Upgrade plan</Link>
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
              value: status?.expires_at
                ? new Date(status.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                : "—",
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

        {/* ── Quick nav cards ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.12)} className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: CreditCard,
              label: "Billing",
              desc: "Invoices, payment & renewal",
              href: "/account/billing",
            },
            {
              icon: BarChart3,
              label: "Usage",
              desc: "Feature limits & credits",
              href: "/account/usage",
            },
            {
              icon: Shield,
              label: "Security",
              desc: "Account & session settings",
              href: "/account/security",
            },
          ].map((card) => (
            <Link
              key={card.label}
              to={card.href}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-primary/25 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/8 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition">
                <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{card.label}</p>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition" />
            </Link>
          ))}
        </motion.div>

        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}

        {/* ── Referral card ─────────────────────────────────────────────────── */}
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
    </AccountShell>
  );
};

export default Account;
