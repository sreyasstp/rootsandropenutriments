import { supabase } from "./supabaseClient";

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
    id: string;
    product_name: string;
    pack_size: string;
    unit: string | null;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    id: string;
    user_id: string;
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    total_amount: number;
    shipping_name: string | null;
    shipping_phone: string | null;
    shipping_address: string | null;
    shipping_city: string | null;
    shipping_state: string | null;
    shipping_pincode: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    order_items?: OrderItem[];
    // joined from users table
    users?: { name: string | null; email: string | null };
}

export async function getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (*),
      users (name, email)
    `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? []) as Order[];
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    const { error } = await supabase
        .from('orders')
        .update({ order_status: status })
        .eq('id', id);

    if (error) throw error;
}

export async function updatePaymentStatus(id: string, status: PaymentStatus): Promise<void> {
    const { error } = await supabase
        .from('orders')
        .update({ payment_status: status })
        .eq('id', id);

    if (error) throw error;
}

// Dashboard stats
export async function getDashboardStats() {
    const [ordersRes, usersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('id, total_amount, order_status'),
        supabase.from('users').select('id'),
        supabase.from('products').select('id').eq('is_active', true),
    ]);

    const orders = ordersRes.data ?? [];
    const totalRevenue = orders
        .filter((o) => o.order_status !== 'cancelled' && o.order_status !== 'refunded')
        .reduce((sum, o) => sum + Number(o.total_amount), 0);

    return {
        totalOrders: orders.length,
        totalCustomers: usersRes.data?.length ?? 0,
        totalProducts: productsRes.data?.length ?? 0,
        totalRevenue,
    };
}