import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

export type AppRole = Database["public"]["Enums"]["app_role"];

export const useUserRoles = () => {
  const { user, loading: authLoading } = useAuth();
  const query = useQuery({
    queryKey: ["user_roles", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<AppRole[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as AppRole);
    },
  });
  return {
    roles: query.data ?? [],
    loading: authLoading || query.isLoading,
    error: query.error,
  };
};

export const useIsAdmin = () => {
  const { roles, loading, error } = useUserRoles();
  return { isAdmin: roles.includes("admin"), loading, error };
};
