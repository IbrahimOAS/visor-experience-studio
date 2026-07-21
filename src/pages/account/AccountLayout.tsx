import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useUserRoles";
import { Button } from "@/components/ui/button";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-lg text-sm transition-colors ${
    isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
  }`;

export const AccountLayout = () => {
  const { signOut, user } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gradient">VISOR</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-[220px_1fr] gap-8">
        <nav className="flex md:flex-col gap-2">
          <NavLink to="/account" end className={linkClass}>Overview</NavLink>
          <NavLink to="/account/profile" className={linkClass}>Profile</NavLink>
          <NavLink to="/account/billing" className={linkClass}>Billing</NavLink>
          {!adminLoading && isAdmin && (
            <NavLink to="/admin" className={linkClass}>Admin Dashboard</NavLink>
          )}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AccountLayout;
