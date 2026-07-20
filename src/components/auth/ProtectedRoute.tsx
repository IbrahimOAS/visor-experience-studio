import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * Guards a route: unauthenticated visitors are redirected to /auth,
 * with the intended path stored in navigation state (not URL) to
 * prevent open-redirect abuse. Only same-origin relative paths are
 * ever followed post-login.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session) {
    const from = `${location.pathname}${location.search}`;
    return <Navigate to="/auth" replace state={{ from }} />;
  }

  return <>{children}</>;
};
