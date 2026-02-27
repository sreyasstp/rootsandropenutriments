// services/checkoutApi.ts
import { supabase } from "./supabaseClient";

export async function placeCODOrder(orderData: {
    cartItems: any[];
    cartTotal: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}) {
    const { data, error } = await supabase
        .from("orders")
        .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            order_status: "pending",
            payment_status: "pending",
            total_amount: orderData.cartTotal,
            shipping_name: orderData.name,
            shipping_phone: orderData.phone,
            shipping_address: orderData.address,
            shipping_city: orderData.city,
            shipping_state: orderData.state,
            shipping_pincode: orderData.pincode,
            notes: "Cash on Delivery",
        })
        .select("id")
        .single();

    if (error) throw error;

    const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .insert(
            orderData.cartItems.map((item) => ({
                order_id: data.id,
                variant_id: item.variantId ?? null,
                product_name: item.name,
                pack_size: item.packSize,
                unit: item.unit,
                price: item.price,
                quantity: item.quantity,
            }))
        )
        .select("id");

    if (itemsError) throw itemsError;

    return data.id;
}

export async function verifyAndSaveOnlineOrder(orderData: {
    cartItems: any[];
    cartTotal: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}) {
    // ── 1. Verify user is logged in ──────────────────────────────────
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Authentication required. Please sign in again.");
    }

    // ── 2. Call verify function - Supabase SDK handles auth automatically
    const { data, error } = await supabase.functions.invoke(
        "verify-razorpay-payment",
        {
            body: {
                razorpay_order_id: orderData.razorpay_order_id,
                razorpay_payment_id: orderData.razorpay_payment_id,
                razorpay_signature: orderData.razorpay_signature,
                cartItems: orderData.cartItems,
                cartTotal: orderData.cartTotal,
                name: orderData.name,
                phone: orderData.phone,
                address: orderData.address,
                city: orderData.city,
                state: orderData.state,
                pincode: orderData.pincode,
            },
        }
    );

    if (error) {
        console.error("Verify payment error:", error);
        throw error;
    }

    if (!data?.order_id) {
        throw new Error("Failed to save order. Please contact support.");
    }

    return data.order_id;
}