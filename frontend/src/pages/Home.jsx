import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimit from '../components/RateLimit';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { Search, Command, Pin, FileText, Sparkles, X, Layers } from 'lucide-react';

const Home = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);    
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pinFilter, setPinFilter] = useState("all");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get('/notes', {
          params: {
            q: debouncedSearchTerm,
            pinned: pinFilter,
          },
        });
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Error fetching notes");
          setIsRatelimited(false);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [debouncedSearchTerm, pinFilter]);

  const pinnedCount = notes.filter(n => n.pinned).length;

  return (
    <div className="relative min-h-screen bg-void-black text-pure-white overflow-x-hidden">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[-10%] w-[500px] h-[500px] bg-electric-sky/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <Navbar />

      {isRatelimited && <RateLimit />}

      <main className="pt-28 px-4 md:px-8 pb-16 min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Workspace Hero Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline/30">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite/60 border border-outline text-ash text-xs font-mono mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Capture Ideas</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-pure-white mb-2">
                Your Mindscribe Notes
              </h1>
              <p className="text-ash text-sm max-w-xl">
                Organize thoughts, capture quick code snippets, and sketch whiteboards in your personal cloud repository.
              </p>
            </div>

            {/* Quick Stat Pills */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-ink/70 border border-outline/50 flex items-center gap-2.5 backdrop-blur-md">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono text-smoke">Total Notes</p>
                  <p className="text-sm font-semibold text-pure-white">{notes.length}</p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-ink/70 border border-outline/50 flex items-center gap-2.5 backdrop-blur-md">
                <div className="p-1.5 rounded-lg bg-coral-pulse/10 text-coral-pulse">
                  <Pin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono text-smoke">Pinned</p>
                  <p className="text-sm font-semibold text-pure-white">{pinnedCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar Section */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              
              {/* Search Input Field */}
              <div className="relative flex-1 group">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ash group-focus-within:text-primary transition-colors" />
                
                <input
                  id="search-input"
                  type="text"
                  placeholder={isFocused ? "" : "Search notes by title, tag, or content..."}
                  className={`w-full pl-11 pr-20 py-3 bg-ink/80 border border-outline/70 rounded-xl text-pure-white font-sans text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all placeholder:text-ash/40 backdrop-blur-md ${
                    isFocused ? "terminal-cursor" : ""
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none">
                  {searchTerm ? (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="p-1 hover:bg-white/10 rounded-md text-ash hover:text-pure-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-graphite border border-outline font-mono text-[10px] text-smoke">
                        ⌘
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-graphite border border-outline font-mono text-[10px] text-smoke">
                        K
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center bg-ink/80 border border-outline/70 p-1 rounded-xl backdrop-blur-md select-none">
                <button
                  onClick={() => setPinFilter("all")}
                  className={`px-4 py-2 text-xs font-sans rounded-lg transition-all duration-200 cursor-pointer ${
                    pinFilter === "all"
                      ? "bg-gradient-to-r from-primary/90 to-coral-pulse/90 text-pure-white font-medium shadow-[0_0_12px_rgba(255,99,99,0.3)]"
                      : "text-ash hover:text-pure-white hover:bg-white/5"
                  }`}
                >
                  All Notes
                </button>
                <button
                  onClick={() => setPinFilter("true")}
                  className={`px-4 py-2 text-xs font-sans rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    pinFilter === "true"
                      ? "bg-gradient-to-r from-primary/90 to-coral-pulse/90 text-pure-white font-medium shadow-[0_0_12px_rgba(255,99,99,0.3)]"
                      : "text-ash hover:text-pure-white hover:bg-white/5"
                  }`}
                >
                  <Pin className="w-3 h-3" />
                  <span>Pinned</span>
                </button>
                <button
                  onClick={() => setPinFilter("false")}
                  className={`px-4 py-2 text-xs font-sans rounded-lg transition-all duration-200 cursor-pointer ${
                    pinFilter === "false"
                      ? "bg-gradient-to-r from-primary/90 to-coral-pulse/90 text-pure-white font-medium shadow-[0_0_12px_rgba(255,99,99,0.3)]"
                      : "text-ash hover:text-pure-white hover:bg-white/5"
                  }`}
                >
                  Unpinned
                </button>
              </div>
            </div>
          </header>

          {/* Workspace Content Grid */}
          {loading && (
            <div className="py-24 text-center text-primary font-mono flex items-center justify-center gap-3">
              <span className="loading loading-spinner loading-md"></span>
              <span className="text-sm">Syncing workspace notes...</span>
            </div>
          )}

          {!loading && notes.length === 0 && !isRatelimited && (
            <NotesNotFound />
          )}

          {notes.length > 0 && !isRatelimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
