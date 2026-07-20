import { useEntitlements } from "@/hooks/useEntitlements";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/seo/SeoHead";

const Billing = () => {
  const { entitlements, activeEntitlements, loading } = useEntitlements();

  return (
    <>
      <SeoHead title="Billing — VISOR" description="Your VISOR billing and subscription." canonical="https://visorfitness.com/account/billing" noindex />
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <section className="glass-card-strong rounded-2xl p-6 mb-6">
        <h2 className="font-semibold mb-3">Current subscription</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : activeEntitlements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active subscription on record.</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {activeEntitlements.map((e) => (
              <li key={e.id} className="border-b border-border/40 pb-3 last:border-0">
                <div className="flex justify-between">
                  <div className="font-medium">{e.tier}</div>
                  <div className="text-muted-foreground text-xs uppercase">{e.status}</div>
                </div>
                <div className="text-muted-foreground text-xs mt-1">Source: {e.source}</div>
                {e.expires_at && (
                  <div className="text-muted-foreground text-xs mt-1">
                    {e.status === "cancelled" ? "Expires" : "Renews"} {new Date(e.expires_at).toLocaleDateString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" disabled title="Available after Stripe Phase 2">Manage billing</Button>
          <Button variant="outline" disabled title="Available after Stripe Phase 2">Upgrade</Button>
          <Button variant="outline" disabled title="Available after Stripe Phase 2">Cancel subscription</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          These controls are disabled until secure Stripe checkout is enabled in Phase 2.
        </p>
      </section>

      <section className="glass-card-strong rounded-2xl p-6">
        <h2 className="font-semibold mb-3">Order history</h2>
        {entitlements.length === 0 ? (
          <p className="text-sm text-muted-foreground">Order history will appear here once purchases are made.</p>
        ) : (
          <p className="text-sm text-muted-foreground">Detailed order history coming with Stripe Phase 2.</p>
        )}
      </section>
    </>
  );
};

export default Billing;
