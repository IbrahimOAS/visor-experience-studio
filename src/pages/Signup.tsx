import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, UserPlus } from "lucide-react";
import AuthLayout from "@/components/billing/AuthLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildSignupProfile, signUpWithFirebaseEmail } from "@/lib/auth";
import { completeFirebaseSignup } from "@/lib/visor-api";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get("redirect") ?? "/pricing";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firebaseToken = await signUpWithFirebaseEmail(email, password);
      await completeFirebaseSignup(firebaseToken, buildSignupProfile(email, fullName));
      // Track signup with FirstPromoter so the referrer gets credited
      if (typeof window !== "undefined" && (window as any).fpr) {
        (window as any).fpr("referral", { email });
      }
      navigate(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your VISOR account" subtitle="Your web subscription will unlock the same account in the app.">
      <form onSubmit={onSubmit} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
