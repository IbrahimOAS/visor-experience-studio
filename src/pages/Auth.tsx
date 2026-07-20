import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SeoHead from "@/components/seo/SeoHead";
import { toast } from "sonner";

/** Only allow same-origin relative paths for post-login redirect. */
const safeRedirect = (raw: unknown): string => {
  if (typeof raw !== "string") return "/account";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/account";
  return raw;
};

const Auth = () => {
  const { session, loading, signIn, signUp, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = safeRedirect((location.state as { from?: string } | null)?.from);

  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate(from, { replace: true });
  }, [loading, session, from, navigate]);

  if (loading) return null;
  if (session) return <Navigate to={from} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await signUp(email, password, displayName || undefined);
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast.success("Password reset link sent. Check your inbox.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Sign in — VISOR"
        description="Sign in or create your VISOR account to manage your profile and subscription."
        canonical="https://visorfitness.com/auth"
        noindex
      />
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md glass-card-strong rounded-2xl p-8">
          <div className="mb-8 text-center">
            <Link to="/" className="text-2xl font-bold text-gradient">VISOR</Link>
            <p className="text-muted-foreground text-sm mt-2">Your account</p>
          </div>

          <Tabs value={mode === "reset" ? "signin" : mode} onValueChange={(v) => setMode(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" />
            <TabsContent value="signup" />
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="displayName">Display name</Label>
                <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="name" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            {mode !== "reset" && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === "reset" ? (
              <button className="text-primary hover:underline" onClick={() => setMode("signin")}>
                Back to sign in
              </button>
            ) : (
              <button className="text-muted-foreground hover:text-primary" onClick={() => setMode("reset")}>
                Forgot your password?
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
