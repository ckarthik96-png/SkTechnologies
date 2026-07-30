"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, ArrowUp, Mail, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingContacts() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg cursor-pointer focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Quote Button */}
      <Link
        href="/contact"
        className="w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="Request Quote"
      >
        <FileText className="w-5 h-5" />
      </Link>

      {/* Floating Email Button */}
      <a
        href="mailto:sales@skyeagletechno.com"
        className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="Email Support"
      >
        <Mail className="w-5 h-5" />
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:+919353427314"
        className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="Call Direct Support"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919353427314"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="WhatsApp Saarika Coordinator"
      >
        <MessageSquare className="w-5 h-5" />
      </a>
    </div>
  );
}
