import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, CreditCard, Home, LogOut, Settings,
  Shield, Sparkles, UserCircle, ChevronRight,
} from "lucide-react";
import visorLogo from "@/assets/visor-logo.png";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";

const navItems = [
  { label: "Overview",  href: "/account",          icon: Home       },
  { label: "Billing",   href: "/account#billing",   icon: CreditCard },
  { label: "Usage",     href: "/account#usage",     icon: BarChart3  },
  { label: "Security",  href: "/account#security",  icon: Shield     },
  { label: "Plan",      href: "/pricing",            icon: Sparkles   },
];

interface AccountShellProps { children: React.ReactNode }

const AccountShell = ({ children }: AccountShellProps) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const session   = getSession();

  const logout = async () => { await clearSession(); navigate("/"); };

  return (
    <main className="min-h-screen bg-background">
      {/* subtle full-page ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-[1400px] md:grid-cols-[260px_1fr]">

        {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
        <aside className="sticky top-0 flex h-screen flex-col border-r border-white/8 bg-white/[0.02] px-4 py-6 backdrop-blur-xl">

          {/* Logo */}
          <Link to="/" className="mb-8 flex items-center gap-3 group">
            <img src={visorLogo} alt="VISOR" className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-110" />
            <div>
              <p className="font-['Space_Grotesk'] text-lg font-bold leading-none">VISOR</p>
              <p className="text-xs text-primary/70 font-medium tracking-wide">Account centre</p>
            </div>
          </Link>

          {/* User card */}
          <div className="mb-6 relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-transparent p-[1px]">
            <div className="rounded-2xl bg-background/60 backdrop-blur-sm p-3 flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/30 text-primary">
                  <UserCircle className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{session?.user.full_name || session?.user.username}</p>
                <p className="truncate text-xs text-muted-foreground">{session?.user.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon   = item.icon;
              const active = location.pathname === item.href.split("#")[0] && item.href !== "/pricing";
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary/12 text-primary shadow-[inset_0_0_0_1px_hsl(204,100%,73%,0.2)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {active && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
                </Link>
              );
            })}
          </nav>

          {/* Sign out */}
          <div className="border-t border-white/8 pt-4">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────────────────── */}
        <section className="min-w-0 px-6 py-8 sm:px-10 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between gap-4"
          >
            <div>
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Settings className="h-3.5 w-3.5" />
                Account
              </p>
              <h1 className="text-3xl font-bold md:text-4xl">Your dashboard</h1>
            </div>
            <Button asChild variant="outline" className="rounded-xl border-white/15 hover:bg-white/8">
              <Link to="/">← Site</Link>
            </Button>
          </motion.div>

          {children}
        </section>
      </div>
    </main>
  );
};

export default AccountShell;
