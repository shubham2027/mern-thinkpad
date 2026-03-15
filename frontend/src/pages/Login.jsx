import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { isAuthenticated, setToken } from "../lib/auth";


const Login = () => {
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
const res = await api.post("/auth/login", { email, password });
setToken(res.data.token);
toast.success("Signed in successfully");
navigate("/");
} catch (error) {
console.error("Login error:", error);
toast.error(error?.response?.data?.message || "Failed to sign in");
} finally {
setLoading(false);
}
};

return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
            <div className="pointer-events-none absolute inset-0 -z-0">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl" />
                <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <h1 className="mb-4 text-center text-3xl font-bold tracking-tighter text-primary font-mono">
                    Mindscribe
                </h1>
                <div className="card w-full border border-white/15 bg-base-100/35 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl">
                    <div className="card-body gap-4">

        <h2 className="card-title text-2xl">Sign in</h2>

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
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <button className="btn btn-primary mt-2" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-base-content/70">
        New here? <Link to="/signup" className="link link-primary">Create an account</Link>
        </p>
                    </div>
                </div>
            </div>
        </div>
);
};

export default Login;