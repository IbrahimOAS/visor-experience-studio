import { useState } from "react";
import { z } from "zod";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { SeoHead } from "@/components/seo/SeoHead";

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  country_code: z.string().trim().min(2).max(3),
  primary_platform: z.string().trim().min(1).max(60),
  profile_url: z.string().trim().url().max(500),
  follower_range: z.string().trim().min(1).max(60),
  fitness_niche: z.string().trim().min(1).max(120),
  audience_countries: z.string().trim().max(500).optional().default(""),
  reason: z.string().trim().min(20).max(2000),
  accepted_terms: z.literal(true, { message: "You must accept the terms" }),
});

const AffiliateApply = () => {
  const { session, user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!session) return <Navigate to="/auth" replace state={{ from: "/affiliate/apply" }} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? user?.email ?? ""),
      country_code: String(fd.get("country_code") ?? "").toUpperCase(),
      primary_platform: String(fd.get("primary_platform") ?? ""),
      profile_url: String(fd.get("profile_url") ?? ""),
      follower_range: String(fd.get("follower_range") ?? ""),
      fitness_niche: String(fd.get("fitness_niche") ?? ""),
      audience_countries: String(fd.get("audience_countries") ?? ""),
      reason: String(fd.get("reason") ?? ""),
      accepted_terms: fd.get("accepted_terms") === "on",
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast({ title: "Please review your application", description: parsed.error.issues[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const payload = {
      ...parsed.data,
      audience_countries: parsed.data.audience_countries
        .split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { error } = await supabase.rpc("submit_affiliate_application" as never, { payload } as never);
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Application submitted", description: "We'll review and reach out soon." });
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
        <div className="max-w-md w-full glass-card-strong rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Application received</h1>
          <p className="text-muted-foreground mb-6">
            Thanks — the VISOR team will review your application and respond by email.
          </p>
          <Link to="/" className="text-primary hover:underline">Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SeoHead
        title="Become a VISOR Affiliate"
        description="Apply to join the VISOR Affiliate Program and earn by referring users to the VISOR fitness experience."
        path="/affiliate/apply"
      />
      <main className="min-h-screen bg-background text-foreground px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Join the VISOR Affiliate Program</h1>
            <p className="text-muted-foreground mt-2">
              Share VISOR with your audience. Applications are reviewed manually.
            </p>
          </header>
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Full name</Label>
                <Input id="full_name" name="full_name" required maxLength={120} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required defaultValue={user?.email ?? ""} maxLength={255} />
              </div>
              <div>
                <Label htmlFor="country_code">Country (ISO code)</Label>
                <Input id="country_code" name="country_code" placeholder="US" required minLength={2} maxLength={3} />
              </div>
              <div>
                <Label htmlFor="primary_platform">Primary platform</Label>
                <Input id="primary_platform" name="primary_platform" placeholder="Instagram / YouTube / TikTok" required maxLength={60} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="profile_url">Profile URL</Label>
                <Input id="profile_url" name="profile_url" type="url" placeholder="https://" required maxLength={500} />
              </div>
              <div>
                <Label htmlFor="follower_range">Follower range</Label>
                <Input id="follower_range" name="follower_range" placeholder="10k–50k" required maxLength={60} />
              </div>
              <div>
                <Label htmlFor="fitness_niche">Fitness niche</Label>
                <Input id="fitness_niche" name="fitness_niche" placeholder="Strength, hybrid, weight loss…" required maxLength={120} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="audience_countries">Top audience countries (comma-separated)</Label>
                <Input id="audience_countries" name="audience_countries" placeholder="US, UK, DE" maxLength={500} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="reason">Why do you want to represent VISOR?</Label>
                <Textarea id="reason" name="reason" required minLength={20} maxLength={2000} rows={5} />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm">
              <Checkbox id="accepted_terms" name="accepted_terms" required />
              <span>
                I agree to the VISOR Affiliate Terms and confirm the information above is accurate.
              </span>
            </label>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting…" : "Submit application"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AffiliateApply;
