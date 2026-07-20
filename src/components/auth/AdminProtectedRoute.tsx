import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRoles";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
    Checking authorization…
  </div>
);

export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading: authLoading } = useAuth();
  const location = useLocation();
  const { isAdmin, loading: roleLoading } = useIsAdmin();

  if (authLoading) return <LoadingScreen />;
  if (!session) {
    return <Navigate to="/auth" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }
  if (roleLoading) return <LoadingScreen />;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
        <div className="max-w-md w-full glass-card-strong rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Unauthorized</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the VISOR admin area. If you believe this is a
            mistake, contact a system administrator.
          </p>
          <Link to="/" className="text-primary hover:underline">Return home</Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};
