import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    fetch: async (url, options = {}) => {

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.access_token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${session.access_token}`,
        };
      }

      return fetch(url, options);
    }
  }
});