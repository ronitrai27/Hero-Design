"use client";

import React, { useState } from "react";
import Link from "next/link";
import FileHero1 from "./file-hero-1";
import Hero2 from "./hero-2";
import { Sparkles, SunMoon, ArrowRight, ArrowLeft, Eye, Play } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"welcome" | "hero-1" | "hero-2">("welcome");

  // When viewing Hero 1
  if (activeView === "hero-1") {
    return (
      <div className="relative w-full min-h-screen">
        <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("welcome")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Welcome</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("hero-2")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>See Hero 2 (Lumen Roof)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <FileHero1 />
      </div>
    );
  }

  // When viewing Hero 2
  if (activeView === "hero-2") {
    return (
      <div className="relative w-full min-h-screen">
        <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("welcome")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Welcome</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("hero-1")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>See Hero 1 (Bloom)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <Hero2 />
      </div>
    );
  }

  // Welcome Root Landing Page
  return (
    <main className="relative min-h-screen w-full bg-[#070b14] text-white flex flex-col justify-between overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[650px] h-[650px] rounded-full bg-white/[0.04] blur-[150px]" />
        <div className="absolute -bottom-32 right-1/4 w-[550px] h-[550px] rounded-full bg-slate-400/[0.03] blur-[170px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            WELCOME
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70">
            Next.js + Tailwind
          </span>
        </div>
      </header>

      {/* Main Welcome Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 lg:py-16 flex flex-col items-center text-center">
        
        {/* Welcome Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-medium text-white/80 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Interactive Hero Experience Showcase</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Welcome
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl font-normal leading-relaxed">
          Choose a hero landing page below to experience full-viewport liquid glass morphism and real-time WebGL2 fog physics.
        </p>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 w-full max-w-md">
          <button
            type="button"
            onClick={() => setActiveView("hero-1")}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>See Hero 1 (Bloom)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("hero-2")}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-md shadow-xl cursor-pointer"
          >
            <SunMoon className="w-4 h-4" />
            <span>See Hero 2 (Lumen Roof)</span>
          </button>
        </div>

        {/* Two Feature Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-14 text-left">
          
          {/* Hero 1 Card */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                  Hero 1
                </span>
                <Link
                  href="/hero-1"
                  className="text-xs text-white/50 hover:text-white underline underline-offset-4"
                >
                  Direct link /hero-1
                </Link>
              </div>

              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Bloom — AI Floral Design
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                Full-screen looping video background with dual-tier liquid glass morphism (.liquid-glass & .liquid-glass-strong), masked gradient borders, and strict grayscale palette.
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>Autoplaying looping video background at z-0</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>Dual-tier masked liquid glass border effects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>Two-panel split with community & sculpting cards</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveView("hero-1")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>See Hero 1 (Bloom)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero 2 Card */}
          <div className="group rounded-3xl p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                  Hero 2
                </span>
                <Link
                  href="/hero-2"
                  className="text-xs text-white/50 hover:text-white underline underline-offset-4"
                >
                  Direct link /hero-2
                </Link>
              </div>

              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Lumen Roof — Solar Experience
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                Solar company hero with live WebGL2 volumetric fog shader, house sinking/rising kinematic animation on toggle, and single-clock color mixing.
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>5-layer compositing with blurred sky and house cutouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>Raw WebGL2 live domain-warped fog shader</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>Morning / Night toggle with 27% depth house sink</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveView("hero-2")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>See Hero 2 (Lumen Roof)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-8 text-center text-xs text-white/40">
        Hero Landing Architecture Lab • Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
