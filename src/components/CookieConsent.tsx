"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
        >
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col gap-4 relative bg-[#090e1a]/95 backdrop-blur-lg">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Cookie Policy Consent</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We use cookies to remember preferences, analyze site traffic, and secure contact forms. By browsing, you consent to our privacy terms.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3.5">
              <button
                onClick={() => setVisible(false)}
                className="text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="btn-gradient px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-wider cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
