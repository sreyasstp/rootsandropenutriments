import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { signInWithGoogle, signOut } from '../services/authApi';
import { useCart } from './CartContext';
import { supabase } from '../services/supabaseClient';
import { createUserIfNotExists } from '../services/customersApi';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const { mergeCart, cartItems } = useCart();

  // Keep a snapshot of the guest cart so we can merge it after login.
  // We use a ref so the auth listener closure doesn't go stale.
  const guestCartRef = useRef(cartItems);
  useEffect(() => {
    if (!user) guestCartRef.current = cartItems;
  }, [cartItems, user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN') {
        if (session?.user) {
          // Create customer row on first sign-in. Safe to call every time — idempotent.
          createUserIfNotExists(session.user);
        }

        // Merge whatever was in the guest cart into the now-authenticated cart
        if (guestCartRef.current.length > 0) {
          mergeCart(guestCartRef.current);
          guestCartRef.current = [];
        }

        // Honour any post-login redirect (e.g. from Buy Now)
        const redirect = sessionStorage.getItem('post_login_redirect');
        if (redirect) {
          sessionStorage.removeItem('post_login_redirect');
          // Small delay so the auth state settles first
          setTimeout(() => window.location.replace(redirect), 100);
        }
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async () => {
    guestCartRef.current = cartItems; // snapshot before redirect
    await signInWithGoogle();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}