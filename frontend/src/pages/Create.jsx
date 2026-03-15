import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios";
import Navbar from "../components/Navbar";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    } // by commenting this we can hit the api directly and see rate limit in action

    setLoading(true);

    try {
      await api.post("/notes", {    // changed from axios to api https://localhost:5001/api has been fixed
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {

      console.error("Error creating note:", error);

      if(error.response?.status === 429){
        toast.error("Too many requests. Please try again later.", {
          duration: 4000,
          icon: '💀'
        });

      }else{
        toast.error("Failed to create note");

      }
    }finally{
      setLoading(false);

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

      <div className="relative z-10 w-full px-4 py-8">
        <div className="mx-auto max-w-2xl">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="card border border-white/15 bg-base-100/35 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl">
          <div className="card-body gap-6">
            <h2 className="card-title">Create a note</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              
              <input
                type="text"
                className="input input-bordered  w-full"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered min-h-40 w-full" 
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Create;
