import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";

declare global {
    interface Window { Razorpay: any; }
}

/** Preloads the Razorpay checkout script */
export function useRazorpayScript() {
    useEffect(() => {
        if (document.getElementById("razorpay-script")) return;
        const s = document.createElement("script");
        s.id = "razorpay-script";
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.async = true;
        document.body.appendChild(s);
    }, []);
}

export interface OpenRazorpayOptions {
    amount: number;  // ₹ rupees
    name: string;
    phone: string;
    description?: string;
    onSuccess: (data: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }) => void;
    onFailure: (err: any) => void;
}

/**
 * Secure flow:
 *  1. Edge function creates Razorpay order (secret key stays server-side)
 *  2. Frontend opens modal with returned order_id + publishable key_id
 *  3. On success, all 3 Razorpay fields go back to verify-razorpay-payment
 *     for HMAC signature verification before the order is saved
 *
 * No Razorpay keys live in the frontend .env at all.
 */
export async function openRazorpay(options: OpenRazorpayOptions) {
    if (!window.Razorpay) {
        options.onFailure(new Error("Payment system is loading. Please try again in a moment."));
        return;
    }

    try {
        // ── 1. Create Razorpay order on the server ───────────────────────
        // Simply call the edge function - no JWT headers needed
        const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
            body: { amount: options.amount },
        });

        if (error || !data?.order_id) {
            console.error("Order creation error:", error);
            options.onFailure(error ?? new Error("Failed to initiate payment. Please try again."));
            return;
        }

        const { order_id, amount, currency, key_id } = data;

        // ── 2. Open Razorpay modal ───────────────────────────────────────
        const rzp = new window.Razorpay({
            key: key_id,     // publishable key returned from server — safe in memory
            order_id,
            amount,
            currency,
            name: "Roots & Rope Nutriment",
            description: options.description ?? "Order Payment",
            image: "/roots_logo.jpg",
            prefill: {
                name: options.name,
                contact: options.phone,
            },
            theme: { color: "#004606" },

            // ── 3. Pass all 3 fields to caller for server-side verification ─
            handler: (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) => {
                options.onSuccess(response);
            },

            modal: {
                ondismiss: () => options.onFailure(new Error("Payment cancelled")),
            },
        });

        rzp.on("payment.failed", (response: any) => {
            options.onFailure(response.error);
        });

        rzp.open();
    } catch (err: any) {
        console.error("Razorpay error:", err);
        options.onFailure(err);
    }
}