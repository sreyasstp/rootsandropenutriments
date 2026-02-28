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

  // Keep mergeCartRef current so the listener never has a stale closure
  useEffect(() => {
    mergeCartRef.current = mergeCart;
  }, [mergeCart]);

  // Store guest cart while logged out
  useEffect(() => {
    if (!user) guestCartRef.current = cartItems;
  }, [cartItems, user]);

  useEffect(() => {
    // Register listener FIRST so no auth events are missed
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'TOKEN_REFRESH_FAILED') {
          console.warn('Token refresh failed');
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await createUserIfNotExists(session.user);
        }

        if (event === 'SIGNED_IN' && session?.user) {
          // Merge guest cart into logged-in cart
          if (guestCartRef.current.length > 0) {
            mergeCartRef.current(guestCartRef.current);
            guestCartRef.current = [];
          }

          // Post-login redirect
          const redirect = sessionStorage.getItem('post_login_redirect');
          if (redirect) {
            sessionStorage.removeItem('post_login_redirect');
            setTimeout(() => window.location.replace(redirect), 100);
          }
        }

        // Always mark loading done after we've handled the event
        setLoading(false);
      }
    );

    // Handle OAuth redirect, then let the listener above react to the session change
    const handleOAuthRedirect = async () => {
      try {
        const url = new URL(window.location.href);
        const hasOAuthCode =
          url.searchParams.get('code') || url.hash.includes('access_token');

        if (hasOAuthCode) {
          // This will trigger SIGNED_IN in the listener above, which sets loading=false
          await supabase.auth.exchangeCodeForSession(window.location.href);
          window.history.replaceState({}, document.title, url.pathname);
        } else {
          // No OAuth redirect — check for an existing session
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            // No session at all, nothing to wait for
            setLoading(false);
          }
          // If a session exists, onAuthStateChange fires INITIAL_SESSION and handles it
        }
      } catch (err) {
        console.error('Auth recovery failed:', err);
        setLoading(false);
      }
    };

    handleOAuthRedirect();

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