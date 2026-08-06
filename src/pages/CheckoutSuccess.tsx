import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";

const CheckoutSuccess = () => {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setStatus(await getSubscriptionStatus());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const timers = [2500, 6000, 10000].map((delay) => window.setTimeout(refresh, delay));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const synced = Boolean(status?.is_subscribed && status?.tier_type !== "free");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="glass-card-strong max-w-lg rounded-2xl p-8 text-center">
        {synced ? (
          <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-primary" />
        ) : (
          <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin text-primary" />
        )}
        <h1 className="text-3xl font-bold">{synced ? "Subscription confirmed" : "Syncing subscription"}</h1>
        <p className="mt-3 text-muted-foreground">
          {synced
            ? `${status?.tier_name} is active on your VISOR account.`
            : "Stripe is sending the payment confirmation to VISOR. This can take a few seconds."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/account">Go to account</Link>
          </Button>
          <Button variant="outline" onClick={refresh} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Check again
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CheckoutSuccess;
