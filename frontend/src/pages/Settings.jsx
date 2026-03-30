import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon, LoaderIcon, MailIcon, SendIcon, UserCircle2Icon } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../lib/axios";

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ;

const Settings = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState("");
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
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", subject.trim());
      formData.append("message", message.trim());
      formData.append("from_name", user?.name?.trim() || "Mindscribe User");
      formData.append("email", user?.email?.trim() || "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send feedback");
      }

      toast.success("Feedback sent successfully");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log("Error sending feedback:", error);
      toast.error(error?.message || "Failed to send feedback");
    } finally {
      setSendingFeedback(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto mt-6 max-w-5xl p-4">
        <Link to="/" className="btn btn-ghost mb-4">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-base-100/35 p-5 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl md:p-6">
            <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>

            {loadingUser && (
              <div className="py-6 text-center text-primary">
                <LoaderIcon className="mx-auto mb-2 size-6 animate-spin" />
                Loading profile...
              </div>
            )}

            {!loadingUser && user && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="h-14 w-14 rounded-full border border-base-content/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-base-content/20 bg-base-100/60">
                      <UserCircle2Icon className="size-8" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user.name || "User"}</p>
                    <p className="text-sm text-base-content/70">{user.email}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-base-content/10 bg-base-100/50 p-4">
                  <p className="text-sm text-base-content/60">Member Since</p>
                  <p className="font-medium">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmitFeedback}
            className="rounded-3xl border border-white/15 bg-base-100/35 p-5 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl md:p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <MailIcon className="size-5" />
              <h2 className="text-xl font-semibold">Send Feedback</h2>
            </div>

            <p className="mb-4 text-sm text-base-content/70">
              Share your valuable feedback or feature request.
              It will be sent via Web3Forms.
            </p>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="What is this about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered min-h-40 w-full"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={sendingFeedback}>
              <SendIcon className="size-4" />
              {sendingFeedback ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;