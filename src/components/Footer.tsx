"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, X, Shield, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const openModal = (modal: "privacy" | "terms") => {
    setActiveModal(modal);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "";
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#030611] z-10 pt-16 pb-8">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="none" stroke="#2563eb" strokeWidth="8" />
                <circle cx="50" cy="50" r="10" fill="#06b6d4" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              SkyEagle <span className="text-secondary text-xs">Technologies</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            Empowering businesses with smart IT solutions. Enterprise-grade cybersecurity, networking, and IT support services tailored to keep your operations scaling securely.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="#" aria-label="LinkedIn Profile" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 transition-all duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" aria-label="Twitter Profile" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 transition-all duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Facebook Page" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 transition-all duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-5">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-slate-400 hover:text-primary transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/services" className="text-sm text-slate-400 hover:text-primary transition-colors">Services</Link>
            </li>
            <li>
              <Link href="/industries" className="text-sm text-slate-400 hover:text-primary transition-colors">Industries</Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-primary transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Services List */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-5">Key Services</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/services?category=infra" className="text-sm text-slate-400 hover:text-primary transition-colors">IT Infrastructure</Link>
            </li>
            <li>
              <Link href="/services?category=network" className="text-sm text-slate-400 hover:text-primary transition-colors">Networking & Wi-Fi</Link>
            </li>
            <li>
              <Link href="/services?category=cloud" className="text-sm text-slate-400 hover:text-primary transition-colors">Cloud & M365 Solutions</Link>
            </li>
            <li>
              <Link href="/services?category=network" className="text-sm text-slate-400 hover:text-primary transition-colors">Cyber Security & Firewall</Link>
            </li>
            <li>
              <Link href="/services?category=support" className="text-sm text-slate-400 hover:text-primary transition-colors">Annual Maintenance (AMC)</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-1">Get In Touch</h4>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-slate-400 leading-relaxed">
                Srinidhi Layout, Konanakunte,<br />
                Bengaluru, Karnataka - 560062, India
              </p>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                Service Areas: Bengaluru, Mysuru, Karnataka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col">
              <a href="tel:+919353427314" className="text-sm text-slate-400 hover:text-white transition-colors">
                +91 93534 27314
              </a>
              <span className="text-[10px] text-slate-500 font-medium">Hours: 24/7 Service Desk</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <a href="mailto:sales@skyeagletechno.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
              sales@skyeagletechno.com
            </a>
          </div>
          <div className="h-px bg-white/5 my-1" />
          <div className="text-[11px] text-slate-500">
            GSTIN: 29SKYEAGLE1234F1Z0 (Provisional)
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} SkyEagle Technologies. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <button
            onClick={() => openModal("privacy")}
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <button
            onClick={() => openModal("terms")}
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
          >
            <FileText className="w-3.5 h-3.5" />
            Terms & Conditions
          </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-2xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto relative text-slate-300"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "privacy" ? (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
                  <div className="space-y-4 text-sm leading-relaxed text-slate-400">
                    <p className="text-xs text-slate-500 font-medium">Effective Date: July 30, 2026</p>
                    <p>
                      At SkyEagle Technologies, your privacy is paramount. This policy documents how we collect, process, and secure user information when you engage with our platform or services.
                    </p>
                    <h4 className="font-semibold text-white mt-4">1. Data Capture</h4>
                    <p>
                      We gather personal and corporate data strictly when you submit a consultation request or contact form. This includes your Name, Business Name, Email address, Phone number, and specific IT requirement context.
                    </p>
                    <h4 className="font-semibold text-white mt-4">2. Core Processing</h4>
                    <p>
                      Your information is exclusively processed to answer corporate inquiries, deliver custom AMC support contracts, deploy firewall rules, configure Microsoft 365 nodes, and execute networking support.
                    </p>
                    <h4 className="font-semibold text-white mt-4">3. Zero-Share Promise</h4>
                    <p>
                      SkyEagle Technologies maintains strict confidentiality protocols. We never sell, exchange, or rent client data to advertising networks, marketers, or unvetted third parties.
                    </p>
                    <h4 className="font-semibold text-white mt-4">4. Compliance & Contact</h4>
                    <p>
                      For queries regarding safety precautions or details about your data, contact Saarika at <a href="mailto:sales@skyeagletechno.com" className="text-primary hover:underline">sales@skyeagletechno.com</a>.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h3>
                  <div className="space-y-4 text-sm leading-relaxed text-slate-400">
                    <p className="text-xs text-slate-500 font-medium">Effective Date: July 30, 2026</p>
                    <p>
                      Welcome to SkyEagle Technologies. Accessing our portal or contracting services constitutes acceptance of these operational guidelines.
                    </p>
                    <h4 className="font-semibold text-white mt-4">1. IT Deployments & SLA</h4>
                    <p>
                      All installation procedures (Firewall setups, CCTV installations, Wi-Fi deployments, server configurations) are managed according to signed statements of work. Technical support response windows are controlled by corresponding SLA tier agreements.
                    </p>
                    <h4 className="font-semibold text-white mt-4">2. Hardware Lease & Maintenance</h4>
                    <p>
                      Services like Desktop, Laptop, and Printer Support are performed under active Annual Maintenance Contracts (AMC) or separate hourly work tokens. Clients are responsible for ensuring backups are verified prior to onsite servicing.
                    </p>
                    <h4 className="font-semibold text-white mt-4">3. Limit of Liabilities</h4>
                    <p>
                      SkyEagle Technologies engineers seek to secure files and nodes completely. However, we are not liable for incidental business losses, downtime, cyber attacks, or database degradation unless explicitly stated in a signed master services agreement.
                    </p>
                    <h4 className="font-semibold text-white mt-4">4. Jurisdiction</h4>
                    <p>
                      These Terms are governed strictly by the laws of Bengaluru, Karnataka, India. Any litigation or arbitration shall reside solely in local court chambers.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
