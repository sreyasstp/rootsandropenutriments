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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const { mergeCart, cartItems } = useCart();
  const guestCartRef = useRef(cartItems);

  // Store guest cart before login
  useEffect(() => {
    if (!user) guestCartRef.current = cartItems;
  }, [cartItems, user]);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await createUserIfNotExists(session.user);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          await createUserIfNotExists(session.user);

          // Merge guest cart
          if (guestCartRef.current.length > 0) {
            mergeCart(guestCartRef.current);
            guestCartRef.current = [];
          }

          // Redirect after login
          const redirect = sessionStorage.getItem('post_login_redirect');
          if (redirect) {
            sessionStorage.removeItem('post_login_redirect');
            setTimeout(() => window.location.replace(redirect), 100);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []); // intentionally empty

  const login = async () => {
    guestCartRef.current = cartItems;
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
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};