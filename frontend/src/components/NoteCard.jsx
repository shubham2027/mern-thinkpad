import React from 'react';
import { Link } from 'react-router-dom';
import { Pin, FileText, PenTool, Trash2, Edit3 } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
  const sortPinnedFirst = (noteList) => {
    return [...noteList].sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.pinned ? -1 : 1;
    });
  };

  const handleDelete = async (e, noteId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    
    try {
      await api.delete(`/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== noteId));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleTogglePin = async (e, noteId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await api.patch(`/notes/${noteId}/pin`);
      const updatedNote = res.data;

      setNotes((prevNotes) => {
        const nextNotes = prevNotes.map((n) => (n._id === noteId ? updatedNote : n));
        return sortPinnedFirst(nextNotes);
      });
      toast.success(updatedNote.pinned ? "Note pinned" : "Note unpinned");
    } catch (error) {
      console.error("Error pinning note:", error);
      toast.error("Failed to update pin");
    }
  };

  const isDrawing = note.noteType === 'drawing';

  return (
    <Link
      to={`/note/${note._id}`}
      className={`group relative p-6 rounded-2xl transition-all duration-300 key-shadow hover:-translate-y-1 flex flex-col justify-between backdrop-blur-md ${
        note.pinned
          ? 'bg-ember-hush/60 border border-coral-pulse/40 shadow-[0_0_20px_rgba(255,99,99,0.12)]'
          : 'bg-ink/80 border border-outline/70 hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4 select-none">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg border ${
              note.pinned 
                ? 'bg-coral-pulse/20 border-coral-pulse/40 text-coral-pulse' 
                : isDrawing 
                ? 'bg-electric-sky/10 border-electric-sky/30 text-electric-sky'
                : 'bg-primary/10 border-primary/30 text-primary'
            }`}>
              {note.pinned ? (
                <Pin className="w-3.5 h-3.5 fill-current" />
              ) : isDrawing ? (
                <PenTool className="w-3.5 h-3.5" />
              ) : (
                <FileText className="w-3.5 h-3.5" />
              )}
            </div>
            
            {/* Badge Tag */}
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-md tracking-wider uppercase font-medium border ${
              isDrawing 
                ? 'bg-electric-sky/15 text-electric-sky border-electric-sky/30' 
                : 'bg-graphite text-ash border-outline/60'
            }`}>
              {isDrawing ? 'Drawing' : 'Markdown'}
            </span>
          </div>
          
          <span className={`font-mono text-[10px] ${note.pinned ? 'text-pure-white/80' : 'text-smoke'}`}>
            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
          </span>
        </div>

        {/* Card Title */}
        <h3
          className={`font-sans text-base font-medium mb-2.5 transition-colors duration-200 line-clamp-1 ${
            note.pinned ? 'text-pure-white group-hover:text-coral-pulse' : 'text-pure-white group-hover:text-primary'
          }`}
        >
          {note.title || "Untitled Note"}
        </h3>

        {/* Card Content Snippet */}
        <p className={`font-sans text-xs leading-relaxed mb-6 line-clamp-3 ${note.pinned ? 'text-ash' : 'text-smoke'}`}>
          {note.noteType === 'text'
            ? note.content || 'Empty note content...'
            : note.drawingData
            ? 'Interactive Excalidraw whiteboard. Click to view and edit.'
            : 'Empty whiteboard canvas.'}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline/40 select-none">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-smoke">
            #{note.noteType || 'text'}
          </span>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              note.pinned 
                ? 'text-coral-pulse bg-coral-pulse/10 hover:bg-coral-pulse/20' 
                : 'text-ash hover:text-primary hover:bg-white/5'
            }`}
            onClick={(e) => handleTogglePin(e, note._id)}
            title={note.pinned ? "Unpin Note" : "Pin Note"}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          
          <button
            className="p-1.5 rounded-lg text-ash hover:text-coral-pulse hover:bg-white/5 transition-colors cursor-pointer"
            onClick={(e) => handleDelete(e, note._id)}
            title="Delete Note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
