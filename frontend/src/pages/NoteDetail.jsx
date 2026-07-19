import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { ExcalidrawEditor } from "../components/ExcalidrawEditor";
import { ArrowLeft, Trash2, Save, Sparkles, Hash, Clock, Tag, Cpu, Loader2 } from "lucide-react";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const drawingEditorRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    const isText = note.noteType === "text";
    const latestDrawingData =
      note.noteType === "drawing"
        ? drawingEditorRef.current?.getSnapshotData?.() || note.drawingData || null
        : null;

    if (!note.title?.trim()) {
      toast.error("Please add a title");
      return;
    }

    if (isText && !note.content?.trim()) {
      toast.error("Please add content");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...note,
        drawingData: latestDrawingData
      };

      await api.put(`/notes/${id}`, payload);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-void-black text-pure-white flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center font-mono text-primary flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading note workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-void-black text-pure-white overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      <main className="pt-28 px-4 md:px-6 pb-16 min-h-screen flex flex-col items-center relative z-10 select-none">
        <div className="w-full max-w-[820px] flex flex-col gap-6">

          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-mono text-xs text-ash hover:text-pure-white transition-colors group px-3 py-1.5 rounded-lg hover:bg-ink"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-primary" />
              <span>Back to Workspace</span>
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-coral-pulse hover:text-pure-white transition-colors px-3 py-1.5 rounded-lg hover:bg-ember-hush/50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Note</span>
            </button>
          </div>

          {/* Main Editor Card Container */}
          <div className="w-full flex flex-col bg-ink/90 border border-outline/70 rounded-2xl key-shadow relative overflow-hidden backdrop-blur-xl">
            
            {/* Editor Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-outline/40 bg-ink/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg font-sans text-xs bg-graphite text-pure-white border border-outline/60 font-medium">
                  {note.noteType === "drawing" ? "Excalidraw Whiteboard" : "Markdown Note"}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-smoke">
                ID: 0x{note._id.slice(-6).toUpperCase()}
              </div>
            </header>

            {/* Editor Input Area */}
            <div className="flex-1 flex flex-col p-6 select-text">
              <input
                type="text"
                placeholder="Note Title..."
                className="bg-transparent border-none focus:ring-0 text-pure-white font-sans text-2xl font-semibold placeholder:text-ash/30 w-full mb-4 focus:outline-none"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />

              {note.noteType === "text" ? (
                <textarea
                  className="flex-1 bg-transparent border-none focus:ring-0 text-pure-white font-sans text-sm placeholder:text-ash/30 w-full min-h-[340px] resize-none custom-scrollbar leading-relaxed focus:outline-none"
                  placeholder="Start writing into the void..."
                  value={note.content || ""}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              ) : (
                <div className="min-h-[520px] rounded-xl border border-outline/70 overflow-hidden dot-grid flex flex-col relative bg-obsidian">
                  <ExcalidrawEditor
                    ref={drawingEditorRef}
                    initialData={note.drawingData}
                    onSave={(data) => {
                      if (data === undefined) return;
                      setNote({ ...note, drawingData: data });
                    }}
                  />
                </div>
              )}
            </div>

            {/* Editor Footer */}
            <footer className="flex items-center justify-between px-6 py-4 border-t border-outline/40 bg-ink/70">
              <div className="flex items-center gap-5">
                {note.noteType === "text" && (
                  <div className="flex items-center gap-1.5 text-smoke font-mono text-xs">
                    <Hash className="w-3.5 h-3.5 text-ash" />
                    <span>{note.content ? note.content.trim().split(/\s+/).length : 0} words</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-smoke font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-ash" />
                  <span>Updated recently</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-primary via-coral-pulse to-primary hover:opacity-95 text-pure-white px-5 py-2.5 rounded-xl font-sans text-xs font-medium active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,99,99,0.3)] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </footer>
          </div>

          {/* AI Info & Metadata Card */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 w-full max-w-[820px] mt-2">
            <div className="flex-1">
              <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span>AI Insight</span>
              </h3>
              <div className="bg-ink/80 border border-outline/70 p-5 rounded-2xl key-shadow relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-3">
                  <span className="bg-electric-sky/15 text-electric-sky border border-electric-sky/30 font-mono text-[9px] px-2 py-0.5 rounded-full uppercase font-medium">
                    Auto Generated
                  </span>
                </div>
                <p className="font-sans text-xs text-ash leading-relaxed">
                  The visual structure suggests a <span className="text-primary font-medium">layered notes hierarchy</span>. Content is synchronized across your active Mindscribe workspace.
                </p>
              </div>
            </div>

            <div className="w-full md:w-64 space-y-4">
              <div>
                <h3 className="font-mono text-[10px] text-ash uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-ash" />
                  <span>Quick Tags</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-graphite text-pure-white border border-outline/70 font-mono text-[10px] px-2.5 py-1 rounded-lg">
                    #architecture
                  </span>
                  <span className="bg-graphite text-pure-white border border-outline/70 font-mono text-[10px] px-2.5 py-1 rounded-lg">
                    #mindscribe
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-mono text-[10px] text-smoke uppercase tracking-widest mb-1">Last Sync</h3>
                <p className="font-mono text-xs text-smoke">Updated on {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default NoteDetail;