import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const envOrDefault = (value: string | undefined, fallback: string) => {
  const normalized = value?.trim().replace(/^["']|["']$/g, "");
  return normalized || fallback;
};

const firebaseConfig = {
  apiKey: envOrDefault(import.meta.env.VITE_FIREBASE_API_KEY, "AIzaSyBm0CYnXMcpUm3fRXe5j4uOLBH2_N6iTHM"),
  authDomain: envOrDefault(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "visor-fitness-live.firebaseapp.com"),
  projectId: envOrDefault(import.meta.env.VITE_FIREBASE_PROJECT_ID, "visor-fitness-live"),
  storageBucket: envOrDefault(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "visor-fitness-live.firebasestorage.app"),
  messagingSenderId: envOrDefault(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "29183875346"),
  appId: envOrDefault(import.meta.env.VITE_FIREBASE_APP_ID, "1:29183875346:web:10fcf09da2b50ec0503bcb"),
  measurementId: envOrDefault(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, "G-VZC2YZ196X"),
};

export interface SessionUser {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_baseline_profile_complete?: boolean;
}

export interface AuthSession {
  access: string;
  refresh: string;
  user: SessionUser;
}

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

const sessionKey = "visor_web_session";

export const getSession = (): AuthSession | null => {
  const rawSession = sessionStorage.getItem(sessionKey);
  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    sessionStorage.removeItem(sessionKey);
    return null;
  }
};

export const saveSession = (session: AuthSession) => {
  sessionStorage.setItem(sessionKey, JSON.stringify(session));
};

export const clearSession = async () => {
  sessionStorage.removeItem(sessionKey);
  await signOut(firebaseAuth).catch(() => undefined);
};

const toUsername = (email: string) =>
  email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .slice(0, 24);

export const signInWithFirebaseEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return credential.user.getIdToken();
};

export const signUpWithFirebaseEmail = async (email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return credential.user.getIdToken();
};

export const buildSignupProfile = (email: string, fullName: string) => ({
  username: toUsername(email),
  full_name: fullName.trim(),
});
