import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { CheckCircle, Truck, Package, FileText, ArrowRight } from "lucide-react";

interface OrderConfirmState {
    orderId: string;
    paymentMethod: "cod" | "online";
    total: number;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export function OrderConfirmPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as OrderConfirmState;

    const [orderItems, setOrderItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect if no state (direct page visit)
    useEffect(() => {
        if (!state?.orderId) {
            navigate("/");
            return;
        }

        // Fetch order items
        const fetchOrderItems = async () => {
            try {
                const { data, error: fetchError } = await supabase
                    .from("order_items")
                    .select("*")
                    .eq("order_id", state.orderId);

                if (fetchError) throw fetchError;
                setOrderItems(data || []);
            } catch (err: any) {
                console.error("Error fetching order items:", err);
                setError("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderItems();
    }, [state, navigate]);

    if (!state) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-[80vh] bg-[#f2ecdc]/30 py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#004606]/20 border-t-[#004606] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-[#f2ecdc]/30 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Header */}
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#004606] mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-4">
                        Thank you for your order. We've received it and will process it shortly.
                    </p>
                    <div className="bg-[#004606]/5 rounded-lg px-4 py-3 inline-block">
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="text-lg font-bold text-[#004606] font-mono">

                            #{state.orderId.slice(0, 8).toUpperCase()}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Package className="w-5 h-5 text-[#004606]" />
                                <h2 className="text-lg font-bold text-[#004606]">Order Items</h2>
                            </div>

                            <div className="space-y-4">
                                {orderItems.length > 0 ? (
                                    orderItems.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{item.product_name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.pack_size}
                                                    {item.unit} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-[#004606]">₹{item.subtotal?.toLocaleString("en-IN") || (item.price * item.quantity).toLocaleString("en-IN")}</p>
                                                <p className="text-xs text-gray-500">₹{item.price} each</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No items found</p>
                                )}
                            </div>

                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-gray-900">Total Amount</p>
                                    <p className="text-2xl font-bold text-[#004606]">
                                        ₹{state.total.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Truck className="w-5 h-5 text-[#004606]" />
                                <h2 className="text-lg font-bold text-[#004606]">Delivery Address</h2>
                            </div>

                            <div className="bg-[#f2ecdc]/30 rounded-lg p-4 space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-semibold text-gray-900">{state.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-semibold text-gray-900">{state.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Address</p>
                                    <p className="font-semibold text-gray-900">{state.address}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">City</p>
                                        <p className="font-semibold text-gray-900">{state.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">State</p>
                                        <p className="font-semibold text-gray-900">{state.state || "—"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Pincode</p>
                                        <p className="font-semibold text-gray-900">{state.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FileText className="w-5 h-5 text-[#004606]" />
                                <h2 className="text-lg font-bold text-[#004606]">Payment Method</h2>
                            </div>

                            <div className="flex items-center gap-3 bg-[#f2ecdc]/30 rounded-lg p-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 bg-orange-600 rounded-full" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {state.paymentMethod === "cod"
                                            ? "Cash on Delivery"
                                            : "Online Payment"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {state.paymentMethod === "cod"
                                            ? "Pay when your order arrives"
                                            : "Payment received and verified"}
                                    </p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Order Status Timeline */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
                            <h3 className="font-bold text-[#004606] mb-6">What's Next?</h3>

                            <div className="space-y-4">
                                {[
                                    {
                                        step: 1,
                                        title: "Order Confirmed",
                                        description: "Your order has been confirmed",
                                        done: true,
                                    },
                                    {
                                        step: 2,
                                        title: "Processing",
                                        description: "We're preparing your items",
                                        done: false,
                                    },
                                    {
                                        step: 3,
                                        title: "Shipped",
                                        description: "Your order is on the way",
                                        done: false,
                                    },
                                    {
                                        step: 4,
                                        title: "Delivered",
                                        description: "Order at your doorstep",
                                        done: false,
                                    },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${item.done
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                                    }`}
                                            >
                                                {item.done ? "✓" : item.step}
                                            </div>
                                            {idx < 3 && (
                                                <div
                                                    className={`w-0.5 h-8 ${item.done ? "bg-green-500" : "bg-gray-200"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p
                                                className={`font-semibold text-sm ${item.done ? "text-gray-900" : "text-gray-600"
                                                    }`}
                                            >
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                <p className="text-xs text-blue-900">
                                    <span className="font-semibold">Note:</span> You'll receive SMS/Email updates
                                    about your order status at <span className="font-mono">{state.phone}</span>.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mt-6">
                                <button
                                    onClick={() => navigate("/orders")}
                                    className="w-full bg-[#004606] hover:bg-[#006609] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    View My Orders
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full border-2 border-[#004606] text-[#004606] font-bold py-3 rounded-xl hover:bg-[#004606]/5 transition"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
                    <p className="text-sm text-gray-600 text-center">
                        Need help?{" "}
                        <a href="mailto:support@rootsandropenutriment.com" className="text-[#004606] font-semibold hover:underline">
                            Contact Support
                        </a>
                        {" "}or call{" "}
                        <a href="tel:+919876543210" className="text-[#004606] font-semibold hover:underline">
                            +91 98765 43210
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}