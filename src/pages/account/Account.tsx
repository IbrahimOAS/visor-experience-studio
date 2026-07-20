import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useEntitlements } from "@/hooks/useEntitlements";
import SeoHead from "@/components/seo/SeoHead";

const Account = () => {
  const { profile, loading } = useProfile();
  const { activeEntitlements, loading: entLoading } = useEntitlements();

  return (
    <>
      <SeoHead title="Account — VISOR" description="Your VISOR account overview." canonical="https://visorfitness.com/account" noindex />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}</h1>
          <p className="text-muted-foreground mt-1">Manage your VISOR account and subscription.</p>
        </div>

        <section className="glass-card-strong rounded-2xl p-6">
          <h2 className="font-semibold mb-3">Profile</h2>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <dl className="grid sm:grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Email</dt><dd>{profile?.email ?? "—"}</dd>
              <dt className="text-muted-foreground">Display name</dt><dd>{profile?.display_name ?? "—"}</dd>
              <dt className="text-muted-foreground">Country</dt><dd>{profile?.country_code ?? "—"}</dd>
              <dt className="text-muted-foreground">Preferred currency</dt><dd>{profile?.preferred_currency ?? "—"}</dd>
            </dl>
          )}
          <div className="mt-4"><Link to="/account/profile" className="text-primary text-sm hover:underline">Edit profile →</Link></div>
        </section>

        <section className="glass-card-strong rounded-2xl p-6">
          <h2 className="font-semibold mb-3">Subscription</h2>
          {entLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : activeEntitlements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active subscription on record.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {activeEntitlements.map((e) => (
                <li key={e.id} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{e.tier}</div>
                    <div className="text-muted-foreground text-xs">via {e.source} · {e.status}</div>
                  </div>
                  {e.expires_at && <div className="text-muted-foreground text-xs">renews {new Date(e.expires_at).toLocaleDateString()}</div>}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4"><Link to="/account/billing" className="text-primary text-sm hover:underline">Manage billing →</Link></div>
        </section>
      </div>
    </>
  );
};

export default Account;
