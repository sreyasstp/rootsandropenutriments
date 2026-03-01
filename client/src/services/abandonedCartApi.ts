import { supabase } from "./supabaseClient";

export interface AbandonedCart {
  id: string;
  user_id: string;
  cart_items: any[];
  cart_total: number;
  updated_at: string;
  customer?: {
    name?: string;
    email?: string;
    picture?: string;
  };
}

// Save / Update
export async function saveAbandonedCart(
  userId: string,
  cartItems: any[],
  cartTotal: number
) {
  const { error } = await supabase
    .from("abandoned_carts")
    .upsert({
      user_id: userId,
      cart_items: cartItems,
      cart_total: cartTotal,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}

// Clear after order
export async function clearAbandonedCart(userId: string) {
  const { error } = await supabase
    .from("abandoned_carts")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}

// Admin fetch
export async function getAbandonedCarts(): Promise<AbandonedCart[]> {
  const { data, error } = await supabase
    .from("abandoned_carts")
    .select(`
      *,
      customers:user_id (
        name,
        email,
        picture
      )
    `)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((cart: any) => ({
    ...cart,
    customer: cart.customers ?? null
  }));
}