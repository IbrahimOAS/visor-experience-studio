import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, LogIn } from "lucide-react";
import AuthLayout from "@/components/billing/AuthLayout";
import PasswordField from "@/components/billing/PasswordField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeFirebaseLogin, completeGoogleLogin } from "@/lib/visor-api";
import { signInWithFirebaseEmail, signInWithGooglePopup } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get("redirect") ?? "/account";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firebaseToken = await signInWithFirebaseEmail(email, password);
      await completeFirebaseLogin(firebaseToken);
      navigate(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const googleToken = await signInWithGooglePopup();
      await completeGoogleLogin(googleToken);
      navigate(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in with the same VISOR account you use in the mobile app.">
      <div className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="button" variant="outline" className="h-11 w-full" onClick={onGoogleSignIn} disabled={loading}>
          <span className="text-base font-bold">G</span>
          Continue with Google
        </Button>
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
          <span className="h-px flex-1 bg-white/10" />
          Email
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-5 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordField
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={loading}>
          <LogIn className="h-4 w-4" />
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to VISOR?{" "}
        <Link to={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
