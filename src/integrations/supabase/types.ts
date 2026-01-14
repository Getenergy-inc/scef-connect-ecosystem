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
          user_id: string
        }
        Insert: {
          chapter_id: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string
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
      chapters: {
        Row: {
          chapter_type: Database["public"]["Enums"]["chapter_type"]
          city: string | null
          country: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          member_count: number | null
          name: string
          slug: string
          state: string | null
          status: Database["public"]["Enums"]["chapter_status"]
          updated_at: string
        }
        Insert: {
          chapter_type?: Database["public"]["Enums"]["chapter_type"]
          city?: string | null
          country: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          name: string
          slug: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"]
          updated_at?: string
        }
        Update: {
          chapter_type?: Database["public"]["Enums"]["chapter_type"]
          city?: string | null
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          name?: string
          slug?: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"]
          updated_at?: string
        }
        Relationships: []
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
          avatar_url: string | null
          bio: string | null
          chapter_id: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          relationship_to_country: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          chapter_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          relationship_to_country?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          chapter_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
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
          created_at: string
          currency: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agc_balance?: number | null
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agc_balance?: number | null
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          updated_at?: string
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
      is_admin: { Args: { _user_id: string }; Returns: boolean }
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
