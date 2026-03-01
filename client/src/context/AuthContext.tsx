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

  // Prevent multiple merges
  const hasMergedCartRef = useRef(false);

  // Save guest cart until login
  useEffect(() => {
    if (!user) {
      guestCartRef.current = cartItems;
    }
  }, [cartItems, user]);

  // Refresh session when tab wakes up (idle fix)
  useEffect(() => {
    const handleFocus = async () => {
      try {
        await supabase.auth.refreshSession();
      } catch {}
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // 🔥 MAIN AUTH INIT (Correct order)
  useEffect(() => {

    const initAuth = async () => {

      // 1️⃣ Handle OAuth redirect FIRST
      const { data: urlSession } = await supabase.auth.getSessionFromUrl();

      if (urlSession?.session) {
        setSession(urlSession.session);
        setUser(urlSession.session.user);

        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2️⃣ Restore existing session
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    initAuth();

    // 3️⃣ Attach listener AFTER init
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {

      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN') {

        if (session?.user) {
          await createUserIfNotExists(session.user);
        }

        if (!hasMergedCartRef.current && guestCartRef.current.length > 0) {
          mergeCart(guestCartRef.current);
          guestCartRef.current = [];
          localStorage.removeItem('rnr_cart');
          hasMergedCartRef.current = true;
        }

        const redirect = sessionStorage.getItem('post_login_redirect');
        if (redirect) {
          sessionStorage.removeItem('post_login_redirect');
          setTimeout(() => window.location.replace(redirect), 100);
        }
      }

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }

    });

    return () => listener.subscription.unsubscribe();

  }, []);

  const login = async () => {
    guestCartRef.current = cartItems;
    hasMergedCartRef.current = false;
    await signInWithGoogle();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setSession(null);
    hasMergedCartRef.current = false;
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