import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAffiliate } from "@/hooks/useUserRoles";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
    Checking authorization…
  </div>
);

export const AffiliateProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading: authLoading } = useAuth();
  const location = useLocation();
  const { isAffiliate, loading: roleLoading } = useIsAffiliate();

  if (authLoading) return <LoadingScreen />;
  if (!session) {
    return <Navigate to="/auth" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }
  if (roleLoading) return <LoadingScreen />;

  if (!isAffiliate) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
        <div className="max-w-md w-full glass-card-strong rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Affiliate access required</h1>
          <p className="text-muted-foreground mb-6">
            Your affiliate application must be approved before you can access this dashboard.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/affiliate/apply" className="text-primary hover:underline">Apply now</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/" className="text-primary hover:underline">Return home</Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};
