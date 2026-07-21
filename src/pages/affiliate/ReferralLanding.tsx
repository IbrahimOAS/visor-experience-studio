import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAnonymousSessionId, persistReferralAttribution } from "@/lib/referral";

const ReferralLanding = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    const run = async () => {
      const session_id = getAnonymousSessionId();
      const url = new URL(window.location.href);
      const source = url.searchParams.get("utm_source") ?? url.searchParams.get("source");
      const campaign = url.searchParams.get("utm_campaign") ?? url.searchParams.get("campaign");
      try {
        const { data, error } = await supabase.rpc("resolve_referral_code" as never, {
          _code: code ?? "",
          _session_id: session_id,
          _source: source,
          _campaign: campaign,
          _ip_hash: null,
          _ua_hash: null,
          _country_code: null,
        } as never);
        if (!error && data && (data as { ok?: boolean; attribution_id?: string; code?: string }).ok) {
          const payload = data as { attribution_id: string; code: string };
          persistReferralAttribution(payload.code, payload.attribution_id);
        }
      } catch {
        /* ignore — always continue to landing */
      } finally {
        navigate("/", { replace: true });
      }
    };
    run();
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
      Redirecting…
    </div>
  );
};

export default ReferralLanding;
