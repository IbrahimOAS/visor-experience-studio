// Client-side referral attribution helpers.
// Stores minimal, first-party data in localStorage + a first-party cookie.

const SESSION_KEY = "visor_ref_sid";
const ATTR_KEY = "visor_ref_attr";
const COOKIE_NAME = "visor_ref";
const COOKIE_DAYS = 30;

const rand = (bytes = 24) => {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
};

export const getAnonymousSessionId = (): string => {
  try {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = rand(24);
      localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return rand(24);
  }
};

const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
};

export type ReferralAttribution = {
  code: string;
  attribution_id: string;
  at: number;
};

export const persistReferralAttribution = (code: string, attribution_id: string) => {
  const payload: ReferralAttribution = { code, attribution_id, at: Date.now() };
  try {
    localStorage.setItem(ATTR_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
  setCookie(COOKIE_NAME, `${code}.${attribution_id}`, COOKIE_DAYS);
};

export const readReferralAttribution = (): ReferralAttribution | null => {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReferralAttribution;
  } catch {
    return null;
  }
};
