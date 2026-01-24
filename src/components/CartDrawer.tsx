import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { cartItems, cartTotal, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* ✅ Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* ✅ Drawer */}
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-[#004606]">Your Cart</h3>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-[#004606]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.packSize}`}
                className="flex gap-3 border rounded-xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-[#f2ecdc] rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold text-[#004606]">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.packSize}
                    {item.unit} • ₹{item.price}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.productId, item.packSize)}
                        className="p-1 border rounded-md"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="text-sm font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.productId, item.packSize)}
                        className="p-1 border rounded-md"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.productId, item.packSize)}
                      className="p-2 text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total for item */}
                <div className="text-sm font-bold text-[#004606]">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="text-[#004606]">₹{cartTotal}</span>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full bg-white border border-red-600 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50"
            >
              Clear Cart
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
