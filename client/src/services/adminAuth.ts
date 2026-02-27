import { supabase } from "./supabaseClient";

/**
 * Admin login using Supabase email/password auth.
 * The admin must exist in Supabase Auth (not just the admins table).
 * Create admins via: supabase.auth.admin.createUser() or Supabase dashboard.
 */
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function adminLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getAdminSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}