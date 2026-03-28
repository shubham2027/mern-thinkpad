import api from "./axios";
import { setToken } from "./auth";

export const handleGoogleCredential = async (credentialResponse) => {
  // Handle different possible response structures
  const idToken = 
    credentialResponse?.credential || // Standard Google response
    credentialResponse?.id_token ||  // Alternative structure
    credentialResponse;               // Raw token if passed directly

  if (!idToken || typeof idToken !== "string" || !idToken.trim()) {
    console.error("No valid token found in response:", credentialResponse);
    return { 
      success: false, 
      message: "Google credential is missing. Please try again." 
    };
  }

  try {
    const res = await api.post("/auth/google", { idToken });
    setToken(res.data.token);
    return { success: true, user: res.data.user };
  } catch (error) {
    console.error("Google auth error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Google sign in failed"
    };
  }
};