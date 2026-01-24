import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cartText = useMemo(() => {
    return cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.packSize}${item.unit}) x${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");
  }, [cartItems]);

  const handleWhatsAppCheckout = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill name, phone and address ✅");
      return;
    }

    const message = `Hi Roots & Rope 👋

I want to place an order ✅

Customer Details:
Name: ${name}
Phone: ${phone}
Address: ${address}

Order Items:
${cartText}

Total Amount: ₹${cartTotal}
`;

    const whatsappUrl = `https://wa.me/917012426181?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    // ✅ Optional: clear cart after order click
    // clearCart();
  };

  return (
    <div className="min-h-[80vh] bg-[#f2ecdc]/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#004606] mb-6">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* ✅ Left: Cart Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#004606] mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.packSize}`}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold text-[#004606]">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.packSize}
                        {item.unit} • Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#004606]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#004606]">₹{cartTotal}</span>
              </div>

              <button
                onClick={clearCart}
                className="mt-6 w-full border border-red-600 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>

            {/* ✅ Right: Customer Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#004606] mb-4">
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#004606]/30"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#004606]/30"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Full Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#004606]/30"
                    placeholder="Enter delivery address"
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#004606] hover:bg-[#006609] text-white font-bold py-3 rounded-lg transition-all duration-300"
                >
                  Place Order on WhatsApp ✅
                </button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to WhatsApp to confirm your order.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
