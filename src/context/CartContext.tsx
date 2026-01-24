import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  productId: number;
  name: string;
  image: string;
  category: string;

  packSize: string;
  unit: string;
  price: number;

  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;

  addToCart: (product: Product, selectedPackSize: string, quantity?: number) => void;
  removeFromCart: (productId: number, packSize: string) => void;

  increaseQty: (productId: number, packSize: string) => void;
  decreaseQty: (productId: number, packSize: string) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "roots_rope_cart_v1";

const getPriceByPackSize = (product: Product, packSize: string): number => {
  const index = product.packSizes.findIndex((p) => p === packSize);
  if (index === -1) return product.prices[0];
  return product.prices[index];
};

// ✅ Lazy load cart from localStorage (NO RESET issue)
const loadCartFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage);

  // ✅ Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = (product: Product, selectedPackSize: string, quantity: number = 1) => {
    const price = getPriceByPackSize(product, selectedPackSize);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (x) => x.productId === product.id && x.packSize === selectedPackSize
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          packSize: selectedPackSize,
          unit: product.unit,
          price,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId: number, packSize: string) => {
    setCartItems((prev) => prev.filter((x) => !(x.productId === productId && x.packSize === packSize)));
  };

  const increaseQty = (productId: number, packSize: string) => {
    setCartItems((prev) =>
      prev.map((x) =>
        x.productId === productId && x.packSize === packSize
          ? { ...x, quantity: x.quantity + 1 }
          : x
      )
    );
  };

  const decreaseQty = (productId: number, packSize: string) => {
    setCartItems((prev) =>
      prev
        .map((x) =>
          x.productId === productId && x.packSize === packSize
            ? { ...x, quantity: x.quantity - 1 }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const value: CartContextType = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
