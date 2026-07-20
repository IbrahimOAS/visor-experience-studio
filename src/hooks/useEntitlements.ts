import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

export type Entitlement = Tables<"customer_entitlements">;

const ACTIVE = new Set(["active", "trialing", "past_due"]);

export const useEntitlements = () => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["entitlements", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Entitlement[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("customer_entitlements")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const entitlements = query.data ?? [];
  const activeEntitlements = entitlements.filter((e) => ACTIVE.has(e.status));

  return {
    entitlements,
    activeEntitlements,
    hasActive: activeEntitlements.length > 0,
    loading: query.isLoading,
    error: query.error,
  };
};
