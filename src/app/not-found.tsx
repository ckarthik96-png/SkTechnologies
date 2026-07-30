import Link from "next/link";
import { Compass, Home } from "lucide-react";

export const metadata = {
  title: "404 Page Not Found | SkyEagle Technologies",
  description: "The page you are looking for does not exist on SkyEagle Technologies portal.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-6 bg-[#050816] text-white">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full filter blur-[80px]" />
      
      <div className="glass-card max-w-md w-full p-8 rounded-2xl border border-white/10 text-center relative z-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
          <Compass className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-300 mb-4">Node Directory Not Found</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The requested page address is inactive or has been migrated to a secure backup directory. Please check spelling or go back home.
        </p>
        
        <Link
          href="/"
          className="btn-gradient w-full py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back To Homepage
        </Link>
      </div>
    </div>
  );
}
