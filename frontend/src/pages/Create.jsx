import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, FileText, PenTool, Save, Sparkles, Hash, Clock, ChevronRight, Link2, Mic, Plus, Loader2 } from "lucide-react";
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
    <div className="relative min-h-screen bg-void-black text-pure-white overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-28 px-4 md:px-6 pb-16 min-h-screen flex flex-col items-center relative z-10 select-none">
        <div className="w-full max-w-[820px] flex flex-col gap-6">
          
          {/* Header Navigation Actions */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-mono text-xs text-ash hover:text-pure-white transition-colors group px-3 py-1.5 rounded-lg hover:bg-ink"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-primary" />
              <span>Back to Workspace</span>
            </Link>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-graphite/60 border border-outline text-smoke">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>NEW DRAFT</span>
            </div>
          </div>

          {/* Main Editor Card Container */}
          <div className="w-full flex flex-col bg-ink/90 border border-outline/70 rounded-2xl key-shadow relative overflow-hidden backdrop-blur-xl">
            
            {/* Editor Header / Mode Switcher */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-outline/40 bg-ink/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex bg-obsidian p-1 rounded-xl border border-outline/60 select-none">
                <button
                  type="button"
                  onClick={() => setNoteType("text")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                    noteType === "text"
                      ? "bg-gradient-to-r from-primary via-coral-pulse to-primary text-pure-white font-medium shadow-[0_0_12px_rgba(255,99,99,0.3)]"
                      : "text-ash hover:text-pure-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Markdown</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNoteType("drawing")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                    noteType === "drawing"
                      ? "bg-gradient-to-r from-primary via-coral-pulse to-primary text-pure-white font-medium shadow-[0_0_12px_rgba(255,99,99,0.3)]"
                      : "text-ash hover:text-pure-white"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Excalidraw</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary border border-primary/30 font-mono text-[10px] px-2.5 py-1 rounded-full tracking-wider uppercase font-medium">
                  Drafting
                </span>
              </div>
            </header>

            {/* Editor Input Area */}
            <div className="flex-1 flex flex-col p-6 select-text">
              <input
                type="text"
                placeholder="Note Title..."
                className="bg-transparent border-none focus:ring-0 text-pure-white font-sans text-2xl font-semibold placeholder:text-ash/30 w-full mb-4 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {noteType === "text" ? (
                <textarea
                  className="flex-1 bg-transparent border-none focus:ring-0 text-pure-white font-sans text-sm placeholder:text-ash/30 w-full min-h-[340px] resize-none custom-scrollbar leading-relaxed focus:outline-none"
                  placeholder="Write your markdown note here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <div className="min-h-[520px] rounded-xl border border-outline/70 overflow-hidden dot-grid flex flex-col relative bg-obsidian">
                  <ExcalidrawEditor
                    ref={drawingEditorRef}
                    onSave={(data) => setDrawingData(data)}
                  />
                </div>
              )}
            </div>

            {/* Editor Footer */}
            <footer className="flex items-center justify-between px-6 py-4 border-t border-outline/40 bg-ink/70">
              <div className="flex items-center gap-5">
                {noteType === "text" && (
                  <div className="flex items-center gap-1.5 text-smoke font-mono text-xs">
                    <Hash className="w-3.5 h-3.5 text-ash" />
                    <span>{content ? content.trim().split(/\s+/).length : 0} words</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-smoke font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-ash" />
                  <span>Unsaved</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-primary via-coral-pulse to-primary hover:opacity-95 text-pure-white px-5 py-2.5 rounded-xl font-sans text-xs font-medium active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,99,99,0.3)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Create Note</span>
                    </>
                  )}
                </button>
              </div>
            </footer>
          </div>

          {/* Quick Collections Cards */}
          <div className="w-full max-w-[820px] grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div 
              onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
              className="bg-ink/80 rounded-2xl p-4 border border-outline/70 key-shadow flex items-center justify-between hover:border-primary/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-pure-white">Attach Collection</h4>
                  <p className="font-mono text-[10px] text-smoke">Link note to existing project</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-ash group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={() => toast("Coming soon in next update!", { icon: '🚀' })}
              className="bg-ink/80 rounded-2xl p-4 border border-outline/70 key-shadow flex items-center justify-between hover:border-primary/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-electric-sky/10 border border-electric-sky/30 flex items-center justify-center text-electric-sky">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-pure-white">Audio Notes</h4>
                  <p className="font-mono text-[10px] text-smoke">Record voice clip context</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-ash group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Create;