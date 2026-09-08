"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timer to ensure preloader closes
      const fallback = setTimeout(handleLoad, 2000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center gap-4"
        >
          {/* Glowing Center Logo Symbol */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/10 border border-primary/40 p-1 flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <img src="/logo-icon.png" alt="SkyEagle Logo" className="w-full h-full object-contain animate-pulse" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            SkyEagle <span className="text-primary font-medium">Securing...</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
