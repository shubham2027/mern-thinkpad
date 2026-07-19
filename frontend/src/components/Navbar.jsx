import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Plus, Settings, FileText, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { removeToken } from '../lib/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    toast.success("Signed out");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-void-black/80 backdrop-blur-2xl border-b border-outline/40 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 py-3.5">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-coral-pulse to-amber-500 p-[1px] shadow-[0_0_12px_rgba(255,99,99,0.4)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-ink rounded-[11px] flex items-center justify-center">
                <span className="w-3 h-3 bg-primary rotate-45 transform shadow-[0_0_8px_rgba(255,99,99,0.8)] group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </div>
            <span className="text-xl font-semibold tracking-tight text-pure-white font-sans">
              Mindscribe
            </span>
          </Link>
        </div>
        
        {/* Center: Glass Nav Tabs */}
        <div className="flex items-center bg-ink/60 border border-outline/50 rounded-full p-1 backdrop-blur-md">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-medium transition-all duration-200 ${
              location.pathname === "/" 
                ? "bg-graphite text-pure-white border border-outline/80 shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                : "text-ash hover:text-pure-white hover:bg-obsidian/50"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>Workspace</span>
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-medium transition-all duration-200 ${
              location.pathname === "/settings" 
                ? "bg-graphite text-pure-white border border-outline/80 shadow-[0_0_10px_rgba(255,255,255,0.05)]" 
                : "text-ash hover:text-pure-white hover:bg-obsidian/50"
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-electric-sky" />
            <span>Settings</span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout} 
            className="text-ash hover:text-coral-pulse font-sans text-xs font-medium transition-colors duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-ember-hush/40 cursor-pointer"
            title="Sign out of account"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>

          {location.pathname !== "/create" ? (
            <Link 
              to="/create" 
              className="bg-gradient-to-r from-primary via-coral-pulse to-primary hover:opacity-95 text-pure-white px-3.5 py-1.5 rounded-xl font-sans text-xs font-medium active:scale-95 transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,99,99,0.3)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 border border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Editor Active</span>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
