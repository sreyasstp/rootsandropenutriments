import { supabase } from "./supabaseClient";

export interface Customer {
    id: string;
    name: string | null;
    email: string | null;
    picture: string | null;
    provider: string;
    created_at: string;
    order_count?: number;
}

export async function getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    // Get order counts per user
    const { data: orderCounts } = await supabase
        .from('orders')
        .select('user_id');

    const countMap: Record<string, number> = {};
    (orderCounts ?? []).forEach((o: any) => {
        countMap[o.user_id] = (countMap[o.user_id] ?? 0) + 1;
    });

    return (data ?? []).map((u: any) => ({
        ...u,
        order_count: countMap[u.id] ?? 0,
    })) as Customer[];
}

export async function createUserIfNotExists(authUser: any) {
    if (!authUser?.email) return;

    // check if already exists
    const { data: existing, error: findError } = await supabase
        .from('users')
        .select('id')
        .eq('email', authUser.email)
        .single();

    if (existing) return existing;

    // create new user
    const { data, error } = await supabase
        .from('users')
        .insert({
            id: authUser.id, // 🔥 IMPORTANT → match Supabase Auth ID
            email: authUser.email,
            name: authUser.user_metadata?.full_name || '',
            picture: authUser.user_metadata?.avatar_url || '',
            provider: authUser.app_metadata?.provider || 'google'
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}
