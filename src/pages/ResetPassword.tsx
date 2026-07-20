import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeoHead } from "@/components/seo/SeoHead";
import { toast } from "sonner";

const ResetPassword = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated.");
    navigate("/account", { replace: true });
  };

  return (
    <>
      <SeoHead title="Reset password — VISOR" description="Set a new password for your VISOR account." path="/reset-password" />
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-md glass-card-strong rounded-2xl p-8 space-y-4">
          <h1 className="text-2xl font-bold">Set a new password</h1>
          <div>
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Updating…" : "Update password"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
