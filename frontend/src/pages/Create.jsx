import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import { ExcalidrawEditor } from "../components/ExcalidrawEditor";

const Create = () => {
  const [noteType, setNoteType] = useState("text"); // "text" or "drawing"
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [drawingData, setDrawingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const drawingEditorRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const latestDrawingData =
      noteType === "drawing"
        ? drawingEditorRef.current?.getSnapshotData?.() || drawingData
        : null;
    
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content: noteType === "text" ? content : "",
        drawingData: latestDrawingData,
        noteType
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <Navbar />

      <div className="relative z-10 w-full px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Link to={"/"} className="btn btn-ghost mb-6">
            Back to Notes
          </Link>

          <div className="card border border-white/15 bg-base-100/35 shadow-[0_8px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl">
            <div className="card-body gap-6">
              <h2 className="card-title">Create a note</h2>

              {/* Note Type Selector */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setNoteType("text")}
                  className={`btn ${noteType === "text" ? "btn-primary" : "btn-outline"}`}
                >
                  Text Note
                </button>
                <button
                  onClick={() => setNoteType("drawing")}
                  className={`btn ${noteType === "drawing" ? "btn-primary" : "btn-outline"}`}
                >
                  Drawing
                </button>
              </div>

              {/* Title (always required) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Conditional Content */}
              {noteType === "text" && (
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
              )}

              {noteType === "drawing" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Create Drawing</span>
                  </label>
                  <ExcalidrawEditor 
                    ref={drawingEditorRef}
                    onSave={(data) => setDrawingData(data)}
                  />
                </div>
              )}

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <span className="loading loading-spinner" /> : "Create Note"}
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