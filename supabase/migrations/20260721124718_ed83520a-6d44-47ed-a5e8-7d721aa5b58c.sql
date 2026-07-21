CREATE OR REPLACE FUNCTION public.generate_referral_code()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public','extensions'
AS $function$
DECLARE
  alphabet TEXT := 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  candidate TEXT;
  i INT;
  n INT;
  exists_row BOOLEAN;
BEGIN
  LOOP
    candidate := '';
    FOR i IN 1..10 LOOP
      n := (get_byte(extensions.gen_random_bytes(1), 0) % length(alphabet)) + 1;
      candidate := candidate || substr(alphabet, n, 1);
    END LOOP;
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code_upper = candidate) INTO exists_row;
    EXIT WHEN NOT exists_row;
  END LOOP;
  RETURN candidate;
END $function$;