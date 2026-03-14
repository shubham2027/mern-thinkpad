import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { isAuthenticated, setToken } from "../lib/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { email, password });
      setToken(res.data.token);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-200 shadow-lg w-full max-w-md">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Create account</h2>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="At least 6+ chars recommended"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary mt-2" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="text-sm text-base-content/70">
            Already have an account? <Link to="/login" className="link link-primary">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;