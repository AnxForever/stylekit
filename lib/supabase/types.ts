/**
 * Supabase Database type definitions
 *
 * These types describe the database schema for StyleKit.
 * In production, generate these with: npx supabase gen types typescript
 */

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string;
          slug: string;
          form_data: SubmissionFormData;
          status: "pending" | "approved" | "rejected";
          review_note: string | null;
          submitted_at: string;
          reviewed_at: string | null;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          form_data: SubmissionFormData;
          status?: "pending" | "approved" | "rejected";
          review_note?: string | null;
          submitted_at?: string;
          reviewed_at?: string | null;
          ip_address?: string | null;
        };
        Update: {
          slug?: string;
          form_data?: SubmissionFormData;
          status?: "pending" | "approved" | "rejected";
          review_note?: string | null;
          reviewed_at?: string | null;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          event_type: string;
          event_data: Record<string, unknown>;
          style_slug: string | null;
          session_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          event_data?: Record<string, unknown>;
          style_slug?: string | null;
          session_id?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          event_type?: string;
          event_data?: Record<string, unknown>;
          style_slug?: string | null;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          session_id: string;
          style_slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          style_slug: string;
          created_at?: string;
        };
        Update: {
          session_id?: string;
          style_slug?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      submission_status: "pending" | "approved" | "rejected";
    };
  };
}

export interface SubmissionFormData {
  name?: string;
  nameEn?: string;
  description?: string;
  category?: string;
  primaryColor?: string;
  secondaryColor?: string;
  [key: string]: unknown;
}
