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

  // Snapshot of guest cart before login
  const guestCartRef = useRef(cartItems);

  // 🔥 Guard to prevent multiple merges
  const hasMergedCartRef = useRef(false);

  useEffect(() => {
    if (!user) {
      guestCartRef.current = cartItems;
    }
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
          createUserIfNotExists(session.user);
        }

        // ✅ Merge guest cart ONLY ONCE
        if (!hasMergedCartRef.current && guestCartRef.current.length > 0) {
          mergeCart(guestCartRef.current);

          // Clear guest snapshot + localStorage to prevent re-merging
          guestCartRef.current = [];
          localStorage.removeItem('rnr_cart');

          hasMergedCartRef.current = true;
        }

        // Post-login redirect
        const redirect = sessionStorage.getItem('post_login_redirect');
        if (redirect) {
          sessionStorage.removeItem('post_login_redirect');
          setTimeout(() => window.location.replace(redirect), 100);
        }
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async () => {
    guestCartRef.current = cartItems; // snapshot before redirect
    hasMergedCartRef.current = false; // allow merge for this login
    await signInWithGoogle();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setSession(null);
    hasMergedCartRef.current = false; // allow merge next login
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