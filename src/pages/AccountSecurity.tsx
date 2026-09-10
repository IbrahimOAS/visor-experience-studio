import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, CheckCircle2, Loader2, LogOut,
  Mail, Shield, Trash2, UserCircle, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearSession, getSession } from "@/lib/auth";
import { requestAccountDeletion } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const WHAT_GETS_DELETED = [
  "All workouts, training history and personal records",
  "AI-generated plans, food scans and body projections",
  "Subscription access and billing history",
  "Profile photos, baseline data and progress tracking",
  "All account credentials — this email cannot be re-used",
];

const AccountSecurity = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getSession()) { navigate(`/login?redirect=${encodeURIComponent("/account/security")}`); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const session = getSession();

  // ── Sign out ──────────────────────────────────────────────────────────────
  const signOut = async () => { await clearSession(); navigate("/"); };

  // ── Delete account modal state ────────────────────────────────────────────
  const [modalOpen, setModalOpen]     = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [understood, setUnderstood]   = useState(false);
  const [deleting, setDeleting]       = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setConfirmEmail("");
    setUnderstood(false);
    setDeleteError("");
    setModalOpen(true);
    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const closeModal = () => {
    if (deleting) return;
    setModalOpen(false);
  };

  const emailMatches = confirmEmail.trim().toLowerCase() === session?.user.email?.toLowerCase();
  const canDelete    = emailMatches && understood && !deleting;

  const handleDelete = async () => {
    if (!canDelete) return;
    setDeleteError("");
    setDeleting(true);
    try {
      await requestAccountDeletion();
      await clearSession();
      navigate("/?deleted=1");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Could not process deletion. Please try again.");
      setDeleting(false);
    }
  };

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

        {/* ── Active session ────────────────────────────────────────────────── */}
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
          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger zone
          </h3>
          <p className="mb-5 text-sm text-muted-foreground">
            Permanently deletes your account and all associated data. Your account is deactivated immediately and fully removed after a <strong className="text-foreground">30-day recovery window</strong>.
          </p>
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
            onClick={openModal}
          >
            <Trash2 className="h-4 w-4" />
            Delete my account
          </Button>
        </motion.section>

      </div>

      {/* ── Deletion confirmation modal ────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Dialog */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative w-full max-w-md rounded-2xl border border-red-500/25 bg-[#0e0e0e] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={closeModal}
                  disabled={deleting}
                  className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/8 hover:text-foreground disabled:opacity-40"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/25">
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Delete your account</h2>
                      <p className="text-xs text-muted-foreground">This action cannot be undone</p>
                    </div>
                  </div>

                  {/* What gets deleted */}
                  <div className="mb-5 rounded-xl border border-red-500/15 bg-red-500/[0.06] p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-red-400">
                      The following will be permanently deleted
                    </p>
                    <ul className="space-y-2">
                      {WHAT_GETS_DELETED.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border border-red-500/40 bg-red-500/15 flex items-center justify-center">
                            <span className="h-1 w-1 rounded-full bg-red-400" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Email confirmation */}
                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Type <span className="font-mono text-foreground">{session.user.email}</span> to confirm
                    </label>
                    <input
                      ref={inputRef}
                      type="email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && canDelete) handleDelete(); }}
                      placeholder="Enter your email address"
                      disabled={deleting}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 disabled:opacity-50"
                    />
                    {confirmEmail.length > 0 && (
                      <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${emailMatches ? "text-emerald-400" : "text-red-400"}`}>
                        {emailMatches
                          ? <><CheckCircle2 className="h-3 w-3" /> Email confirmed</>
                          : <><X className="h-3 w-3" /> Email does not match</>
                        }
                      </p>
                    )}
                  </div>

                  {/* Understand checkbox */}
                  <label className="mb-5 flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={understood}
                        onChange={(e) => setUnderstood(e.target.checked)}
                        disabled={deleting}
                        className="peer sr-only"
                      />
                      <div className="h-4 w-4 rounded border border-white/20 bg-white/5 transition peer-checked:border-red-500/60 peer-checked:bg-red-500/20" />
                      {understood && (
                        <CheckCircle2 className="absolute inset-0 h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I understand this will permanently delete my account and all data after the 30-day recovery window
                    </span>
                  </label>

                  {/* Error */}
                  {deleteError && (
                    <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                      <p className="text-xs text-red-400">{deleteError}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/15 hover:bg-white/8"
                      onClick={closeModal}
                      disabled={deleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="gap-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                      onClick={handleDelete}
                      disabled={!canDelete}
                    >
                      {deleting
                        ? <><Loader2 className="h-4 w-4 animate-spin" /> Deleting account…</>
                        : <><Trash2 className="h-4 w-4" /> Permanently delete account</>
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AccountShell>
  );
};

export default AccountSecurity;
