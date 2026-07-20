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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
