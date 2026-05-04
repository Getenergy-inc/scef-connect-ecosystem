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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_assistant_logs: {
        Row: {
          created_at: string
          id: string
          model: string | null
          output_preview: string | null
          prompt_summary: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          tokens_used: number | null
          tool_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          model?: string | null
          output_preview?: string | null
          prompt_summary?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          tokens_used?: number | null
          tool_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          model?: string | null
          output_preview?: string | null
          prompt_summary?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          tokens_used?: number | null
          tool_name?: string
          user_id?: string
        }
        Relationships: []
      }
      ambassador_profiles: {
        Row: {
          advocacy_focus: string[] | null
          created_at: string
          experience_summary: string | null
          hours_per_month: number | null
          id: string
          preferred_programs: string[] | null
          public_profile_links: Json | null
          status: string
          tier_interest: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          advocacy_focus?: string[] | null
          created_at?: string
          experience_summary?: string | null
          hours_per_month?: number | null
          id?: string
          preferred_programs?: string[] | null
          public_profile_links?: Json | null
          status?: string
          tier_interest?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          advocacy_focus?: string[] | null
          created_at?: string
          experience_summary?: string | null
          hours_per_month?: number | null
          id?: string
          preferred_programs?: string[] | null
          public_profile_links?: Json | null
          status?: string
          tier_interest?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          application_type: string
          id: string
          notes: string | null
          payload: Json | null
          related_entity_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_type: string
          id?: string
          notes?: string | null
          payload?: Json | null
          related_entity_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_type?: string
          id?: string
          notes?: string | null
          payload?: Json | null
          related_entity_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action_type: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_name: string
          account_number_masked: string
          bank_name: string
          country: string
          created_at: string
          currency: string
          id: string
          is_primary: boolean | null
          owner_id: string | null
          owner_type: string
          routing_number: string | null
          updated_at: string
          verification_docs: string[] | null
          verification_status: string
        }
        Insert: {
          account_name: string
          account_number_masked: string
          bank_name: string
          country: string
          created_at?: string
          currency?: string
          id?: string
          is_primary?: boolean | null
          owner_id?: string | null
          owner_type: string
          routing_number?: string | null
          updated_at?: string
          verification_docs?: string[] | null
          verification_status?: string
        }
        Update: {
          account_name?: string
          account_number_masked?: string
          bank_name?: string
          country?: string
          created_at?: string
          currency?: string
          id?: string
          is_primary?: boolean | null
          owner_id?: string | null
          owner_type?: string
          routing_number?: string | null
          updated_at?: string
          verification_docs?: string[] | null
          verification_status?: string
        }
        Relationships: []
      }
      certificate_verifications: {
        Row: {
          badge_code: string | null
          id: string
          searched_at: string
          searched_by: string | null
          verified: boolean | null
        }
        Insert: {
          badge_code?: string | null
          id?: string
          searched_at?: string
          searched_by?: string | null
          verified?: boolean | null
        }
        Update: {
          badge_code?: string | null
          id?: string
          searched_at?: string
          searched_by?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      chapter_inbox_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender_id: string | null
          sender_type: string
          thread_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender_id?: string | null
          sender_type: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender_id?: string | null
          sender_type?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_inbox_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chapter_inbox_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_inbox_threads: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          is_read: boolean | null
          last_message_at: string | null
          subject: string
          user_id: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          last_message_at?: string | null
          subject: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          last_message_at?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_inbox_threads_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_members: {
        Row: {
          chapter_id: string
          id: string
          is_admin: boolean | null
          joined_at: string
          role: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          chapter_id: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string
          role?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          chapter_id?: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string
          role?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_members_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_upgrade_requests: {
        Row: {
          chapter_id: string | null
          created_at: string
          documents: Json | null
          id: string
          reason: string | null
          requested_by: string | null
          requested_type: string | null
          status: string | null
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          reason?: string | null
          requested_by?: string | null
          requested_type?: string | null
          status?: string | null
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          reason?: string | null
          requested_by?: string | null
          requested_type?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_upgrade_requests_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          chapter_leader_id: string | null
          chapter_type: Database["public"]["Enums"]["chapter_type"]
          city: string | null
          country: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          member_count: number | null
          microsite_slug: string | null
          name: string
          region: string | null
          slug: string
          state: string | null
          status: Database["public"]["Enums"]["chapter_status"]
          updated_at: string
          wallet_id: string | null
        }
        Insert: {
          chapter_leader_id?: string | null
          chapter_type?: Database["public"]["Enums"]["chapter_type"]
          city?: string | null
          country: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          microsite_slug?: string | null
          name: string
          region?: string | null
          slug: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"]
          updated_at?: string
          wallet_id?: string | null
        }
        Update: {
          chapter_leader_id?: string | null
          chapter_type?: Database["public"]["Enums"]["chapter_type"]
          city?: string | null
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          microsite_slug?: string | null
          name?: string
          region?: string | null
          slug?: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"]
          updated_at?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_deleted: boolean | null
          is_edited: boolean | null
          is_pinned: boolean | null
          message_type: string | null
          parent_id: string | null
          room_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_pinned?: boolean | null
          message_type?: string | null
          parent_id?: string | null
          room_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_pinned?: boolean | null
          message_type?: string | null
          parent_id?: string | null
          room_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          chapter_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          division_slug: string | null
          external_meeting_link: string | null
          governance_type: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          program_slug: string | null
          room_type: Database["public"]["Enums"]["room_type"]
          updated_at: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          division_slug?: string | null
          external_meeting_link?: string | null
          governance_type?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          program_slug?: string | null
          room_type: Database["public"]["Enums"]["room_type"]
          updated_at?: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          division_slug?: string | null
          external_meeting_link?: string | null
          governance_type?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          program_slug?: string | null
          room_type?: Database["public"]["Enums"]["room_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      contributors: {
        Row: {
          badge_code: string | null
          certificate_url: string | null
          contribution_summary: string | null
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          photo_url: string | null
          program_supported: string | null
          public_slug: string | null
          role: string | null
          testimony: string | null
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          badge_code?: string | null
          certificate_url?: string | null
          contribution_summary?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          photo_url?: string | null
          program_supported?: string | null
          public_slug?: string | null
          role?: string | null
          testimony?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          badge_code?: string | null
          certificate_url?: string | null
          contribution_summary?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          photo_url?: string | null
          program_supported?: string | null
          public_slug?: string | null
          role?: string | null
          testimony?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      crs_partners: {
        Row: {
          acronym: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string
          name: string
          partner_since: number
          service_category: string | null
          service_description: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          acronym?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url: string
          name: string
          partner_since: number
          service_category?: string | null
          service_description: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          acronym?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string
          name?: string
          partner_since?: number
          service_category?: string | null
          service_description?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      csr_inquiries: {
        Row: {
          assigned_to: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          converted_project_id: string | null
          country: string | null
          created_at: string
          focus_areas: string[] | null
          funding_range: string | null
          id: string
          message: string | null
          notes: string | null
          organization_name: string
          organization_type: string | null
          preferred_regions: string[] | null
          source: string | null
          status: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          converted_project_id?: string | null
          country?: string | null
          created_at?: string
          focus_areas?: string[] | null
          funding_range?: string | null
          id?: string
          message?: string | null
          notes?: string | null
          organization_name: string
          organization_type?: string | null
          preferred_regions?: string[] | null
          source?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          converted_project_id?: string | null
          country?: string | null
          created_at?: string
          focus_areas?: string[] | null
          funding_range?: string | null
          id?: string
          message?: string | null
          notes?: string | null
          organization_name?: string
          organization_type?: string | null
          preferred_regions?: string[] | null
          source?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      csr_milestones: {
        Row: {
          amount: number | null
          completed_at: string | null
          created_at: string
          description: string | null
          display_order: number | null
          due_date: string | null
          evidence_url: string | null
          id: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          evidence_url?: string | null
          id?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          evidence_url?: string | null
          id?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "csr_milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "csr_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      csr_project_reports: {
        Row: {
          beneficiaries_reached: number | null
          challenges: string | null
          created_at: string
          created_by: string | null
          document_url: string | null
          funds_disbursed: number | null
          highlights: string | null
          id: string
          project_id: string
          published_at: string | null
          report_period: string
        }
        Insert: {
          beneficiaries_reached?: number | null
          challenges?: string | null
          created_at?: string
          created_by?: string | null
          document_url?: string | null
          funds_disbursed?: number | null
          highlights?: string | null
          id?: string
          project_id: string
          published_at?: string | null
          report_period: string
        }
        Update: {
          beneficiaries_reached?: number | null
          challenges?: string | null
          created_at?: string
          created_by?: string | null
          document_url?: string | null
          funds_disbursed?: number | null
          highlights?: string | null
          id?: string
          project_id?: string
          published_at?: string | null
          report_period?: string
        }
        Relationships: [
          {
            foreignKeyName: "csr_project_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "csr_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      csr_projects: {
        Row: {
          country: string | null
          created_at: string
          currency: string
          description: string | null
          disbursed_amount: number
          end_date: string | null
          focus_area: string | null
          id: string
          inquiry_id: string | null
          managed_by: string | null
          partner_name: string
          project_name: string
          region: string | null
          start_date: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          disbursed_amount?: number
          end_date?: string | null
          focus_area?: string | null
          id?: string
          inquiry_id?: string | null
          managed_by?: string | null
          partner_name: string
          project_name: string
          region?: string | null
          start_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          disbursed_amount?: number
          end_date?: string | null
          focus_area?: string | null
          id?: string
          inquiry_id?: string | null
          managed_by?: string | null
          partner_name?: string
          project_name?: string
          region?: string | null
          start_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "csr_projects_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "csr_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          decision_id: string
          details: Json | null
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          decision_id: string
          details?: Json | null
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          decision_id?: string
          details?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "decision_audit_logs_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_anonymous: boolean | null
          options: Json | null
          quorum_count: number | null
          result_summary: Json | null
          room_id: string
          status: string | null
          title: string
          updated_at: string
          voting_closes_at: string
          voting_opens_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          options?: Json | null
          quorum_count?: number | null
          result_summary?: Json | null
          room_id: string
          status?: string | null
          title: string
          updated_at?: string
          voting_closes_at: string
          voting_opens_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          options?: Json | null
          quorum_count?: number | null
          result_summary?: Json | null
          room_id?: string
          status?: string | null
          title?: string
          updated_at?: string
          voting_closes_at?: string
          voting_opens_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decisions_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      digital_board_items: {
        Row: {
          content_text: string | null
          content_type: string
          content_url: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          display_order: number | null
          expire_at: string | null
          id: string
          is_active: boolean | null
          publish_at: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_text?: string | null
          content_type: string
          content_url?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          display_order?: number | null
          expire_at?: string | null
          id?: string
          is_active?: boolean | null
          publish_at?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_text?: string | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          display_order?: number | null
          expire_at?: string | null
          id?: string
          is_active?: boolean | null
          publish_at?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      disbursement_requests: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          bank_account_id: string
          created_at: string
          currency: string
          id: string
          notes: string | null
          rejection_reason: string | null
          requested_by: string
          status: string
          updated_at: string
          wallet_id: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          bank_account_id: string
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          requested_by: string
          status?: string
          updated_at?: string
          wallet_id: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          bank_account_id?: string
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          requested_by?: string
          status?: string
          updated_at?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "disbursement_requests_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disbursement_requests_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_receipts: {
        Row: {
          amount: number | null
          currency: string | null
          donor_name: string | null
          id: string
          issued_at: string
          purpose: string | null
          receipt_number: string | null
          receipt_pdf_url: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          currency?: string | null
          donor_name?: string | null
          id?: string
          issued_at?: string
          purpose?: string | null
          receipt_number?: string | null
          receipt_pdf_url?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          currency?: string | null
          donor_name?: string | null
          id?: string
          issued_at?: string
          purpose?: string | null
          receipt_number?: string | null
          receipt_pdf_url?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_receipts_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          chapter_id: string | null
          created_at: string
          currency: string | null
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          payment_method: string | null
          payment_status: string | null
          program_id: string | null
          receipt_sent: boolean | null
          user_id: string | null
        }
        Insert: {
          amount: number
          chapter_id?: string | null
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: string | null
          receipt_sent?: boolean | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          chapter_id?: string | null
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: string | null
          receipt_sent?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      elibrary_resources: {
        Row: {
          author: string
          category: string
          cover_url: string | null
          created_at: string
          description: string | null
          download_count: number | null
          id: string
          is_published: boolean | null
          resource_type: string
          resource_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          id?: string
          is_published?: boolean | null
          resource_type: string
          resource_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          id?: string
          is_published?: boolean | null
          resource_type?: string
          resource_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      endorsements: {
        Row: {
          acronym: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          acronym?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url: string
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          acronym?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      endorser_profiles: {
        Row: {
          collaboration_interests: string[] | null
          created_at: string
          endorsement_scope: string | null
          endorsement_type: string | null
          id: string
          institution_name: string
          institution_type: string | null
          public_display_permission: boolean | null
          representative_name: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          collaboration_interests?: string[] | null
          created_at?: string
          endorsement_scope?: string | null
          endorsement_type?: string | null
          id?: string
          institution_name: string
          institution_type?: string | null
          public_display_permission?: boolean | null
          representative_name?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          collaboration_interests?: string[] | null
          created_at?: string
          endorsement_scope?: string | null
          endorsement_type?: string | null
          id?: string
          institution_name?: string
          institution_type?: string | null
          public_display_permission?: boolean | null
          representative_name?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          chapter_id: string | null
          created_at: string
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          is_virtual: boolean | null
          location: string | null
          program_id: string | null
          registration_url: string | null
          slug: string
          start_date: string
          title: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          program_id?: string | null
          registration_url?: string | null
          slug: string
          start_date: string
          title: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          program_id?: string | null
          registration_url?: string | null
          slug?: string
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      governance_profiles: {
        Row: {
          bio: string | null
          board_type: string
          created_at: string
          display_order: number | null
          email: string | null
          id: string
          is_active: boolean
          linkedin_url: string | null
          name: string
          photo_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          board_type: string
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          board_type?: string
          created_at?: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hall_of_fame_media: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          media_type: string
          media_url: string
          profile_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          media_type?: string
          media_url: string
          profile_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          media_type?: string
          media_url?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hall_of_fame_media_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "hall_of_fame_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hall_of_fame_profiles: {
        Row: {
          admin_notes: string | null
          badge: string | null
          badge_code: string | null
          consent_public_display: boolean
          contribution_summary: string | null
          contribution_type: string | null
          country: string | null
          created_at: string
          full_name: string
          id: string
          is_featured: boolean
          is_verified: boolean
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          photo_url: string | null
          program_supported: string | null
          region: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role: string
          slug: string
          social_links: Json | null
          status: string
          submitted_email: string | null
          testimony: string | null
          updated_at: string
          user_id: string | null
          year_end: number | null
          year_start: number | null
        }
        Insert: {
          admin_notes?: string | null
          badge?: string | null
          badge_code?: string | null
          consent_public_display?: boolean
          contribution_summary?: string | null
          contribution_type?: string | null
          country?: string | null
          created_at?: string
          full_name: string
          id?: string
          is_featured?: boolean
          is_verified?: boolean
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          photo_url?: string | null
          program_supported?: string | null
          region?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role: string
          slug: string
          social_links?: Json | null
          status?: string
          submitted_email?: string | null
          testimony?: string | null
          updated_at?: string
          user_id?: string | null
          year_end?: number | null
          year_start?: number | null
        }
        Update: {
          admin_notes?: string | null
          badge?: string | null
          badge_code?: string | null
          consent_public_display?: boolean
          contribution_summary?: string | null
          contribution_type?: string | null
          country?: string | null
          created_at?: string
          full_name?: string
          id?: string
          is_featured?: boolean
          is_verified?: boolean
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          photo_url?: string | null
          program_supported?: string | null
          region?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role?: string
          slug?: string
          social_links?: Json | null
          status?: string
          submitted_email?: string | null
          testimony?: string | null
          updated_at?: string
          user_id?: string | null
          year_end?: number | null
          year_start?: number | null
        }
        Relationships: []
      }
      media_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          media_type: string
          platform: string | null
          thumbnail_url: string | null
          title: string
          url: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          media_type: string
          platform?: string | null
          thumbnail_url?: string | null
          title: string
          url: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          media_type?: string
          platform?: string | null
          thumbnail_url?: string | null
          title?: string
          url?: string
          view_count?: number | null
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          ended_at: string | null
          external_link: string | null
          id: string
          jitsi_room_name: string | null
          meeting_type: string | null
          room_id: string
          scheduled_at: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          ended_at?: string | null
          external_link?: string | null
          id?: string
          jitsi_room_name?: string | null
          meeting_type?: string | null
          room_id: string
          scheduled_at?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          ended_at?: string | null
          external_link?: string | null
          id?: string
          jitsi_room_name?: string | null
          meeting_type?: string | null
          room_id?: string
          scheduled_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_applications: {
        Row: {
          address: string | null
          commitment: string | null
          created_at: string
          date_of_birth: string | null
          date_stamp: string | null
          email: string
          id: string
          mobile_numbers: string | null
          name: string
          nationality: string | null
          preferred_language: string | null
          sn: number
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          commitment?: string | null
          created_at?: string
          date_of_birth?: string | null
          date_stamp?: string | null
          email: string
          id?: string
          mobile_numbers?: string | null
          name: string
          nationality?: string | null
          preferred_language?: string | null
          sn: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          commitment?: string | null
          created_at?: string
          date_of_birth?: string | null
          date_stamp?: string | null
          email?: string
          id?: string
          mobile_numbers?: string | null
          name?: string
          nationality?: string | null
          preferred_language?: string | null
          sn?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      membership_types: {
        Row: {
          billing_cycle: string | null
          created_at: string
          currency: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          slug: string
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          slug: string
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          slug?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string
          end_date: string | null
          expiry_date: string | null
          id: string
          membership_status: string
          membership_type: string | null
          membership_type_id: string
          payment_status: string
          renewal_date: string | null
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          expiry_date?: string | null
          id?: string
          membership_status?: string
          membership_type?: string | null
          membership_type_id: string
          payment_status?: string
          renewal_date?: string | null
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          expiry_date?: string | null
          id?: string
          membership_status?: string
          membership_type?: string | null
          membership_type_id?: string
          payment_status?: string
          renewal_date?: string | null
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_membership_type_id_fkey"
            columns: ["membership_type_id"]
            isOneToOne: false
            referencedRelation: "membership_types"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      partnership_inquiries: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string | null
          partnership_type: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          partnership_type?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          partnership_type?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_band: string | null
          avatar_url: string | null
          bio: string | null
          chapter_id: string | null
          city: string | null
          communication_preferences: Json | null
          country: string | null
          created_at: string
          email: string | null
          engagement_path: string | null
          first_name: string | null
          id: string
          last_name: string | null
          occupation: string | null
          onboarding_completed: boolean | null
          onboarding_status: string | null
          onboarding_step: string | null
          organization: string | null
          phone: string | null
          preferred_language: string | null
          profile_completion: number | null
          profile_photo_url: string | null
          relationship_to_country: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age_band?: string | null
          avatar_url?: string | null
          bio?: string | null
          chapter_id?: string | null
          city?: string | null
          communication_preferences?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          engagement_path?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          occupation?: string | null
          onboarding_completed?: boolean | null
          onboarding_status?: string | null
          onboarding_step?: string | null
          organization?: string | null
          phone?: string | null
          preferred_language?: string | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          relationship_to_country?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age_band?: string | null
          avatar_url?: string | null
          bio?: string | null
          chapter_id?: string | null
          city?: string | null
          communication_preferences?: Json | null
          country?: string | null
          created_at?: string
          email?: string | null
          engagement_path?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          occupation?: string | null
          onboarding_completed?: boolean | null
          onboarding_status?: string | null
          onboarding_step?: string | null
          organization?: string | null
          phone?: string | null
          preferred_language?: string | null
          profile_completion?: number | null
          profile_photo_url?: string | null
          relationship_to_country?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      room_members: {
        Row: {
          can_vote: boolean | null
          id: string
          joined_at: string
          role: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          can_vote?: boolean | null
          id?: string
          joined_at?: string
          role?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          can_vote?: boolean | null
          id?: string
          joined_at?: string
          role?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_notifications: {
        Row: {
          created_at: string
          decision_id: string | null
          id: string
          is_read: boolean | null
          message_id: string | null
          notification_type: string
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          decision_id?: string | null
          id?: string
          is_read?: boolean | null
          message_id?: string | null
          notification_type: string
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          decision_id?: string | null
          id?: string
          is_read?: boolean | null
          message_id?: string | null
          notification_type?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_notifications_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_notifications_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_notifications_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_exam_answers: {
        Row: {
          answered_at: string
          attempt_id: string
          id: string
          question_id: string
          selected_index: number | null
        }
        Insert: {
          answered_at?: string
          attempt_id: string
          id?: string
          question_id: string
          selected_index?: number | null
        }
        Update: {
          answered_at?: string
          attempt_id?: string
          id?: string
          question_id?: string
          selected_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_exam_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "scholarship_exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scholarship_exam_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "scholarship_exam_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_exam_attempts: {
        Row: {
          application_id: string | null
          created_at: string
          exam_id: string
          expires_at: string
          id: string
          is_preview: boolean
          passed: boolean | null
          score_percent: number | null
          score_points: number | null
          started_at: string
          status: string
          submitted_at: string | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          exam_id: string
          expires_at: string
          id?: string
          is_preview?: boolean
          passed?: boolean | null
          score_percent?: number | null
          score_points?: number | null
          started_at?: string
          status?: string
          submitted_at?: string | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          exam_id?: string
          expires_at?: string
          id?: string
          is_preview?: boolean
          passed?: boolean | null
          score_percent?: number | null
          score_points?: number | null
          started_at?: string
          status?: string
          submitted_at?: string | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_exam_attempts_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "scholarship_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_exam_questions: {
        Row: {
          correct_index: number
          created_at: string
          exam_id: string
          id: string
          options: Json
          points: number
          position: number
          prompt: string
        }
        Insert: {
          correct_index: number
          created_at?: string
          exam_id: string
          id?: string
          options: Json
          points?: number
          position: number
          prompt: string
        }
        Update: {
          correct_index?: number
          created_at?: string
          exam_id?: string
          id?: string
          options?: Json
          points?: number
          position?: number
          prompt?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "scholarship_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_exams: {
        Row: {
          category_slug: string | null
          closes_at: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_published: boolean
          max_attempts: number
          opens_at: string | null
          pass_score_percent: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category_slug?: string | null
          closes_at?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean
          max_attempts?: number
          opens_at?: string | null
          pass_score_percent?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category_slug?: string | null
          closes_at?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean
          max_attempts?: number
          opens_at?: string | null
          pass_score_percent?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_nominations: {
        Row: {
          country: string | null
          created_at: string
          id: string
          is_wash_project: boolean | null
          needs_description: string | null
          region: string | null
          school_name: string
          status: string | null
          submitted_by: string | null
          support_type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          is_wash_project?: boolean | null
          needs_description?: string | null
          region?: string | null
          school_name: string
          status?: string | null
          submitted_by?: string | null
          support_type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          is_wash_project?: boolean | null
          needs_description?: string | null
          region?: string | null
          school_name?: string
          status?: string | null
          submitted_by?: string | null
          support_type?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      sponsor_profiles: {
        Row: {
          budget_range: string | null
          created_at: string
          csr_focus_areas: string[] | null
          id: string
          industry: string | null
          organization_name: string
          partnership_status: string
          preferred_regions: string[] | null
          reporting_frequency: string | null
          sponsor_type: string | null
          support_type: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          csr_focus_areas?: string[] | null
          id?: string
          industry?: string | null
          organization_name: string
          partnership_status?: string
          preferred_regions?: string[] | null
          reporting_frequency?: string | null
          sponsor_type?: string | null
          support_type?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          csr_focus_areas?: string[] | null
          id?: string
          industry?: string | null
          organization_name?: string
          partnership_status?: string
          preferred_regions?: string[] | null
          reporting_frequency?: string | null
          sponsor_type?: string | null
          support_type?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      staff_departments: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      staff_profiles: {
        Row: {
          access_level: string
          approved_at: string | null
          approved_by: string | null
          created_at: string
          department_slug: string | null
          employee_id: string | null
          id: string
          job_role: string | null
          office_type: string | null
          reporting_line: string | null
          status: string
          supervisor_id: string | null
          updated_at: string
          user_id: string
          work_region: string | null
        }
        Insert: {
          access_level?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          department_slug?: string | null
          employee_id?: string | null
          id?: string
          job_role?: string | null
          office_type?: string | null
          reporting_line?: string | null
          status?: string
          supervisor_id?: string | null
          updated_at?: string
          user_id: string
          work_region?: string | null
        }
        Update: {
          access_level?: string
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          department_slug?: string | null
          employee_id?: string | null
          id?: string
          job_role?: string | null
          office_type?: string | null
          reporting_line?: string | null
          status?: string
          supervisor_id?: string | null
          updated_at?: string
          user_id?: string
          work_region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_profiles_department_slug_fkey"
            columns: ["department_slug"]
            isOneToOne: false
            referencedRelation: "staff_departments"
            referencedColumns: ["slug"]
          },
        ]
      }
      staff_reports: {
        Row: {
          ai_assisted: boolean | null
          created_at: string
          department_slug: string | null
          highlights: string | null
          id: string
          issues_encountered: string | null
          key_tasks_completed: string | null
          next_priorities: string | null
          pending_tasks: string | null
          period_end: string | null
          report_date: string
          report_type: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          source_report_ids: string[] | null
          status: string
          submitted_at: string | null
          support_needed: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_assisted?: boolean | null
          created_at?: string
          department_slug?: string | null
          highlights?: string | null
          id?: string
          issues_encountered?: string | null
          key_tasks_completed?: string | null
          next_priorities?: string | null
          pending_tasks?: string | null
          period_end?: string | null
          report_date: string
          report_type: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_report_ids?: string[] | null
          status?: string
          submitted_at?: string | null
          support_needed?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_assisted?: boolean | null
          created_at?: string
          department_slug?: string | null
          highlights?: string | null
          id?: string
          issues_encountered?: string | null
          key_tasks_completed?: string | null
          next_priorities?: string | null
          pending_tasks?: string | null
          period_end?: string | null
          report_date?: string
          report_type?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_report_ids?: string[] | null
          status?: string
          submitted_at?: string | null
          support_needed?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      staff_tasks: {
        Row: {
          ai_generated: boolean | null
          assigned_by: string | null
          completed_at: string | null
          created_at: string
          department_slug: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          id: string
          priority: string
          status: string
          tags: string[] | null
          task_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          department_slug?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string
          status?: string
          tags?: string[] | null
          task_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          department_slug?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          id?: string
          priority?: string
          status?: string
          tags?: string[] | null
          task_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          agc_amount: number | null
          amount: number
          created_at: string
          currency: string | null
          id: string
          payment_provider: string | null
          provider_reference: string | null
          purpose: string | null
          status: string | null
          type: string | null
          user_id: string | null
          wallet_id: string | null
        }
        Insert: {
          agc_amount?: number | null
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          payment_provider?: string | null
          provider_reference?: string | null
          purpose?: string | null
          status?: string | null
          type?: string | null
          user_id?: string | null
          wallet_id?: string | null
        }
        Update: {
          agc_amount?: number | null
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          payment_provider?: string | null
          provider_reference?: string | null
          purpose?: string | null
          status?: string | null
          type?: string | null
          user_id?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
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
      user_service_preferences: {
        Row: {
          created_at: string
          id: string
          preference_level: string | null
          service_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preference_level?: string | null
          service_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preference_level?: string | null
          service_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_service_preferences_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      vacancies: {
        Row: {
          application_deadline: string | null
          application_email: string | null
          created_at: string
          created_by: string | null
          department: string
          description: string
          employment_type: string
          id: string
          is_active: boolean
          is_featured: boolean
          location: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          application_email?: string | null
          created_at?: string
          created_by?: string | null
          department: string
          description: string
          employment_type?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          application_email?: string | null
          created_at?: string
          created_by?: string | null
          department?: string
          description?: string
          employment_type?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          decision_id: string
          id: string
          user_id: string
          vote_option: string
        }
        Insert: {
          created_at?: string
          decision_id: string
          id?: string
          user_id: string
          vote_option: string
        }
        Update: {
          created_at?: string
          decision_id?: string
          id?: string
          user_id?: string
          vote_option?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          transaction_type: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          transaction_type: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          transaction_type?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          agc_balance: number | null
          balance: number | null
          balance_agc: number | null
          balance_ngn: number | null
          balance_usd: number | null
          created_at: string
          currency: string | null
          id: string
          status: string | null
          updated_at: string
          user_id: string
          wallet_code: string | null
        }
        Insert: {
          agc_balance?: number | null
          balance?: number | null
          balance_agc?: number | null
          balance_ngn?: number | null
          balance_usd?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          updated_at?: string
          user_id: string
          wallet_code?: string | null
        }
        Update: {
          agc_balance?: number | null
          balance?: number | null
          balance_agc?: number | null
          balance_ngn?: number | null
          balance_usd?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          wallet_code?: string | null
        }
        Relationships: []
      }
      wash_nominations: {
        Row: {
          admin_notes: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          country: string
          created_at: string
          current_facilities: string | null
          enrollment_total: number | null
          evidence_urls: string[] | null
          girls_enrollment: number | null
          has_disability_access: boolean | null
          has_water_access: boolean | null
          id: string
          needs_categories: string[]
          needs_summary: string
          region: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          school_address: string
          school_name: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          country: string
          created_at?: string
          current_facilities?: string | null
          enrollment_total?: number | null
          evidence_urls?: string[] | null
          girls_enrollment?: number | null
          has_disability_access?: boolean | null
          has_water_access?: boolean | null
          id?: string
          needs_categories?: string[]
          needs_summary: string
          region?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          school_address: string
          school_name: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          country?: string
          created_at?: string
          current_facilities?: string | null
          enrollment_total?: number | null
          evidence_urls?: string[] | null
          girls_enrollment?: number | null
          has_disability_access?: boolean | null
          has_water_access?: boolean | null
          id?: string
          needs_categories?: string[]
          needs_summary?: string
          region?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          school_address?: string
          school_name?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wash_sponsorships: {
        Row: {
          admin_notes: string | null
          amount_pledged: number | null
          created_at: string
          currency: string | null
          id: string
          message: string | null
          organization: string | null
          preferred_country: string | null
          preferred_school_id: string | null
          sponsor_email: string
          sponsor_name: string
          sponsor_phone: string | null
          sponsorship_type: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount_pledged?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          message?: string | null
          organization?: string | null
          preferred_country?: string | null
          preferred_school_id?: string | null
          sponsor_email: string
          sponsor_name: string
          sponsor_phone?: string | null
          sponsorship_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount_pledged?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          message?: string | null
          organization?: string | null
          preferred_country?: string | null
          preferred_school_id?: string | null
          sponsor_email?: string
          sponsor_name?: string
          sponsor_phone?: string | null
          sponsorship_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wash_sponsorships_preferred_school_id_fkey"
            columns: ["preferred_school_id"]
            isOneToOne: false
            referencedRelation: "wash_nominations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_path_role: {
        Args: { _path: string; _user_id: string }
        Returns: undefined
      }
      cleanup_old_partnership_inquiries: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_staff_access: { Args: { _user_id: string }; Returns: boolean }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_dept_manager: {
        Args: { _dept_slug: string; _user_id: string }
        Returns: boolean
      }
      is_room_admin: {
        Args: { _room_id: string; _user_id: string }
        Returns: boolean
      }
      is_room_member: {
        Args: { _room_id: string; _user_id: string }
        Returns: boolean
      }
      log_audit: {
        Args: {
          p_action_type: string
          p_entity_id: string
          p_entity_type: string
          p_new_values?: Json
          p_old_values?: Json
          p_user_id?: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "member"
        | "ambassador"
        | "volunteer"
        | "donor"
        | "partner"
        | "chapter_admin"
        | "admin"
        | "super_admin"
        | "hq_admin"
        | "staff"
        | "division_lead"
        | "board_bot"
        | "board_boa"
        | "board_bod"
        | "lcp"
      chapter_status: "pending" | "active" | "suspended"
      chapter_type: "online" | "hybrid" | "physical"
      room_type:
        | "staff_management"
        | "division"
        | "inter_division"
        | "program"
        | "governance"
        | "lcp_council"
        | "chapter"
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
      app_role: [
        "member",
        "ambassador",
        "volunteer",
        "donor",
        "partner",
        "chapter_admin",
        "admin",
        "super_admin",
        "hq_admin",
        "staff",
        "division_lead",
        "board_bot",
        "board_boa",
        "board_bod",
        "lcp",
      ],
      chapter_status: ["pending", "active", "suspended"],
      chapter_type: ["online", "hybrid", "physical"],
      room_type: [
        "staff_management",
        "division",
        "inter_division",
        "program",
        "governance",
        "lcp_council",
        "chapter",
      ],
    },
  },
} as const
