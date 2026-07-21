import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SeoHead } from "@/components/seo/SeoHead";

type AppRow = {
  id: string;
  full_name: string;
  email: string;
  country_code: string;
  primary_platform: string;
  status: string;
  created_at: string;
};

const statusColor: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-300",
  reviewing: "bg-sky-500/20 text-sky-300",
  approved: "bg-emerald-500/20 text-emerald-300",
  rejected: "bg-destructive/20 text-destructive",
};

const AdminAffiliates = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin_affiliate_apps"],
    queryFn: async (): Promise<AppRow[]> => {
      const { data, error } = await supabase
        .from("affiliate_applications" as never)
        .select("id, full_name, email, country_code, primary_platform, status, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data as unknown as AppRow[]) ?? [];
    },
  });

  return (
    <>
      <SeoHead title="Affiliate Applications | VISOR Admin" description="Review VISOR affiliate applications." path="/admin/affiliates" />
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Affiliate Applications</h1>
              <p className="text-muted-foreground mt-1">Review, approve, or reject affiliate requests.</p>
            </div>
            <Link to="/admin" className="text-sm text-primary hover:underline">← Back to admin</Link>
          </header>

          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr><td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>
                )}
                {error && (
                  <tr><td colSpan={7} className="px-4 py-6 text-center text-destructive">Failed to load.</td></tr>
                )}
                {data?.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">No applications yet.</td></tr>
                )}
                {data?.map((row) => (
                  <tr key={row.id} className="border-t border-border/50">
                    <td className="px-4 py-3">{row.full_name}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">{row.country_code}</td>
                    <td className="px-4 py-3">{row.primary_platform}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColor[row.status] ?? "bg-white/10"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(row.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/admin/affiliates/${row.id}`} className="text-primary hover:underline">Open</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminAffiliates;
