import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const { login } = useAuth();

  const onSuccess = async (cred: any) => {
    try {
      const data = await googleLoginApi(cred.credential);
      login(data);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => console.log("Google Login Failed")}
      size="medium"
    />
  );
}
