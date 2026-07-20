import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeoHead } from "@/components/seo/SeoHead";
import { toast } from "sonner";

const Profile = () => {
  const { profile, loading, update } = useProfile();
  const [form, setForm] = useState({
    display_name: "",
    avatar_url: "",
    country_code: "",
    preferred_currency: "NOK",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? "",
        avatar_url: profile.avatar_url ?? "",
        country_code: profile.country_code ?? "",
        preferred_currency: profile.preferred_currency ?? "NOK",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update.mutateAsync(form);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <>
      <SeoHead title="Profile — VISOR" description="Edit your VISOR profile." path="/account/profile" />
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="glass-card-strong rounded-2xl p-6 space-y-4 max-w-xl">
        <div>
          <Label>Email</Label>
          <Input value={profile?.email ?? ""} disabled />
          <p className="text-xs text-muted-foreground mt-1">Email is managed by your sign-in and can't be changed here.</p>
        </div>
        <div>
          <Label htmlFor="display_name">Display name</Label>
          <Input id="display_name" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="avatar_url">Avatar URL</Label>
          <Input id="avatar_url" value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country_code">Country code</Label>
            <Input id="country_code" maxLength={2} placeholder="NO" value={form.country_code} onChange={(e) => setForm({ ...form, country_code: e.target.value.toUpperCase() })} />
          </div>
          <div>
            <Label htmlFor="preferred_currency">Preferred currency</Label>
            <Input id="preferred_currency" maxLength={3} value={form.preferred_currency} onChange={(e) => setForm({ ...form, preferred_currency: e.target.value.toUpperCase() })} />
          </div>
        </div>
        <Button type="submit" disabled={loading || update.isPending}>
          {update.isPending ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </>
  );
};

export default Profile;
