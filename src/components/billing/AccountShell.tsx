import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, CreditCard, Home, LogOut, Settings, Shield, Sparkles, UserCircle } from "lucide-react";
import visorLogo from "@/assets/visor-logo.png";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";

const navItems = [
  { label: "Overview", href: "/account", icon: Home },
  { label: "Billing", href: "/account#billing", icon: CreditCard },
  { label: "Usage", href: "/account#usage", icon: BarChart3 },
  { label: "Security", href: "/account#security", icon: Shield },
  { label: "Plan", href: "/pricing", icon: Sparkles },
];

interface AccountShellProps {
  children: React.ReactNode;
}

const AccountShell = ({ children }: AccountShellProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();

  const logout = async () => {
    await clearSession();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] md:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 bg-white/[0.035] p-4 md:border-b-0 md:border-r">
          <Link to="/" className="mb-6 flex items-center gap-3">
            <img src={visorLogo} alt="VISOR" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-['Space_Grotesk'] text-lg font-bold">VISOR</p>
              <p className="text-xs text-muted-foreground">Account center</p>
            </div>
          </Link>

          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-background/40 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{session?.user.full_name || session?.user.username}</p>
              <p className="truncate text-xs text-muted-foreground">{session?.user.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.href.split("#")[0] && item.href !== "/pricing";
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition ${
                    active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-4">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <section className="min-w-0 p-5 sm:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Settings className="h-4 w-4" />
                Settings
              </p>
              <h1 className="text-3xl font-bold md:text-4xl">Account</h1>
            </div>
            <Button asChild variant="outline">
              <Link to="/">Back to site</Link>
            </Button>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
};

export default AccountShell;
