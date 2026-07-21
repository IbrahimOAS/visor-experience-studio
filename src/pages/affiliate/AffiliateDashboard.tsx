import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { SeoHead } from "@/components/seo/SeoHead";
import { Link } from "react-router-dom";

type Payload = {
  affiliate: {
    id: string;
    status: string;
    display_name: string | null;
    country_code: string | null;
    commission_model: string;
    approved_at: string;
    suspended_at: string | null;
  };
  codes: Array<{ id: string; code: string; active: boolean; expires_at: string | null; created_at: string }>;
  clicks_total: number;
};

const Stat = ({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) => (
  <div className="glass-card rounded-xl p-5">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
    {note && <div className="text-xs text-muted-foreground mt-1">{note}</div>}
  </div>
);

const AffiliateDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my_affiliate"],
    queryFn: async (): Promise<Payload | null> => {
      const { data, error } = await supabase.rpc("get_my_affiliate" as never);
      if (error) throw error;
      return (data as Payload) ?? null;
    },
  });

  const primary = data?.codes?.[0];
  const referralUrl = primary ? `${window.location.origin}/r/${primary.code}` : "";

  const copy = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    toast({ title: "Copied", description: "Referral link copied to clipboard." });
  };

  return (
    <>
      <SeoHead title="Affiliate Dashboard | VISOR" description="Manage your VISOR affiliate referral link and see click activity." path="/affiliate" />
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Status: <span className="font-medium text-foreground capitalize">{data?.affiliate.status ?? "—"}</span>
              </p>
            </div>
            <Link to="/support" className="text-sm text-primary hover:underline">Need help? Contact support</Link>
          </header>

          {isLoading && <p className="text-muted-foreground">Loading dashboard…</p>}
          {error && <p className="text-destructive">Failed to load dashboard.</p>}

          {data && (
            <>
              <section className="glass-card-strong rounded-2xl p-6 mb-8">
                <div className="text-sm text-muted-foreground mb-2">Your referral link</div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    readOnly
                    value={referralUrl}
                    className="flex-1 bg-background/40 border border-border rounded-lg px-4 py-3 font-mono text-sm"
                  />
                  <Button onClick={copy} disabled={!referralUrl}>Copy link</Button>
                </div>
                {primary && (
                  <div className="text-xs text-muted-foreground mt-3">
                    Code: <span className="font-mono">{primary.code}</span>
                    {!primary.active && <span className="ml-2 text-destructive">(inactive)</span>}
                  </div>
                )}
              </section>

              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Stat label="Total clicks" value={data.clicks_total} />
                <Stat label="Registrations" value="—" note="Available after payment integration" />
                <Stat label="Paid conversions" value="—" note="Available after payment integration" />
                <Stat label="Commission" value="—" note="Available after payment integration" />
              </section>

              <section className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold mb-2">Coming soon</h2>
                <p className="text-sm text-muted-foreground">
                  Payouts, commission percentages, and conversion tracking activate once VISOR's
                  payment integration goes live. Your clicks and attributions are already being
                  recorded and will be honored retroactively.
                </p>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default AffiliateDashboard;
