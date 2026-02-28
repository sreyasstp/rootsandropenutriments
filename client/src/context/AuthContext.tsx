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

    const safeLoadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          await supabase.auth.signOut();
          return;
        }

        // Validate session by calling Supabase
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
          console.warn("Invalid session detected. Clearing...");
          await supabase.auth.signOut();
          localStorage.clear();
          return;
        }

        if (!isMounted) return;

        setSession(data.session);
        setUser(userData.user);

        await createUserIfNotExists(userData.user);

      } catch (err) {
        console.error("Auth recovery failed:", err);
        await supabase.auth.signOut();
        localStorage.clear();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    safeLoadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (event === 'TOKEN_REFRESH_FAILED') {
          console.warn("Token refresh failed. Resetting auth...");
          await supabase.auth.signOut();
          localStorage.clear();
          window.location.reload();
          return;
        }

        if (event === 'SIGNED_OUT') {
          localStorage.clear();
          setUser(null);
          setSession(null);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          await createUserIfNotExists(session.user);

          if (guestCartRef.current.length > 0) {
            mergeCart(guestCartRef.current);
            guestCartRef.current = [];
          }

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
  }, []);

  const login = async () => {
    guestCartRef.current = cartItems;
    await signInWithGoogle();
  };

  const logout = async () => {
    await signOut();
    localStorage.clear();
    sessionStorage.clear();
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