import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Send, User, Loader2, Lock, Bell, ShieldAlert, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../lib/axios";

const AccountSettings = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("UI/UX Improvement");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.log("Error loading profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in subject and message");
      return;
    }

    setSendingFeedback(true);
    setTimeout(() => {
      toast.success("Feedback sent successfully (Simulated)");
      setSubject("");
      setMessage("");
      setSendingFeedback(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-void-black text-pure-white overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[10%] w-[500px] h-[500px] bg-electric-sky/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-28 px-4 md:px-8 pb-16 min-h-screen flex justify-center relative z-10 select-none">
        <div className="w-full max-w-[840px]">
          
          {/* Header Section */}
          <div className="mb-10 pb-6 border-b border-outline/30">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite/60 border border-outline text-ash text-xs font-mono mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-electric-sky" />
              <span>User Dashboard</span>
            </div>
            <h1 className="font-sans text-3xl md:text-4xl text-pure-white font-semibold tracking-tight mb-2">
              Account Settings
            </h1>
            <p className="font-sans text-ash text-sm">
              Manage your profile identity, platform preferences, and send platform feedback.
            </p>
          </div>

          {loadingUser && (
            <div className="py-24 text-center text-primary font-mono flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading profile settings...</span>
            </div>
          )}

          {!loadingUser && user && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Profile Card */}
              <div className="md:col-span-5 lg:col-span-4 sticky top-28">
                <div className="border border-outline/70 rounded-2xl p-6 bg-ink/90 backdrop-blur-xl flex flex-col items-center text-center space-y-4 hover:border-primary/40 transition-all key-shadow group">
                  
                  {/* Avatar Ring */}
                  <div className="relative select-text">
                    <div className="w-24 h-24 rounded-full border-2 border-primary/40 p-1 group-hover:border-primary transition-colors shadow-[0_0_20px_rgba(255,99,99,0.2)]">
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-obsidian flex items-center justify-center text-ash">
                          <User className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-sans text-lg font-semibold text-pure-white">{user.name || "Mindscribe User"}</h2>
                    <p className="font-mono text-xs text-ash tracking-tight truncate max-w-[170px] mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-outline/40 flex flex-col items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-success-green font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Account
                    </span>
                    <span className="font-mono text-[11px] text-smoke">
                      Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}
                    </span>
                  </div>

                  <button 
                    onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
                    className="w-full py-2.5 border border-outline/70 rounded-xl font-sans text-xs key-shadow bg-obsidian hover:bg-ink hover:text-pure-white transition-all cursor-pointer text-ash hover:border-primary/30"
                  >
                    Manage Subscription
                  </button>
                </div>
              </div>

              {/* Right Column: Feedback & Sub-sections */}
              <div className="md:col-span-7 lg:col-span-8 space-y-6">
                
                {/* Feedback Form */}
                <section className="bg-ink/90 backdrop-blur-xl rounded-2xl p-6 border border-outline/70 key-shadow select-text">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-sans text-lg font-medium text-pure-white">Send Feedback</h3>
                  </div>

                  <form onSubmit={handleSubmitFeedback} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] text-smoke px-1">Subject</label>
                        <input
                          type="text"
                          className="bg-obsidian/80 border border-outline/80 rounded-xl px-4 py-2.5 text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all placeholder:text-ash/30"
                          placeholder="e.g. Feature Suggestion"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] text-smoke px-1">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="bg-obsidian/80 border border-outline/80 rounded-xl px-4 py-2.5 text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                        >
                          <option>UI/UX Improvement</option>
                          <option>Bug Report</option>
                          <option>Performance</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] text-smoke px-1">Detailed Message</label>
                      <textarea
                        rows="4"
                        className="bg-obsidian/80 border border-outline/80 rounded-xl px-4 py-2.5 text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all resize-none placeholder:text-ash/30"
                        placeholder="Describe your experience or suggestion in detail..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-[10px] text-smoke">
                        System logs attached automatically
                      </span>
                      <button
                        type="submit"
                        disabled={sendingFeedback}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary via-coral-pulse to-primary hover:opacity-95 text-pure-white px-5 py-2.5 rounded-xl font-sans text-xs font-medium transition-all active:scale-95 shadow-[0_0_15px_rgba(255,99,99,0.3)] cursor-pointer select-none disabled:opacity-50"
                      >
                        {sendingFeedback ? "Sending..." : "Submit Feedback"}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </section>

                {/* Sub-sections */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
                    className="bg-ink/80 backdrop-blur-xl p-4 rounded-2xl border border-outline/70 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all key-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-obsidian border border-outline/60 text-ash">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-pure-white">Security</p>
                        <p className="text-[11px] text-smoke">Password & credentials</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ash group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div 
                    onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
                    className="bg-ink/80 backdrop-blur-xl p-4 rounded-2xl border border-outline/70 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all key-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-obsidian border border-outline/60 text-ash">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-pure-white">Notifications</p>
                        <p className="text-[11px] text-smoke">Email preferences</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ash group-hover:translate-x-1 transition-transform" />
                  </div>
                </section>

                {/* Danger Zone */}
                <section className="pt-6 border-t border-outline/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-coral-pulse/10 text-coral-pulse">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-coral-pulse font-semibold uppercase tracking-wider">Danger Zone</h4>
                      <p className="text-[11px] text-smoke">Permanently delete account and all note data</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
                    className="px-4 py-2 border border-coral-pulse/40 text-coral-pulse hover:bg-coral-pulse/10 rounded-xl font-sans text-xs transition-colors cursor-pointer select-none"
                  >
                    Delete Account
                  </button>
                </section>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
