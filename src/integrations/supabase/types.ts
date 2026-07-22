export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      affiliate_applications: {
        Row: {
          accepted_terms: boolean
          audience_countries: string[]
          country_code: string
          created_at: string
          email: string
          fitness_niche: string
          follower_range: string
          full_name: string
          id: string
          internal_notes: string | null
          primary_platform: string
          profile_url: string
          reason: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["affiliate_app_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          accepted_terms?: boolean
          audience_countries?: string[]
          country_code: string
          created_at?: string
          email: string
          fitness_niche: string
          follower_range: string
          full_name: string
          id?: string
          internal_notes?: string | null
          primary_platform: string
          profile_url: string
          reason: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["affiliate_app_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          accepted_terms?: boolean
          audience_countries?: string[]
          country_code?: string
          created_at?: string
          email?: string
          fitness_niche?: string
          follower_range?: string
          full_name?: string
          id?: string
          internal_notes?: string | null
          primary_platform?: string
          profile_url?: string
          reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["affiliate_app_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      affiliate_fraud_flags: {
        Row: {
          affiliate_id: string | null
          attribution_id: string | null
          created_at: string
          details: Json
          flag_type: string
          id: string
          resolved: boolean
          severity: string
        }
        Insert: {
          affiliate_id?: string | null
          attribution_id?: string | null
          created_at?: string
          details?: Json
          flag_type: string
          id?: string
          resolved?: boolean
          severity?: string
        }
        Update: {
          affiliate_id?: string | null
          attribution_id?: string | null
          created_at?: string
          details?: Json
          flag_type?: string
          id?: string
          resolved?: boolean
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_fraud_flags_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_fraud_flags_attribution_id_fkey"
            columns: ["attribution_id"]
            isOneToOne: false
            referencedRelation: "referral_attributions"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          application_id: string | null
          approved_at: string
          commission_model: string
          country_code: string | null
          created_at: string
          display_name: string | null
          id: string
          status: Database["public"]["Enums"]["affiliate_status"]
          suspended_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          approved_at?: string
          commission_model?: string
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          status?: Database["public"]["Enums"]["affiliate_status"]
          suspended_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          approved_at?: string
          commission_model?: string
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          status?: Database["public"]["Enums"]["affiliate_status"]
          suspended_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "affiliate_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_applications: {
        Row: {
          certification: string | null
          city: string
          country: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          specialization: string
          status: string
          updated_at: string
          website: string | null
          years_experience: number | null
        }
        Insert: {
          certification?: string | null
          city: string
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          specialization: string
          status?: string
          updated_at?: string
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          certification?: string | null
          city?: string
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          specialization?: string
          status?: string
          updated_at?: string
          website?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      commerce_order_items: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          order_id: string
          price_id: string | null
          product_id: string | null
          quantity: number
          total_amount_minor: number
          unit_amount_minor: number
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          order_id: string
          price_id?: string | null
          product_id?: string | null
          quantity?: number
          total_amount_minor?: number
          unit_amount_minor?: number
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          order_id?: string
          price_id?: string | null
          product_id?: string | null
          quantity?: number
          total_amount_minor?: number
          unit_amount_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "commerce_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "commerce_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commerce_order_items_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "commerce_prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commerce_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "commerce_products"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_orders: {
        Row: {
          created_at: string
          currency: string
          external_checkout_id: string | null
          external_payment_id: string | null
          id: string
          metadata: Json
          order_number: string
          order_type: string
          payment_provider: string | null
          status: string
          subtotal_minor: number
          tax_minor: number
          total_minor: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          currency: string
          external_checkout_id?: string | null
          external_payment_id?: string | null
          id?: string
          metadata?: Json
          order_number: string
          order_type: string
          payment_provider?: string | null
          status?: string
          subtotal_minor?: number
          tax_minor?: number
          total_minor?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          external_checkout_id?: string | null
          external_payment_id?: string | null
          id?: string
          metadata?: Json
          order_number?: string
          order_type?: string
          payment_provider?: string | null
          status?: string
          subtotal_minor?: number
          tax_minor?: number
          total_minor?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      commerce_prices: {
        Row: {
          active: boolean
          amount_minor: number | null
          billing_interval: string | null
          created_at: string
          currency: string
          id: string
          metadata: Json
          product_id: string
          provider: string
          provider_price_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          amount_minor?: number | null
          billing_interval?: string | null
          created_at?: string
          currency: string
          id?: string
          metadata?: Json
          product_id: string
          provider: string
          provider_price_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          amount_minor?: number | null
          billing_interval?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          product_id?: string
          provider?: string
          provider_price_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commerce_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "commerce_products"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          metadata: Json
          name: string
          product_key: string
          product_type: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name: string
          product_key: string
          product_type: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          name?: string
          product_key?: string
          product_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      customer_entitlements: {
        Row: {
          created_at: string
          entitlement_key: string
          expires_at: string | null
          external_customer_id: string | null
          external_subscription_id: string | null
          id: string
          metadata: Json
          source: string
          starts_at: string | null
          status: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entitlement_key: string
          expires_at?: string | null
          external_customer_id?: string | null
          external_subscription_id?: string | null
          id?: string
          metadata?: Json
          source: string
          starts_at?: string | null
          status: string
          tier: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entitlement_key?: string
          expires_at?: string | null
          external_customer_id?: string | null
          external_subscription_id?: string | null
          id?: string
          metadata?: Json
          source?: string
          starts_at?: string | null
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_customers: {
        Row: {
          created_at: string
          id: string
          provider: string
          provider_customer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider: string
          provider_customer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          provider?: string
          provider_customer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_events: {
        Row: {
          created_at: string
          error_message: string | null
          event_type: string
          id: string
          payload: Json | null
          processed: boolean
          processed_at: string | null
          provider: string
          provider_event_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          processed?: boolean
          processed_at?: string | null
          provider: string
          provider_event_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          processed?: boolean
          processed_at?: string | null
          provider?: string
          provider_event_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: string
          avatar_url: string | null
          country_code: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          preferred_currency: string
          role: string
          updated_at: string
        }
        Insert: {
          account_status?: string
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          preferred_currency?: string
          role?: string
          updated_at?: string
        }
        Update: {
          account_status?: string
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          preferred_currency?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      referral_attributions: {
        Row: {
          affiliate_id: string
          anonymous_session_id: string
          campaign: string | null
          conversion_status: Database["public"]["Enums"]["conversion_status"]
          converted_user_id: string | null
          created_at: string
          expires_at: string
          first_click_at: string
          id: string
          last_click_at: string
          metadata: Json
          referral_code_id: string
          source: string | null
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          anonymous_session_id: string
          campaign?: string | null
          conversion_status?: Database["public"]["Enums"]["conversion_status"]
          converted_user_id?: string | null
          created_at?: string
          expires_at?: string
          first_click_at?: string
          id?: string
          last_click_at?: string
          metadata?: Json
          referral_code_id: string
          source?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          anonymous_session_id?: string
          campaign?: string | null
          conversion_status?: Database["public"]["Enums"]["conversion_status"]
          converted_user_id?: string | null
          created_at?: string
          expires_at?: string
          first_click_at?: string
          id?: string
          last_click_at?: string
          metadata?: Json
          referral_code_id?: string
          source?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_attributions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_attributions_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_clicks: {
        Row: {
          affiliate_id: string | null
          anonymous_session_id: string | null
          campaign: string | null
          country_code: string | null
          created_at: string
          id: string
          ip_hash: string | null
          referral_code_id: string | null
          source: string | null
          ua_hash: string | null
        }
        Insert: {
          affiliate_id?: string | null
          anonymous_session_id?: string | null
          campaign?: string | null
          country_code?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          referral_code_id?: string | null
          source?: string | null
          ua_hash?: string | null
        }
        Update: {
          affiliate_id?: string | null
          anonymous_session_id?: string | null
          campaign?: string | null
          country_code?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          referral_code_id?: string | null
          source?: string | null
          ua_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_clicks_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_codes: {
        Row: {
          active: boolean
          affiliate_id: string
          code: string
          code_upper: string | null
          created_at: string
          expires_at: string | null
          id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          affiliate_id: string
          code: string
          code_upper?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          affiliate_id?: string
          code?: string
          code_upper?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      support_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          status: string
          topic: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          status?: string
          topic: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          status?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_set_affiliate_status: {
        Args: {
          _affiliate_id: string
          _reason?: string
          _status: Database["public"]["Enums"]["affiliate_status"]
        }
        Returns: undefined
      }
      admin_set_code_active: {
        Args: { _active: boolean; _code_id: string }
        Returns: undefined
      }
      admin_update_application: {
        Args: {
          _app_id: string
          _new_status: Database["public"]["Enums"]["affiliate_app_status"]
          _notes?: string
        }
        Returns: undefined
      }
      generate_referral_code: { Args: never; Returns: string }
      get_admin_dashboard_metrics: {
        Args: never
        Returns: {
          total_active_entitlements: number
          total_coach_applications: number
          total_profiles: number
          total_support_submissions: number
        }[]
      }
      get_my_affiliate: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          _action: string
          _details?: Json
          _target_id: string
          _target_type: string
        }
        Returns: undefined
      }
      resolve_referral_code: {
        Args: {
          _campaign?: string
          _code: string
          _country_code?: string
          _ip_hash?: string
          _session_id: string
          _source?: string
          _ua_hash?: string
        }
        Returns: Json
      }
      submit_affiliate_application: { Args: { payload: Json }; Returns: string }
    }
    Enums: {
      affiliate_app_status: "pending" | "reviewing" | "approved" | "rejected"
      affiliate_status: "active" | "suspended"
      app_role: "admin" | "moderator" | "user" | "affiliate"
      conversion_status: "pending" | "converted" | "expired" | "void"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      affiliate_app_status: ["pending", "reviewing", "approved", "rejected"],
      affiliate_status: ["active", "suspended"],
      app_role: ["admin", "moderator", "user", "affiliate"],
      conversion_status: ["pending", "converted", "expired", "void"],
    },
  },
} as const
