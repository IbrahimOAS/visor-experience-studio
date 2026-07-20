
-- =========================================================
-- PHASE 1: VISOR web commerce foundation
-- =========================================================

-- ---------- PROFILES ----------
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  avatar_url text,
  country_code text,
  preferred_currency text NOT NULL DEFAULT 'NOK',
  role text NOT NULL DEFAULT 'customer',
  account_status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profiles_role_check CHECK (role IN (
    'customer','coach','ambassador','affiliate',
    'corporate_admin','institution_admin','staff','admin'
  )),
  CONSTRAINT profiles_status_check CHECK (account_status IN (
    'active','suspended','deleted'
  ))
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Safety trigger: block users from changing their own role / account_status.
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NOT NULL
     AND NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.role := OLD.role;
    NEW.account_status := OLD.account_status;
    NEW.email := OLD.email; -- email is managed by auth.users
    NEW.id := OLD.id;
    NEW.created_at := OLD.created_at;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_prevent_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ---------- CUSTOMER ENTITLEMENTS ----------
CREATE TABLE public.customer_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entitlement_key text NOT NULL,
  tier text NOT NULL,
  source text NOT NULL,
  status text NOT NULL,
  starts_at timestamptz,
  expires_at timestamptz,
  external_customer_id text,
  external_subscription_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT entitlements_source_check CHECK (source IN (
    'stripe_web','apple_iap','google_play','revenuecat',
    'admin_grant','promotional','corporate','institution'
  )),
  CONSTRAINT entitlements_status_check CHECK (status IN (
    'active','trialing','past_due','paused','cancelled','expired','revoked'
  ))
);

GRANT SELECT ON public.customer_entitlements TO authenticated;
GRANT ALL ON public.customer_entitlements TO service_role;

ALTER TABLE public.customer_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own entitlements"
  ON public.customer_entitlements FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE UNIQUE INDEX customer_entitlements_unique_active_external
  ON public.customer_entitlements (source, external_subscription_id)
  WHERE external_subscription_id IS NOT NULL
    AND status IN ('active','trialing','past_due');

CREATE INDEX idx_entitlements_user_source_status
  ON public.customer_entitlements (user_id, source, status);

CREATE TRIGGER trg_entitlements_updated_at
BEFORE UPDATE ON public.customer_entitlements
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ---------- PAYMENT CUSTOMERS ----------
CREATE TABLE public.payment_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  provider_customer_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT payment_customers_provider_check CHECK (provider IN (
    'stripe','revenuecat','apple','google'
  ))
);

GRANT SELECT ON public.payment_customers TO authenticated;
GRANT ALL ON public.payment_customers TO service_role;

ALTER TABLE public.payment_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own payment customer"
  ON public.payment_customers FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER trg_payment_customers_updated_at
BEFORE UPDATE ON public.payment_customers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ---------- COMMERCE PRODUCTS ----------
CREATE TABLE public.commerce_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_key text UNIQUE NOT NULL,
  product_type text NOT NULL,
  name text NOT NULL,
  description text,
  active boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT commerce_products_type_check CHECK (product_type IN (
    'subscription','corporate','institution','coach_booking',
    'gift_card','merchandise','hardware'
  ))
);

GRANT SELECT ON public.commerce_products TO anon, authenticated;
GRANT ALL ON public.commerce_products TO service_role;

ALTER TABLE public.commerce_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads active products"
  ON public.commerce_products FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE TRIGGER trg_commerce_products_updated_at
BEFORE UPDATE ON public.commerce_products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ---------- COMMERCE PRICES ----------
CREATE TABLE public.commerce_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.commerce_products(id) ON DELETE CASCADE,
  provider text NOT NULL,
  provider_price_id text,
  currency text NOT NULL,
  amount_minor integer,
  billing_interval text,
  active boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.commerce_prices TO anon, authenticated;
GRANT ALL ON public.commerce_prices TO service_role;

ALTER TABLE public.commerce_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads active prices of active products"
  ON public.commerce_prices FOR SELECT TO anon, authenticated
  USING (
    active = true
    AND EXISTS (
      SELECT 1 FROM public.commerce_products p
      WHERE p.id = commerce_prices.product_id AND p.active = true
    )
  );

CREATE INDEX idx_commerce_prices_product_provider_active
  ON public.commerce_prices (product_id, provider, active);

CREATE TRIGGER trg_commerce_prices_updated_at
BEFORE UPDATE ON public.commerce_prices
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ---------- COMMERCE ORDERS ----------
CREATE TABLE public.commerce_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number text UNIQUE NOT NULL,
  order_type text NOT NULL,
  currency text NOT NULL,
  subtotal_minor integer NOT NULL DEFAULT 0,
  tax_minor integer NOT NULL DEFAULT 0,
  total_minor integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  payment_provider text,
  external_checkout_id text,
  external_payment_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT commerce_orders_status_check CHECK (status IN (
    'pending','awaiting_payment','paid','fulfilled','cancelled',
    'refunded','partially_refunded','disputed','failed'
  ))
);

GRANT SELECT ON public.commerce_orders TO authenticated;
GRANT ALL ON public.commerce_orders TO service_role;

ALTER TABLE public.commerce_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own orders"
  ON public.commerce_orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_commerce_orders_user_status_created
  ON public.commerce_orders (user_id, status, created_at DESC);

CREATE TRIGGER trg_commerce_orders_updated_at
BEFORE UPDATE ON public.commerce_orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ---------- COMMERCE ORDER ITEMS ----------
CREATE TABLE public.commerce_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.commerce_orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.commerce_products(id) ON DELETE SET NULL,
  price_id uuid REFERENCES public.commerce_prices(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_amount_minor integer NOT NULL DEFAULT 0,
  total_amount_minor integer NOT NULL DEFAULT 0,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.commerce_order_items TO authenticated;
GRANT ALL ON public.commerce_order_items TO service_role;

ALTER TABLE public.commerce_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read items of own orders"
  ON public.commerce_order_items FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.commerce_orders o
    WHERE o.id = commerce_order_items.order_id AND o.user_id = auth.uid()
  ));

CREATE INDEX idx_commerce_order_items_order
  ON public.commerce_order_items (order_id);


-- ---------- PAYMENT EVENTS (webhook ledger) ----------
CREATE TABLE public.payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  provider_event_id text UNIQUE NOT NULL,
  event_type text NOT NULL,
  processed boolean NOT NULL DEFAULT false,
  processed_at timestamptz,
  error_message text,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- No grants to anon/authenticated by design.
GRANT ALL ON public.payment_events TO service_role;

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
-- No policies = no client access.

CREATE INDEX idx_payment_events_provider_event
  ON public.payment_events (provider_event_id);
CREATE INDEX idx_payment_events_processed
  ON public.payment_events (processed);
