import { useAuth } from "@/hooks/useAuth";

export const useSession = () => {
  const { session, user, loading } = useAuth();
  return { session, user, loading, isAuthenticated: !!session };
};
