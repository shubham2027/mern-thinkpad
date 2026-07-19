import React from "react";
import { Link } from "react-router-dom";
import { Zap, Palette, ShieldCheck, Sparkles, Command, FileText, CheckCircle2 } from "lucide-react";

const AuthLayout = ({ children, title, subtitle, switchText, switchLinkText, switchLinkTo }) => {
  return (
    <div className="min-h-screen w-full bg-void-black text-pure-white flex flex-col lg:grid lg:grid-cols-12 overflow-x-hidden relative">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-electric-sky/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* LEFT COLUMN: Landing Page & Product Showcase */}
      <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative z-10 dot-grid border-b lg:border-b-0 lg:border-r border-outline/30 min-h-[500px] lg:min-h-screen">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-coral-pulse to-amber-500 p-[1px] shadow-[0_0_15px_rgba(255,99,99,0.4)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-ink rounded-[11px] flex items-center justify-center">
                <span className="w-3.5 h-3.5 bg-primary rotate-45 transform shadow-[0_0_10px_rgba(255,99,99,0.8)] group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-pure-white font-sans">
              Mindscribe
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-graphite/60 border border-outline text-ash backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>v2.0 Workspace</span>
          </span>
        </div>

        {/* Central Hero & Value Prop Section */}
        <div className="my-auto py-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ember-hush/60 border border-primary/30 text-primary text-xs font-mono font-medium mb-6">
            <Command className="w-3.5 h-3.5" />
            <span>Capture Ideas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-pure-white leading-[1.15] mb-6">
            Capture thoughts with <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-coral-pulse to-electric-sky">frictionless precision.</span>
          </h1>

          <p className="text-ash text-base sm:text-lg leading-relaxed mb-8">
            Combine lightning-fast markdown notes, interactive Excalidraw whiteboards, and seamless cloud syncing into a single dark-themed workspace.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ink/70 border border-outline/50 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-pure-white">Instant Speed</p>
                <p className="text-[10px] text-smoke">⌘K Keyboard shortcuts</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ink/70 border border-outline/50 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-electric-sky/10 text-electric-sky">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-pure-white">Excalidraw</p>
                <p className="text-[10px] text-smoke">Sketch & diagrams</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-ink/70 border border-outline/50 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-success-green/10 text-success-green">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-pure-white">Secure Sync</p>
                <p className="text-[10px] text-smoke">Cloud backed</p>
              </div>
            </div>
          </div>

          {/* Live Preview Card Mockup */}
          <div className="relative group rounded-2xl bg-ink/90 border border-outline p-5 key-shadow overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline/40">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono font-medium text-pure-white">System_Architecture.md</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-graphite border border-outline font-mono text-[10px] text-smoke">
                PINNED
              </span>
            </div>
            <p className="text-xs text-ash font-sans line-clamp-2 leading-relaxed">
              Define the modular backend microservices & real-time canvas sync protocol...
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/20 text-primary border border-primary/30">
                #architecture
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-electric-sky/20 text-electric-sky border border-electric-sky/30">
                #canvas
              </span>
              <span className="ml-auto text-[10px] font-mono text-smoke">Updated just now</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-outline/30 flex items-center justify-between text-xs text-smoke font-mono">
          <span>© 2026 Mindscribe</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success-green" /> All Systems Operational
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sign In / Sign Up Form Container */}
      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center p-6 sm:p-10 lg:p-14 relative z-10 bg-void-black/80 backdrop-blur-xl min-h-[550px] lg:min-h-screen">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-pure-white mb-2">
              {title}
            </h2>
            <p className="text-ash text-sm">
              {subtitle}
            </p>
          </div>

          {/* Form Content Pass-through */}
          {children}

          {/* Switch Link (Login <-> Signup) */}
          <div className="mt-8 text-center pt-6 border-t border-outline/30">
            <p className="text-xs text-smoke">
              {switchText}{" "}
              <Link
                to={switchLinkTo}
                className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors"
              >
                {switchLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
