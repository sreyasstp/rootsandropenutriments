import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, getPriceForSize } from '../types/Product';

export interface CartItem {
  productId: string;   // UUID
  variantId?: string;
  name: string;
  image: string;
  unit: string;
  packSize: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, packSize: string, quantity: number) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  increaseQty: (productId: string, packSize: string) => void;
  decreaseQty: (productId: string, packSize: string) => void;
  clearCart: () => void;
  /** Merges a guest cart into the current cart (called after login) */
  mergeCart: (guestItems: CartItem[]) => void;
}

const CART_STORAGE_KEY = 'rnr_cart';

const CartContext = createContext<CartContextType | null>(null);

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch { }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadFromStorage);

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(cartItems);
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product: Product, packSize: string, quantity: number) => {
    const variant = product.product_variants.find((v) => v.pack_size === packSize);
    const price = variant?.price ?? getPriceForSize(product, packSize);

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.packSize === packSize
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.packSize === packSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant?.id,
          name: product.name,
          image: product.image ?? '',
          unit: product.unit ?? '',
          packSize,
          price,
          quantity,
        },
      ];
    });
  };

  /**
   * Merge guest cart into current cart.
   * If a guest item already exists (same productId + packSize), quantities are summed.
   * Called by AuthContext right after login.
   */
  const mergeCart = (guestItems: CartItem[]) => {
    if (!guestItems.length) return;
  
    setCartItems((prev) => {
      const merged = [...prev];
  
      guestItems.forEach((guestItem) => {
        const existingIndex = merged.findIndex(
          (i) =>
            i.productId === guestItem.productId &&
            i.packSize === guestItem.packSize
        );
  
        if (existingIndex !== -1) {
          // 🔥 Prevent stacking — keep highest qty only
          merged[existingIndex] = {
            ...merged[existingIndex],
            quantity: Math.max(
              merged[existingIndex].quantity,
              guestItem.quantity
            ),
          };
        } else {
          merged.push(guestItem);
        }
      });
  
      return merged;
    });
  };
  const removeFromCart = (productId: string, packSize: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.packSize === packSize))
    );
  };

  const increaseQty = (productId: string, packSize: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.packSize === packSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId: string, packSize: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.packSize === packSize
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        mergeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}