import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const debug = (...args: unknown[]) => {
  if (import.meta.env.DEV) console.debug("[auth]", ...args);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const hydratedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const finishHydration = (s: Session | null, reason: string) => {
      if (!mounted) return;
      setSession(s);
      if (!hydratedRef.current) {
        hydratedRef.current = true;
        setLoading(false);
        debug("hydrated via", reason, "hasSession=", !!s);
      }
    };

    // Register listener FIRST so we never miss INITIAL_SESSION during hydration.
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      debug("event", event, "hasSession=", !!s);
      if (!mounted) return;

      // During initial hydration, only trust events that actually confirm state.
      // Ignore transient nulls that arrive before INITIAL_SESSION resolves.
      if (!hydratedRef.current) {
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          finishHydration(s, `event:${event}`);
        }
        return;
      }

      // Post-hydration: reflect all events.
      setSession(s);
    });

    // Fallback in case INITIAL_SESSION never fires (older SDKs / edge cases).
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!hydratedRef.current) finishHydration(data.session, "getSession");
      })
      .catch((err) => {
        debug("getSession error", err);
        if (!hydratedRef.current) finishHydration(null, "getSession:error");
      });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    loading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    },
    signUp: async (email, password, displayName) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: displayName ? { display_name: displayName } : undefined,
        },
      });
      return { error };
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
    resetPassword: async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    },
    updatePassword: async (password) => {
      const { error } = await supabase.auth.updateUser({ password });
      return { error };
    },
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
