import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import api from "../lib/axios";
import { isAuthenticated, setToken } from "../lib/auth";
import { handleGoogleCredential } from "../lib/googleAuth";
import AuthLayout from "../components/AuthLayout";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { email, password });
      setToken(res.data.token);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    const result = await handleGoogleCredential(credentialResponse);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Account created with Google");
    navigate("/");
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Mindscribe to experience frictionless notes and interactive canvas whiteboards."
      switchText="Already have an account?"
      switchLinkText="Sign in"
      switchLinkTo="/login"
    >
      <div className="bg-ink/90 border border-outline/70 rounded-2xl key-shadow p-6 sm:p-8 w-full backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-smoke uppercase tracking-wider px-1 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-primary" />
              <span>Email Address</span>
            </label>
            <div className="relative group">
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-obsidian/80 border border-outline/80 rounded-xl px-4 py-3 text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all w-full placeholder:text-ash/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <label className="font-mono text-[11px] text-smoke uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-primary" />
                <span>Password</span>
              </label>
              <span className="font-mono text-[10px] text-smoke">6+ characters</span>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                className="bg-obsidian/80 border border-outline/80 rounded-xl pl-4 pr-11 py-3 text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all w-full placeholder:text-ash/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ash hover:text-pure-white transition-colors cursor-pointer p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-primary" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Features indicator */}
          <div className="p-3 rounded-xl bg-obsidian/60 border border-outline/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-ash">
              <CheckCircle className="w-3.5 h-3.5 text-success-green flex-shrink-0" />
              <span>Free tier includes unlimited notes & whiteboards</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ash">
              <CheckCircle className="w-3.5 h-3.5 text-success-green flex-shrink-0" />
              <span>Instant cloud synchronization</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-primary via-coral-pulse to-primary hover:opacity-95 text-pure-white px-5 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,99,99,0.3)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline/40" />
          </div>
          <span className="relative bg-ink px-3 font-mono text-[10px] text-smoke uppercase tracking-widest">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Google OAuth */}
        <div className="flex justify-center select-none rounded-xl overflow-hidden p-1 bg-obsidian border border-outline/60 hover:border-outline transition-colors">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => toast.error("Google signup failed")}
            theme="filled_black"
            shape="pill"
            width="100%"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;