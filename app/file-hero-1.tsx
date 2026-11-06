"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Menu,
  Plus,
} from "lucide-react";
import heroFlowers from "@/assets/hero-flowers.png";

// Social icon components with exact Lucide stroke & SVG specifications
function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function FileHero1() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Full-screen Autoplaying, Looping, Muted Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main Two-Panel Layout floating at z-10 */}
      <main className="relative z-10 min-h-screen w-full flex flex-row">
        
        {/* ================= LEFT PANEL (52% on desktop) ================= */}
        <section className="w-full lg:w-[52%] relative flex flex-col min-h-screen p-4 lg:p-6">
          {/* Liquid Glass Strong Overlay */}
          <div className="absolute inset-4 lg:inset-6 rounded-3xl liquid-glass-strong pointer-events-none" />

          {/* Panel Content Inside Overlay Frame */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 lg:p-10">
            
            {/* Top Navigation */}
            <header className="flex items-center justify-between w-full">
              {/* Logo (32x32) + "bloom" text */}
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Bloom Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  priority
                />
                <span className="font-semibold text-2xl tracking-tighter text-white">
                  bloom
                </span>
              </div>

              {/* Menu Button with Menu Icon */}
              <button
                type="button"
                aria-label="Menu"
                className="liquid-glass rounded-full px-5 py-2 flex items-center gap-2 text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="text-sm">Menu</span>
                <Menu className="w-4 h-4 text-white" />
              </button>
            </header>

            {/* Hero Center (flex-1, centered) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-10 lg:py-12">
              {/* Logo Image Again (80x80) */}
              <div className="mb-6 hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Bloom Emblem"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain drop-shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
                  priority
                />
              </div>

              {/* H1 Headline */}
              <h1 className="text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.08] max-w-xl mx-auto">
                Innovating the <br />
                <span className="font-serif italic font-normal text-white/80">
                  spirit of bloom AI
                </span>
              </h1>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  type="button"
                  className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-3.5 text-white text-sm font-medium tracking-wide hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>Explore Now</span>
                  <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <Download className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>

              {/* Three Pills */}
              <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                {["Artistic Gallery", "AI Generation", "3D Structures"].map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80 hover:text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Quote Section */}
            <footer className="mt-auto pt-6 flex flex-col items-center text-center">
              <span className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">
                VISIONARY DESIGN
              </span>
              <p className="text-sm lg:text-base text-white/80 tracking-wide font-normal max-w-md">
                <span>We </span>
                <span className="font-serif italic text-white">imagined</span>
                <span> a </span>
                <span className="font-serif italic text-white">realm</span>
                <span> with no ending.</span>
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 w-full max-w-xs text-[11px] tracking-widest text-white/50 uppercase">
                <div className="h-[1px] flex-1 bg-white/20" />
                <span>MARCUS AURELIO</span>
                <div className="h-[1px] flex-1 bg-white/20" />
              </div>
            </footer>

          </div>
        </section>

        {/* ================= RIGHT PANEL (48% on desktop, hidden on mobile) ================= */}
        <section className="hidden lg:flex lg:w-[48%] flex-col justify-between relative p-6">
          
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between">
            {/* Social Icons Pill with ArrowRight */}
            <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="w-px h-3.5 bg-white/20" />
              <button
                type="button"
                aria-label="Explore Community"
                className="text-white hover:text-white/80 transition-colors hover:scale-105"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Account Button + Sparkles Icon Button */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="liquid-glass rounded-full px-5 py-2 text-sm text-white/90 hover:text-white hover:scale-105 transition-transform font-medium"
              >
                Account
              </button>
              <button
                type="button"
                aria-label="Sparkles AI"
                className="liquid-glass rounded-full p-1.5 hover:scale-105 transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Small Community Card (w-56) */}
          <div className="mt-8 self-end">
            <div className="w-56 liquid-glass rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer">
              <h4 className="text-sm font-medium text-white">
                Enter our ecosystem
              </h4>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Connect with digital botanists and discover infinite procedural flora.
              </p>
            </div>
          </div>

          {/* Bottom Feature Section (mt-auto) */}
          <div className="mt-auto">
            {/* Outer liquid-glass container with rounded-[2.5rem] */}
            <div className="liquid-glass rounded-[2.5rem] p-5 flex flex-col gap-4">
              
              {/* Two Side-by-Side Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Processing Card */}
                <div className="liquid-glass rounded-3xl p-5 hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between min-h-[140px]">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-white">Processing</h3>
                    <p className="text-xs text-white/60 mt-1">
                      Real-time generative floral geometry
                    </p>
                  </div>
                </div>

                {/* Growth Archive Card */}
                <div className="liquid-glass rounded-3xl p-5 hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between min-h-[140px]">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-white">Growth Archive</h3>
                    <p className="text-xs text-white/60 mt-1">
                      Catalogued synthetic bloom variations
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="liquid-glass rounded-3xl p-3.5 flex items-center justify-between gap-4 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center gap-4">
                  {/* Flower image thumbnail (96x64) */}
                  <div className="relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 bg-white/5">
                    <Image
                      src={heroFlowers}
                      alt="Advanced Plant Sculpting"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Advanced Plant Sculpting
                    </h3>
                    <p className="text-xs text-white/60 mt-0.5 text-ellipsis overflow-hidden">
                      Parametric biome synthesis engineered for spatial reality.
                    </p>
                  </div>
                </div>

                {/* Plus (+) Button */}
                <button
                  type="button"
                  aria-label="Add project"
                  className="shrink-0 hover:scale-105 transition-transform pr-1"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              </div>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
