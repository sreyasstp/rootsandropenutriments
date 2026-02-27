import { X, Plus, Minus, Trash2, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { cartItems, cartTotal, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const { user, login } = useAuth();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    if (user) {
      navigate('/checkout');
    } else {
      sessionStorage.setItem('post_login_redirect', '/checkout');
      login();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-[#004606]">
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
              </span>
            )}
          </h3>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-[#004606]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.productId}-${item.packSize}`} className="flex gap-3 border rounded-xl p-3">
                <img
                  src={item.image} alt={item.name}
                  className="w-16 h-16 object-contain bg-[#f2ecdc] rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#004606] text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.packSize}{item.unit} • ₹{item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => decreaseQty(item.productId, item.packSize)} className="p-1 border rounded-md hover:bg-gray-50">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button onClick={() => increaseQty(item.productId, item.packSize)} className="p-1 border rounded-md hover:bg-gray-50">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId, item.packSize)} className="p-1.5 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-bold text-[#004606] flex-shrink-0 pt-1">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-[#004606] text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button onClick={clearCart} className="w-full border border-red-400 text-red-500 font-medium py-2 rounded-lg hover:bg-red-50 text-sm">
              Clear Cart
            </button>

            {!user ? (
              <div className="space-y-1.5">
                <p className="text-xs text-center text-gray-400">Sign in to proceed to checkout</p>
                <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-[#004606] text-white font-semibold py-3 rounded-xl hover:bg-[#006609] transition">
                  <LogIn className="w-4 h-4" />
                  Sign in & Checkout
                </button>
              </div>
            ) : (
              <button onClick={handleCheckout} className="w-full bg-[#004606] hover:bg-[#006609] text-white font-semibold py-3 rounded-xl transition">
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}