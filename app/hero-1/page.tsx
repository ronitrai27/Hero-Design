import FileHero1 from "../file-hero-1";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Hero1Page() {
  return (
    <div className="relative w-full min-h-screen">
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>← Back to Welcome</span>
      </Link>
      <FileHero1 />
    </div>
  );
}

