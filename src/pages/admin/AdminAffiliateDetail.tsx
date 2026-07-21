import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { SeoHead } from "@/components/seo/SeoHead";

type App = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  country_code: string;
  primary_platform: string;
  profile_url: string;
  follower_range: string;
  fitness_niche: string;
  audience_countries: string[];
  reason: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  internal_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
};

type Affiliate = {
  id: string;
  status: "active" | "suspended";
  approved_at: string;
  suspended_at: string | null;
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="mt-1 text-sm">{value ?? "—"}</div>
  </div>
);

const AdminAffiliateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const [notes, setNotes] = useState("");

  const { data: app, isLoading } = useQuery({
    queryKey: ["admin_app", id],
    enabled: !!id,
    queryFn: async (): Promise<App | null> => {
      const { data, error } = await supabase
        .from("affiliate_applications" as never)
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as App) ?? null;
    },
  });

  const { data: affiliate } = useQuery({
    queryKey: ["admin_app_affiliate", app?.user_id],
    enabled: !!app?.user_id,
    queryFn: async (): Promise<Affiliate | null> => {
      const { data, error } = await supabase
        .from("affiliates" as never)
        .select("id, status, approved_at, suspended_at")
        .eq("user_id", app!.user_id!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Affiliate) ?? null;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async (new_status: App["status"]) => {
      const { error } = await supabase.rpc("admin_update_application" as never, {
        _app_id: id!,
        _new_status: new_status,
        _notes: notes || null,
      } as never);
      if (error) throw error;
    },
    onSuccess: (_d, status) => {
      toast({ title: `Application ${status}` });
      qc.invalidateQueries({ queryKey: ["admin_app", id] });
      qc.invalidateQueries({ queryKey: ["admin_affiliate_apps"] });
    },
    onError: (e: Error) => toast({ title: "Action failed", description: e.message, variant: "destructive" }),
  });

  const toggleAffiliate = useMutation({
    mutationFn: async (status: Affiliate["status"]) => {
      const { error } = await supabase.rpc("admin_set_affiliate_status" as never, {
        _affiliate_id: affiliate!.id,
        _status: status,
        _reason: notes || null,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Affiliate updated" });
      qc.invalidateQueries({ queryKey: ["admin_app_affiliate", app?.user_id] });
    },
    onError: (e: Error) => toast({ title: "Action failed", description: e.message, variant: "destructive" }),
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!app) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Not found</div>;

  return (
    <>
      <SeoHead title={`${app.full_name} | VISOR Admin`} description="Affiliate application review" path={`/admin/affiliates/${app.id}`} />
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/admin/affiliates" className="text-sm text-primary hover:underline">← All applications</Link>

          <header className="mt-4 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{app.full_name}</h1>
              <p className="text-muted-foreground mt-1">
                Status: <span className="font-medium text-foreground capitalize">{app.status}</span>
                {affiliate && <span className="ml-3">Affiliate: <span className="capitalize text-foreground">{affiliate.status}</span></span>}
              </p>
            </div>
          </header>

          <section className="glass-card rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Field label="Email" value={app.email} />
            <Field label="Country" value={app.country_code} />
            <Field label="Platform" value={app.primary_platform} />
            <Field label="Profile" value={<a href={app.profile_url} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">{app.profile_url}</a>} />
            <Field label="Followers" value={app.follower_range} />
            <Field label="Niche" value={app.fitness_niche} />
            <Field label="Audience countries" value={app.audience_countries?.join(", ") || "—"} />
            <Field label="Submitted" value={new Date(app.created_at).toLocaleString()} />
            <div className="sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Reason</div>
              <p className="mt-1 text-sm whitespace-pre-wrap">{app.reason}</p>
            </div>
            {app.internal_notes && (
              <div className="sm:col-span-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Previous notes</div>
                <p className="mt-1 text-sm whitespace-pre-wrap">{app.internal_notes}</p>
              </div>
            )}
          </section>

          <section className="glass-card-strong rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold">Review</h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes (optional)"
              rows={3}
              maxLength={2000}
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => updateStatus.mutate("reviewing")} disabled={updateStatus.isPending}>Mark reviewing</Button>
              <Button onClick={() => updateStatus.mutate("approved")} disabled={updateStatus.isPending}>Approve</Button>
              <Button variant="destructive" onClick={() => updateStatus.mutate("rejected")} disabled={updateStatus.isPending}>Reject</Button>
            </div>

            {affiliate && (
              <div className="pt-4 border-t border-border/60">
                <h3 className="font-semibold mb-3">Affiliate controls</h3>
                <div className="flex flex-wrap gap-2">
                  {affiliate.status === "active" ? (
                    <Button variant="destructive" onClick={() => toggleAffiliate.mutate("suspended")} disabled={toggleAffiliate.isPending}>Suspend affiliate</Button>
                  ) : (
                    <Button onClick={() => toggleAffiliate.mutate("active")} disabled={toggleAffiliate.isPending}>Reactivate affiliate</Button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminAffiliateDetail;
