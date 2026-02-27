import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

export default function GoogleLoginButton() {
  const { login, loading } = useAuth();

  return (
    <button
      onClick={login}
      disabled={loading}
      className="flex items-center justify-center p-2 text-[#004606] hover:text-[#005708] disabled:opacity-60 transition-colors"
      title="Sign in"
    >
      <User className="w-5 h-5" />
    </button>
  );
}