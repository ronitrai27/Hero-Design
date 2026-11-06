"use client";

import React, { useState } from "react";
import FileHero1 from "./file-hero-1";
import Hero2 from "./hero-2";
import { Sparkles, SunMoon, ArrowRight, ArrowLeft, Layers, Eye } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"welcome" | "hero-1" | "hero-2">("welcome");

  // When viewing a hero, show floating navigation to return or switch
  if (activeView === "hero-1") {
    return (
      <div className="relative w-full min-h-screen">
        <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("welcome")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Showcase</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("hero-2")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Switch to Hero 2 (Lumen Roof)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <FileHero1 />
      </div>
    );
  }

  if (activeView === "hero-2") {
    return (
      <div className="relative w-full min-h-screen">
        <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("welcome")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Showcase</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("hero-1")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Switch to Hero 1 (Bloom)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <Hero2 />
      </div>
    );
  }

  // Welcome Root Page
  return (
    <main className="relative min-h-screen w-full bg-[#070b14] text-white flex flex-col justify-between overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            Hero Architecture Lab
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
            Next.js + WebGL2 + Tailwind
          </span>
        </div>
      </header>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 lg:py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-medium text-white/80 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-white/90" />
          <span>Interactive Landing Showcase</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white max-w-3xl leading-[1.12]">
          Experience Next-Generation <br />
          <span className="text-white/60 font-normal">Fluid Glass & Shaders</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
          Explore two distinct full-viewport hero architectures crafted with raw WebGL2 shaders, masked liquid glass borders, and reactive spring kinematics.
        </p>

        {/* Hero Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12 text-left">
          
          {/* Card 1: Bloom */}
          <div className="group relative rounded-3xl p-7 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  Hero 1
                </span>
                <span className="text-xs text-white/40 font-mono">file-hero-1.tsx</span>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-white tracking-tight group-hover:text-white transition-colors">
                  Bloom — AI Floral Design
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                  Liquid glass morphism aesthetic over a seamless looping video background with dual-tier gradient border masks and strict grayscale hierarchy.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Looping Video
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Liquid Glass (4px/50px blur)
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Poppins & Serif Accent
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveView("hero-1")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <Eye className="w-4 h-4" />
                <span>Launch Hero 1: Bloom</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Lumen Roof */}
          <div className="group relative rounded-3xl p-7 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  Hero 2
                </span>
                <span className="text-xs text-white/40 font-mono">hero-2.tsx</span>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-white tracking-tight group-hover:text-white transition-colors">
                  Lumen Roof — Fog & Light
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                  Full-viewport solar company hero featuring live WebGL2 volumetric fog, house sink/rise animation on toggle, and single-clock color mixing.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Raw WebGL2 Fog Shader
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Morning / Night Sink & Rise
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5">
                  Single-Clock RAF Sync
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveView("hero-2")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <SunMoon className="w-4 h-4" />
                <span>Launch Hero 2: Lumen Roof</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-8 text-center text-xs text-white/40">
        Click any hero card above to view full-screen with real-time controls.
      </footer>
    </main>
  );
}
