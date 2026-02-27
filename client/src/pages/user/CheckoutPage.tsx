import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { verifyAndSaveOnlineOrder } from "../../services/checkoutApi";
import { supabase } from "../../services/supabaseClient";
import { toast } from "react-toastify";
import { ShoppingBag, CreditCard, AlertCircle } from "lucide-react";
import { openRazorpay, useRazorpayScript } from "../../hooks/useRazorPay";

interface DeliveryForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useRazorpayScript();

  const [form, setForm] = useState<DeliveryForm>({
    name: user?.user_metadata?.full_name ?? "",
    phone: user?.user_metadata?.phone ?? "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [processing, setProcessing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Fetch saved address from user profile
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const { data, error } = await supabase
          .from("users")
          .select("name, phone, address, city, state, pincode")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data) {
          setForm((prev) => ({
            ...prev,
            name: data.name || prev.name,
            phone: data.phone || prev.phone,
            address: data.address || prev.address,
            city: data.city || prev.city,
            state: data.state || prev.state,
            pincode: data.pincode || prev.pincode,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  const set = (k: keyof DeliveryForm, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = (): string | null => {
    if (!user) return "Please sign in to place an order.";
    if (!form.name.trim()) return "Full name is required.";
    if (form.phone.trim().length < 10)
      return "Enter a valid 10-digit phone number.";
    if (!form.address.trim()) return "Delivery address is required.";
    if (!form.city.trim()) return "City is required.";
    if (form.pincode.trim().length < 6)
      return "Enter a valid 6-digit pincode.";
    return null;
  };

  const goConfirm = (orderId: string) => {
    clearCart();
    navigate("/order-confirm", {
      state: { orderId, paymentMethod: "online", total: cartTotal, ...form },
    });
  };

  // Online Payment
  const handleOnlinePayment = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    openRazorpay({
      amount: cartTotal,
      name: form.name,
      phone: form.phone,
      description: `Order — ${cartItems.length} item(s)`,

      onSuccess: async ({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }) => {
        try {
          setProcessing(true);
          goConfirm(
            await verifyAndSaveOnlineOrder({
              cartItems,
              cartTotal,
              ...form,
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            })
          );
        } catch (e: any) {
          toast.error(
            `Payment received (${razorpay_payment_id}) but order save failed. ` +
            `Please contact us with this payment ID.`
          );
        } finally {
          setProcessing(false);
        }
      },

      onFailure: (err) => {
        if (err?.message !== "Payment cancelled")
          toast.error("Payment failed. Please try again.");
      },
    });
  };

  const summary = useMemo(
    () => cartItems.map((i) => ({ ...i, subtotal: i.price * i.quantity })),
    [cartItems]
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#f2ecdc]/30 py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Add some products before checking out.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#004606] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#f2ecdc]/30 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#004606] mb-8">Checkout</h1>

        {!user && (
          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              You need to{" "}
              <button onClick={login} className="font-semibold underline">
                sign in with Google
              </button>{" "}
              before placing an order.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery form */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-[#004606] mb-5">
                Delivery Details
                {loadingProfile && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    (loading saved address…)
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    [
                      "name",
                      "Full Name *",
                      "sm:col-span-2",
                      "Enter your full name",
                      10,
                    ],
                    [
                      "phone",
                      "Phone Number *",
                      "sm:col-span-2",
                      "10-digit mobile number",
                      10,
                    ],
                    [
                      "address",
                      "Address *",
                      "sm:col-span-2",
                      "House no, street, landmark",
                      0,
                    ],
                    ["city", "City *", "", "City", 0],
                    ["pincode", "Pincode *", "", "6-digit pincode", 6],
                    ["state", "State", "sm:col-span-2", "State", 0],
                  ] as [keyof DeliveryForm, string, string, string, number][]
                ).map(([key, label, span, ph, max]) => (
                  <div key={key} className={span}>
                    <label className="text-sm font-semibold text-gray-700 block mb-1">
                      {label}
                    </label>
                    {key === "address" ? (
                      <textarea
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={ph}
                        rows={3}
                        className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#004606]/25 resize-none"
                      />
                    ) : (
                      <input
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={ph}
                        maxLength={max || undefined}
                        className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#004606]/25"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-[#004606] mb-5">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all border-[#004606] bg-[#004606]/5`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={true}
                    readOnly
                    className="accent-[#004606] w-4 h-4"
                  />
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      Pay Online
                    </p>
                    <p className="text-xs text-gray-500">
                      UPI, Cards, Net Banking via Razorpay
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    Razorpay
                  </span>
                </label>
              </div>

              <button
                disabled={processing || !user || loadingProfile}
                onClick={handleOnlinePayment}
                className="mt-6 w-full bg-[#004606] hover:bg-[#006609] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                {processing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" /> Pay ₹
                    {cartTotal.toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                Secured by{" "}
                <span className="text-[#004606] font-medium">Razorpay</span>.
                Your payment details are never stored with us.
              </p>
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#004606] mb-5">
                Order Summary
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
                </span>
              </h2>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {summary.map((item) => (
                  <div
                    key={`${item.productId}-${item.packSize}`}
                    className="flex gap-3"
                  >
                    <div className="w-12 h-12 bg-[#f2ecdc] rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.packSize}
                        {item.unit} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-[#004606] text-sm flex-shrink-0">
                      ₹{item.subtotal}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#004606] pt-2 border-t">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={clearCart}
                className="mt-5 w-full border border-red-400 text-red-500 text-sm font-medium py-2 rounded-lg hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}