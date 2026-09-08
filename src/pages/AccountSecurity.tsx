import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle, LogOut, Mail, Shield, UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";
import AccountShell from "@/components/billing/AccountShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const AccountSecurity = () => {
  const navigate = useNavigate();
  const session  = getSession();

  useEffect(() => {
    if (!session) { navigate(`/login?redirect=${encodeURIComponent("/account/security")}`); }
  }, [navigate, session]);

  const signOut = async () => { await clearSession(); navigate("/"); };

  if (!session) return null;

  return (
    <AccountShell>
      <div className="space-y-5">

        {/* ── Account identity ──────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
            <UserCircle className="h-5 w-5 text-primary" />
            Account identity
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="mb-1 text-xs text-muted-foreground">Full name</p>
              <p className="font-semibold">{session.user.full_name || "—"}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="mb-1 text-xs text-muted-foreground">Username</p>
              <p className="font-semibold">@{session.user.username}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 sm:col-span-2">
              <p className="mb-1 text-xs text-muted-foreground">Email address</p>
              <p className="flex items-center gap-2 font-semibold">
                <Mail className="h-4 w-4 text-primary" />
                {session.user.email}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Session ───────────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0.08)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
            <Shield className="h-5 w-5 text-primary" />
            Active session
          </h3>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div>
              <p className="text-sm font-semibold">This browser</p>
              <p className="text-xs text-muted-foreground">Signed in as {session.user.email}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Active
            </div>
          </div>
          <div className="mt-3">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-white/15 hover:bg-white/8"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sign out of this session
            </Button>
          </div>
        </motion.section>

        {/* ── Danger zone ───────────────────────────────────────────────────── */}
        <motion.section {...fadeUp(0.16)} className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger zone
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Permanently deleting your account removes all your data, workouts, and subscription from VISOR. This action cannot be undone.
          </p>
          <Button asChild variant="outline" className="gap-2 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
            <Link to="/delete-account">Delete my account</Link>
          </Button>
        </motion.section>

      </div>
    </AccountShell>
  );
};

export default AccountSecurity;
