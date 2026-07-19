import React from "react";
import { Link } from "react-router-dom";
import { FileTextIcon, PlusCircleIcon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-[760px] mx-auto py-16">
      {/* Hero Atmosphere Gradient Behind Content */}
      <div className="absolute inset-0 hero-glow -z-10 opacity-60" />

      <div className="mb-6 opacity-35">
        <FileTextIcon className="size-16 stroke-[1] text-primary" />
      </div>

      {/* Signature large normal-weight headline */}
      <h2 className="font-sans text-4xl md:text-5xl text-pure-white font-normal tracking-[0.22px] leading-tight mb-4 select-none">
        Start your first note
      </h2>

      <p className="font-sans text-[16px] text-ash max-w-md mb-10 leading-relaxed">
        Your second brain is ready. Capture fleeting thoughts, archive research, and use AI to find patterns in your knowledge.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <Link 
          to="/create" 
          className="group flex items-center gap-2 px-8 py-3.5 bg-mist text-iron hover:bg-pure-white hover:text-void-black rounded-[8px] font-sans text-[14px] font-medium active:scale-[0.98] transition-all shadow-subtle-4"
        >
          <span>Initialize Workspace</span>
          <PlusCircleIcon className="size-4 text-primary fill-current bg-white rounded-full" />
        </Link>
        
        <button 
          onClick={() => document.getElementById("search-input")?.focus()}
          className="flex items-center gap-2 px-6 py-3.5 bg-void-black border border-outline text-ash hover:text-pure-white rounded-[8px] key-shadow transition-all cursor-pointer font-sans text-[13px]"
        >
          <span className="font-mono text-[11px] opacity-60">⌘K TO SEARCH</span>
        </button>
      </div>

      {/* Brutalist Hints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        <div className="p-6 bg-ink border border-outline rounded-[16px] key-shadow text-left">
          <div className="font-mono text-primary text-[10px] mb-2 tracking-widest uppercase">Input Mode</div>
          <div className="text-pure-white font-sans text-[14px] font-medium mb-2 terminal-cursor">Markdown Native</div>
          <div className="font-sans text-[13px] text-ash leading-relaxed">Write with speed using standard markdown syntax or slash commands.</div>
        </div>
        
        <div className="p-6 bg-ink border border-outline rounded-[16px] key-shadow text-left">
          <div className="font-mono text-primary text-[10px] mb-2 tracking-widest uppercase">Architecture</div>
          <div className="text-pure-white font-sans text-[14px] font-medium mb-2">Graph Relations</div>
          <div className="font-sans text-[13px] text-ash leading-relaxed">Link thoughts together to visualize your mental map over time.</div>
        </div>
        
        <div className="p-6 bg-ink border border-outline rounded-[16px] key-shadow text-left">
          <div className="font-mono text-primary text-[10px] mb-2 tracking-widest uppercase">Intelligence</div>
          <div className="text-pure-white font-sans text-[14px] font-medium mb-2 flex items-center gap-1.5">
            <span>AI Insights</span>
            <span className="bg-primary/20 text-primary border border-primary/30 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-widest uppercase scale-90">PRO</span>
          </div>
          <div className="font-sans text-[13px] text-ash leading-relaxed">Automatic tagging and smart summaries for every note you write.</div>
        </div>
      </div>
    </div>
  );
};

export default NotesNotFound;