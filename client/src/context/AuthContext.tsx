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

  // store guest cart before login
  useEffect(() => {
    if (!user) guestCartRef.current = cartItems;
  }, [cartItems, user]);

  useEffect(() => {
    const safeLoadSession = async () => {
      try {
        const url = new URL(window.location.href);
        const hasOAuthCode =
          url.searchParams.get("code") ||
          url.hash.includes("access_token");

        // ⭐ ONLY run this after Google redirect
        if (hasOAuthCode) {
          await supabase.auth.exchangeCodeForSession(window.location.href);
          window.history.replaceState({}, document.title, url.pathname);
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(user);

        await createUserIfNotExists(user);

      } catch (err) {
        console.error("Auth recovery failed:", err);
      } finally {
        setLoading(false);
      }
    };

    safeLoadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (event === 'TOKEN_REFRESH_FAILED') {
          console.warn("Token refresh failed");
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          return;
        }

        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session?.user) {
          await createUserIfNotExists(session.user);

          // merge guest cart
          if (guestCartRef.current.length > 0) {
            mergeCart(guestCartRef.current);
            guestCartRef.current = [];
          }

          // post login redirect
          const redirect = sessionStorage.getItem('post_login_redirect');
          if (redirect) {
            sessionStorage.removeItem('post_login_redirect');
            setTimeout(() => window.location.replace(redirect), 100);
          }
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    guestCartRef.current = cartItems;
    await signInWithGoogle();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setSession(null);
    sessionStorage.clear();
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