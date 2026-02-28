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
  const mergeCartRef = useRef(mergeCart);

  useEffect(() => {
    mergeCartRef.current = mergeCart;
  }, [mergeCart]);

  useEffect(() => {
    if (!user) guestCartRef.current = cartItems;
  }, [cartItems, user]);

  useEffect(() => {
    console.log("🟡 AuthProvider mounted");

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🟢 Auth Event:", event);
        console.log("🟢 Session:", session);

        if (event === 'TOKEN_REFRESH_FAILED') {
          console.warn('🔴 Token refresh failed');
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_OUT') {
          console.log("🔵 SIGNED_OUT");
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log("🟢 User found:", session.user.email);
          setSession(session);
          setUser(session.user);

          try {
            console.log("🟡 Creating user if not exists...");
            await createUserIfNotExists(session.user);
            console.log("🟢 User sync done");
          } catch (e) {
            console.error("🔴 createUserIfNotExists failed:", e);
          }
        }

        if (event === 'SIGNED_IN' && session?.user) {
          console.log("🟢 SIGNED_IN — merging cart");

          if (guestCartRef.current.length > 0) {
            console.log("🟡 Merging guest cart:", guestCartRef.current);
            mergeCartRef.current(guestCartRef.current);
            guestCartRef.current = [];
          }

          const redirect = sessionStorage.getItem('post_login_redirect');
          if (redirect) {
            console.log("🟡 Redirecting to:", redirect);
            sessionStorage.removeItem('post_login_redirect');
            setTimeout(() => window.location.replace(redirect), 100);
          }
        }

        console.log("🟢 Auth event handled → loading false");
        setLoading(false);
      }
    );

    const handleOAuthRedirect = async () => {
      try {
        console.log("🟡 Checking OAuth redirect...");

        const url = new URL(window.location.href);
        const hasOAuthCode =
          url.searchParams.get('code') || url.hash.includes('access_token');

        console.log("🟡 hasOAuthCode:", hasOAuthCode);

        if (hasOAuthCode) {
          console.log("🟡 Exchanging code for session...");
          const res = await supabase.auth.exchangeCodeForSession(window.location.href);
          console.log("🟢 exchangeCodeForSession result:", res);

          window.history.replaceState({}, document.title, url.pathname);
        } else {
          console.log("🟡 No OAuth redirect — checking session");

          const { data: { session } } = await supabase.auth.getSession();

          console.log("🟢 Existing session:", session);

          if (!session) {
            console.log("🔴 No session found");
            setLoading(false);
          } else {
            console.log("🟢 Session exists — waiting for INITIAL_SESSION event");
          }
        }
      } catch (err) {
        console.error('🔴 Auth recovery failed:', err);
        setLoading(false);
      }
    };

    handleOAuthRedirect();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    console.log("🟡 Login started");
    guestCartRef.current = cartItems;
    await signInWithGoogle();
  };

  const logout = async () => {
    console.log("🟡 Logout started");
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