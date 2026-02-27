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