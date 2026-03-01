import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },

    global: {
      fetch: async (url, options = {}) => {

        try {
          // 🔥 Ensure session exists before every request
          const { data } = await supabase.auth.getSession();

          if (!data.session) {
            const { error } = await supabase.auth.refreshSession();

            // If refresh fails → logout silently
            if (error) {
              await supabase.auth.signOut();
            }
          }
        } catch (e) {
          console.warn('Session recovery failed', e);
        }

        return fetch(url, options);
      }
    }
  }
);