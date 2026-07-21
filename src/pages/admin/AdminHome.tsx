import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/SeoHead";

interface Metrics {
  total_profiles: number;
  total_coach_applications: number;
  total_support_submissions: number;
  total_active_entitlements: number;
}

const MetricCard = ({ label, value }: { label: string; value: number | string }) => (
  <div className="glass-card rounded-xl p-6">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-3xl font-bold mt-2">{value}</div>
  </div>
);

const AdminHome = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin_metrics"],
    queryFn: async (): Promise<Metrics> => {
      const { data, error } = await supabase.rpc("get_admin_dashboard_metrics");
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return {
        total_profiles: Number(row?.total_profiles ?? 0),
        total_coach_applications: Number(row?.total_coach_applications ?? 0),
        total_support_submissions: Number(row?.total_support_submissions ?? 0),
        total_active_entitlements: Number(row?.total_active_entitlements ?? 0),
      };
    },
  });

  const displayName = profile?.display_name || user?.email || "Admin";
  const backendStatus = error ? "Error" : isLoading ? "Loading…" : "Connected";

  return (
    <>
      <SeoHead title="VISOR Admin" description="Internal VISOR admin console." path="/admin" />
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold">VISOR Admin</h1>
              <p className="text-muted-foreground mt-1">Signed in as {displayName}</p>
            </div>
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
          </header>

          <section className="mb-8">
            <div className="glass-card rounded-xl p-4 flex items-center gap-3">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  error ? "bg-destructive" : isLoading ? "bg-muted-foreground" : "bg-emerald-500"
                }`}
                aria-hidden
              />
              <span className="text-sm">Backend status: {backendStatus}</span>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Total profiles" value={error ? 0 : data?.total_profiles ?? 0} />
            <MetricCard label="Coach applications" value={error ? 0 : data?.total_coach_applications ?? 0} />
            <MetricCard label="Support submissions" value={error ? 0 : data?.total_support_submissions ?? 0} />
            <MetricCard label="Active entitlements" value={error ? 0 : data?.total_active_entitlements ?? 0} />
          </section>

          {error && (
            <p className="text-sm text-destructive mt-6">
              Unable to load metrics. {error instanceof Error ? error.message : ""}
            </p>
          )}

          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Manage</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/admin/affiliates" className="glass-card rounded-xl p-5 hover:bg-white/5 transition">
                <div className="font-semibold">Affiliate applications</div>
                <div className="text-sm text-muted-foreground mt-1">Review, approve, or reject affiliates.</div>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminHome;
