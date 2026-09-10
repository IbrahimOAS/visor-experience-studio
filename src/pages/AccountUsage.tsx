import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, CheckCircle2, Loader2, Lock,
  RefreshCw, Sparkles, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const tierRank: Record<string, number> = { free: 0, core: 1, pro: 2, elite: 3 };

const featureRows = [
  { label: "Health App Sync",        desc: "iOS Health & Google Fit sync",      key: "health_sync",             minTier: "free"  },
  { label: "AI Workout Plans",       desc: "Personalised to your goals",        key: "ai_plan_full",            minTier: "core"  },
  { label: "Unlimited Tracking",     desc: "Track all workouts without limits", key: "unlimited_tracking",      minTier: "core"  },
  { label: "Coach Chat",             desc: "Unlimited VISOR AI chat",           key: "coach_chat",              minTier: "core"  },
  { label: "Food Scanner",           desc: "Instant nutrition from camera",     key: "food_scanner",            minTier: "pro"   },
  { label: "Custom Workout Builder", desc: "Build your own programs",           key: "custom_workout_builder",  minTier: "pro"   },
  { label: "AI Health Suggestions",  desc: "Personalised insights from your device data", key: "ai_health_suggestions", minTier: "pro" },
  { label: "Olympia Mode",           desc: "Elite-level programming",           key: "olympia_mode",            minTier: "elite" },
  { label: "AI Nutrition Generator", desc: "Personalised meal plans",           key: "ai_nutrition_generator",  minTier: "elite" },
  { label: "Priority AI Rendering",  desc: "Fastest response times",            key: "priority_ai_rendering",   minTier: "elite" },
];

const formatLimitValue = (val: unknown): string => {
  if (val == null) return "—";
  if (Array.isArray(val)) return val.length ? (val as string[]).join(", ") : "None";
  if (val === -1) return "Unlimited";
  if (typeof val === "number") return val.toLocaleString();
  return String(val);
};

const formatLimitKey = (key: string): string =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const AccountUsage = () => {
  const navigate = useNavigate();
  const [status, setStatus]   = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const loadStatus = async () => {
    setError("");
    setLoading(true);
    try { setStatus(await getSubscriptionStatus()); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load usage"); }
    finally { setLoading(false); }
  };

  // Read session inside the effect only — keeps it out of the deps array
  // and prevents an infinite re-render loop caused by getSession() returning
  // a new object reference on every render (JSON.parse creates a new object each call).
  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate(`/login?redirect=${encodeURIComponent("/account/usage")}`);
      return;
    }
    loadStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render-time guard — only used to bail out, not in any dep array
  if (!getSession()) return null;

  const currentRank = tierRank[status?.tier_type ?? "free"] ?? 0;
  const subscribed  = Boolean(status?.is_subscribed && status?.tier_type !== "free");
  const limits      = status?.limits
    ? Object.entries(status.limits).filter(([, v]) => v != null)
    : [];
  const hasLimits = limits.length > 0;

  return (
    <AccountShell>
      <div className="space-y-5">

        {/* ── Feature access ─────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5 text-primary" />
              Feature access
            </h3>
            <Button
              variant="ghost" size="sm"
              onClick={loadStatus} disabled={loading}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading features…
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {featureRows.map((feature, i) => {
                const flagVal = status?.feature_flags?.[feature.key];
                const enabled =
                  typeof flagVal === "boolean"
                    ? flagVal
                    : currentRank >= (tierRank[feature.minTier] ?? 0);

                return (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                    className={`relative overflow-hidden rounded-2xl border p-4 transition ${
                      enabled ? "border-primary/20 bg-primary/5" : "border-white/8 bg-white/[0.02]"
                    }`}
                  >
                    {!enabled && (
                      <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
                        <Lock className="h-10 w-10 text-white/5" />
                      </div>
                    )}
                    <div className="relative flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-sm font-semibold truncate ${!enabled ? "text-muted-foreground" : ""}`}>
                          {feature.label}
                        </p>
                        <span className={`shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          enabled
                            ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20"
                            : "bg-white/8 text-white/30 border border-white/10"
                        }`}>
                          {enabled ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          {enabled ? "On" : `${feature.minTier.toUpperCase()}+`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!subscribed && !loading && (
            <motion.div
              {...fadeUp(0.4)}
              className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4"
            >
              <p className="text-sm text-muted-foreground">Unlock all features by upgrading your plan.</p>
              <Button asChild className="shrink-0 rounded-xl bg-primary text-background hover:bg-primary/90">
                <Link to="/account/plan">View plans</Link>
              </Button>
            </motion.div>
          )}
        </motion.section>

        {/* ── Plan limits ───────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0.1)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
            <BarChart3 className="h-5 w-5 text-primary" />
            Plan limits
          </h3>

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Loading limits…
            </div>
          ) : hasLimits ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {limits.map(([key, val]) => (
                <div key={key} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="mb-1 text-xs text-muted-foreground">{formatLimitKey(key)}</p>
                  <p className={`text-lg font-bold ${formatLimitValue(val) === "Unlimited" ? "text-primary" : ""}`}>
                    {formatLimitValue(val)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {status ? "No specific limits on your current plan." : "Could not load limits."}
            </p>
          )}
        </motion.section>

        {/* ── Subscription features list ────────────────────────────────────── */}
        {Array.isArray(status?.features) && status.features.length > 0 && (
          <motion.section {...fadeUp(0.16)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              Included with your plan
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {status.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>
        )}

      </div>
    </AccountShell>
  );
};

export default AccountUsage;
