import { AuthSession, clearSession, getSession, saveSession } from "@/lib/auth";

const API_BASE_URL =
  import.meta.env.VITE_VISOR_API_BASE_URL?.replace(/\/$/, "") ?? "https://api.visorfitness.com/api";

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

const request = async <T>(path: string, options: ApiOptions = {}): Promise<T> => {
  const session = getSession();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.auth !== false && session?.access) {
    headers.set("Authorization", `Bearer ${session.access}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      await clearSession();
    }
    throw new Error(data.error ?? data.detail ?? "Request failed");
  }

  return data as T;
};

export interface SubscriptionStatus {
  is_subscribed: boolean;
  tier_type: string;
  tier_name: string;
  status: string;
  expires_at: string | null;
  will_renew: boolean;
  limits: Record<string, number | string[]>;
  features: string[];
  feature_flags?: Record<string, boolean | string | string[]>;
  last_synced_at?: string;
}

interface LegacyTokenSession {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  user: AuthSession["user"];
}

const normalizeSession = (session: AuthSession | LegacyTokenSession): AuthSession => {
  if ("access" in session) return session;
  return {
    access: session.tokens.access_token,
    refresh: session.tokens.refresh_token,
    user: session.user,
  };
};

export const completeFirebaseLogin = async (firebaseToken: string) => {
  const session = await request<AuthSession>("/accounts/firebase/login/", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ firebase_token: firebaseToken }),
  });
  const normalized = normalizeSession(session);
  saveSession(normalized);
  return normalized;
};

export const completeFirebaseSignup = async (
  firebaseToken: string,
  profile: { username: string; full_name: string },
) => {
  const session = await request<AuthSession>("/accounts/firebase/signup/", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ firebase_token: firebaseToken, ...profile }),
  });
  const normalized = normalizeSession(session);
  saveSession(normalized);
  return normalized;
};

export const completeGoogleLogin = async (token: string) => {
  const session = await request<AuthSession | LegacyTokenSession>("/accounts/social/google/", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ token }),
  });
  const normalized = normalizeSession(session);
  saveSession(normalized);
  return normalized;
};

export const getSubscriptionStatus = () => request<SubscriptionStatus>("/subscriptions/status/");

export const createCheckoutSession = (tierType: string, billingPeriod: "monthly" | "annual") =>
  request<{ url: string }>("/subscriptions/stripe/checkout/", {
    method: "POST",
    body: JSON.stringify({ tier_type: tierType, billing_period: billingPeriod }),
  });

export const createPortalSession = () =>
  request<{ url: string }>("/subscriptions/stripe/portal/", {
    method: "POST",
  });
