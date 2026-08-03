"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Server,
  Cloud,
  Network,
  Users,
  Cpu,
  Workflow,
  Phone,
  Mail,
  Clock,
  Briefcase,
  ExternalLink,
  Award,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PanoramaBackground from "@/components/PanoramaBackground";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";

// Services subset to display on home page preview
const featuredServices = [
  {
    title: "IT Infrastructure",
    description: "Designing, sourcing, and configuring full office network hardware, virtualization clusters, and cable structures.",
    icon: Cpu,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Networking & Wi-Fi",
    description: "Robust WAN routing, LAN segmentations, VLAN routing tables, switches, and high density AP tuning.",
    icon: Network,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Cloud & M365 Integration",
    description: "Secure migrations, backup replication pipelines, exchange online setups, and cloud AD setups.",
    icon: Cloud,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Cyber Security & Firewall",
    description: "Threat detection scanning, end-point antivirus monitoring, and Sophos/Fortinet next-gen firewall setups.",
    icon: Server,
    color: "from-amber-500 to-orange-500",
  },
];

// Why Choose Us features
const features = [
  { title: "Certified Engineers", desc: "Expert systems administrators certified in OEM networking, security, and cloud systems.", icon: Award },
  { title: "Genuine Hardware", desc: "We supply brand new box-pack spares and corporate certified refurbished IT assets.", icon: Cpu },
  { title: "Enterprise Security", desc: "Zero Trust policy mapping, secure VPN tunnels, and encrypted cloud backups.", icon: ShieldCheck },
  { title: "On-Site & Remote Support", desc: "Dedicated remote service desk operations and rapid 2-4 hour onsite SLAs in Bengaluru.", icon: Clock },
  { title: "Transparent Pricing", desc: "Flexible contracts without hidden costs, tailored to your commercial operating budget.", icon: Briefcase },
  { title: "Fast Response", desc: "Instant direct WhatsApp routing and priority ticket resolution sweeps.", icon: Workflow },
  { title: "Long-Term Maintenance", desc: "Structured Annual Maintenance Contracts (AMC) to keep your office hardware scaled.", icon: Users },
];

// Testimonials list
const testimonials = [
  {
    quote: "SkyEagle Technologies transformed our entire office setup. Their networking team deployed dual-WAN firewalls and seamless Wi-Fi coverage across three floors with zero downtime.",
    author: "Rohan K.",
    role: "Operations Director, InnoCorp Ltd",
  },
  {
    quote: "With their 24x7 server management and backup solutions, we no longer worry about server failures or cyber risks. Saarika and her engineering team are incredibly responsive.",
    author: "Dr. Ananya R.",
    role: "IT Manager, Lotus Health",
  },
  {
    quote: "Their AMC support is exceptional. Prompt onsite resolutions, routine hardware cleanups, and rapid desktop troubleshooting have boosted our team's daily productivity.",
    author: "Vikram S.",
    role: "Founder, Apex FinTech",
  },
];

// FAQ items
const faqItems = [
  {
    question: "What is an Annual Maintenance Contract (AMC) with SkyEagle?",
    answer: "An AMC is a comprehensive service agreement where SkyEagle takes full responsibility for maintaining your IT hardware, networks, desktops, and printers. It includes routine diagnostic cleanups, remote desk help, and prompt emergency onsite engineer visits.",
  },
  {
    question: "Does SkyEagle design and install structured network cabling?",
    answer: "Yes! We specialize in structured network cabling (Cat6/Cat6A/Fiber), rack dressing, switch provisioning, and enterprise Wi-Fi deployment for corporate offices, warehouses, and campuses.",
  },
  {
    question: "How quickly can your onsite support engineers respond in Bengaluru?",
    answer: "For AMC clients, we offer priority SLAs with onsite response times as fast as 2 to 4 hours for critical network or server outages, and next-business-day response for non-critical desk issues.",
  },
  {
    question: "Do you provide remote IT helpdesk support for office teams?",
    answer: "Yes, we maintain a dedicated remote helpdesk. Our certified systems administrators use secure screen sharing to resolve software configs, email issues, M365 access rules, and server logs instantly.",
  },
  {
    question: "What security protocols do you configure for next-gen firewalls?",
    answer: "We deploy firewalls from Fortinet, Sophos, and SonicWall. Our setups configure Deep Packet Inspection, sandboxing, web category filtering, intrusion prevention (IPS), and secure client dial-in VPNs.",
  },
  {
    question: "Can you set up and migrate our office email to Microsoft 365?",
    answer: "Yes, we handle the entire migration lifecycle: domain validation, mail account provisioning, MX/SPF/DKIM record validation, mailbox transfer (Outlook/IMAP/Google Workspace), and local client setup.",
  },
  {
    question: "What is your data backup and disaster recovery strategy?",
    answer: "We design 3-2-1 backup structures: storing three copies of your data across two local storage units (like an onsite NAS) and replicating one copy to an encrypted offsite cloud backup vault.",
  },
  {
    question: "Do you support biometric attendance and electronic door access controls?",
    answer: "Yes! We install fingerprint and facial recognition scanners, magnetic lock doors, gate controllers, and integrate local timesheet logs software with your office payroll protocols.",
  },
  {
    question: "What locations do you serve with onsite visits?",
    answer: "We provide regular onsite support across Bengaluru, Mysuru, Hubballi, and Mangaluru. We also support remote IT nodes PAN India through secure remote management platforms.",
  },
  {
    question: "What testing and warranty do your refurbished products include?",
    answer: "All refurbished business laptops, desktops, and workstations undergo a rigorous 25-point hardware diagnostic sweep and come backed by our 6-month SkyEagle support warranty.",
  },
  {
    question: "How can we trust that data recovery is handled securely?",
    answer: "We sign strict Non-Disclosure Agreements (NDA) prior to handling corporate media. Recovery is performed sector-by-sector in our clean labs using secure read-only diagnostic systems.",
  },
  {
    question: "What scenarios of drive failure can you recover data from?",
    answer: "We recover files from logical failures (formatted partitions, accidental deletion, BitLocker lockout) and physical failures (clicking drives, liquid spills, and controller board short circuits).",
  },
  {
    question: "Can we purchase individual spare parts like RAM or SSDs from you?",
    answer: "Yes! We supply brand new, box-pack Samsung/Kingston RAM chips, SSD storage units, batteries, keyboards, power adapters, and Cisco/Fortinet network spares.",
  },
  {
    question: "What are the payment options and terms for corporate proposals?",
    answer: "We accept corporate bank transfers (NEFT/RTGS/IMPS) and UPI. AMC contracts are billed quarterly or annually, while hardware sales require part-advance payments depending on order scale.",
  },
  {
    question: "Do you install and configure CCTV security camera networks?",
    answer: "Yes. We install high-definition IP cameras, setup central Network Video Recorders (NVR) with RAID storage redundancy, and configure secure mobile app access for real-time monitoring.",
  },
];

// Solutions by Industry
const industries = [
  { name: "Healthcare", example: "Secure patient systems & HIPAA compliance log vaults", icon: ShieldCheck },
  { name: "Education", example: "Campus network structuring & high-density student Wi-Fi", icon: Award },
  { name: "Retail", example: "POS database sync & unified surveillance IP CCTV arrays", icon: Users },
  { name: "Manufacturing", example: "Industrial rugged routing, biometric logs & server vaults", icon: Server },
  { name: "Corporate", example: "Microsoft 365, backup vaults & local Active Directory AD", icon: Cpu },
  { name: "Startups", example: "Fast-tracked laptop rentals & agile cloud migrations", icon: Workflow },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackTime, setCallbackTime] = useState("");
  const [callbackSent, setCallbackSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    
    // Format WhatsApp message
    const message = `Hello Saarika, I would like to request a callback.\nName: ${callbackName}\nPhone: ${callbackPhone}\nPreferred Time: ${callbackTime || "Immediate"}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919353427314?text=${encoded}`, "_blank");
    setCallbackSent(true);
    setCallbackName("");
    setCallbackPhone("");
    setCallbackTime("");
  };

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen">

      {/* --- 1. HERO SECTION with 3D Panorama Background --- */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
      >
        {/* 3D Interactive 360° Data Center Panorama */}
        <PanoramaBackground />
        <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-extrabold uppercase tracking-widest text-white backdrop-blur-sm"
              style={{ color: "#ffffff !important" }}
            >
              <Award className="w-3.5 h-3.5" style={{ color: "#ffffff !important" }} />
              <span style={{ color: "#ffffff !important" }}>ISO Certified IT Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight"
            >
              Enterprise IT Infrastructure, Cloud, Cyber Security & Data Recovery Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed"
            >
              Empowering commercial enterprises with certified networking solutions, 24x7 AMC support, next-gen firewalls, and data recovery services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="btn-gradient px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-primary/25"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919353427314"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-2"
              >
                WhatsApp Direct
              </a>
              <a
                href="tel:+919353427314"
                className="px-7 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-2"
              >
                Call Specialist
              </a>
            </motion.div>
          </div>

          {/* Right Column: Callback Request form widget */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md relative"
            >
              <h3 className="text-lg font-bold text-white mb-2">Request a Callback</h3>
              <p className="text-xs text-slate-400 mb-6">Specify your number and our coordinator will dial you back.</p>
              
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Preferred Time (Optional)</label>
                  <input
                    type="text"
                    value={callbackTime}
                    onChange={(e) => setCallbackTime(e.target.value)}
                    placeholder="e.g. 3:00 PM, Immediate"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-gradient py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Send Request
                </button>
              </form>

              {callbackSent && (
                <div className="absolute inset-0 bg-dark-bg/95 rounded-2xl flex flex-col items-center justify-center text-center p-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-white text-sm">Request Sent!</h4>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">We have loaded your callback request in WhatsApp. Tap send to submit.</p>
                  <button onClick={() => setCallbackSent(false)} className="text-xs text-primary font-bold mt-4 uppercase">Request Another</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency support banner */}
      <div className="bg-rose-600/10 border-y border-rose-500/20 py-3.5 px-6 relative z-10 text-center">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
          <span className="text-rose-200"><strong>Need Urgent IT Support?</strong> Systems down or network outages?</span>
          <a href="tel:+919353427314" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1 rounded transition-colors uppercase text-[10px]">Call Emergency Line</a>
        </div>
      </div>

      {/* --- 2. TRUSTED TECHNOLOGY PARTNERS --- */}
      <section id="partners" className="py-20 relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">OEM Partners</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Trusted Technology Partners</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-90">
            {[
              {
                name: "Google Cloud",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                )
              },
              {
                name: "Microsoft 365",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 23 23">
                    <rect x="0" y="0" width="10" height="10" fill="#f25022" />
                    <rect x="12" y="0" width="10" height="10" fill="#7fba00" />
                    <rect x="0" y="12" width="10" height="10" fill="#00a4ef" />
                    <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                  </svg>
                )
              },
              {
                name: "AWS",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#ff9900" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                name: "Jio Fiber",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#0059c3" strokeWidth="2.5" fill="none" />
                    <circle cx="12" cy="12" r="6" stroke="#00a8e8" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="2" fill="#0059c3" />
                  </svg>
                )
              },
              {
                name: "Sophos",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0055ff" />
                  </svg>
                )
              },
              {
                name: "Cisco Systems",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#049fd9">
                    <rect x="2" y="14" width="2" height="6" rx="0.5" />
                    <rect x="6" y="8" width="2" height="12" rx="0.5" />
                    <rect x="10" y="4" width="2" height="16" rx="0.5" />
                    <rect x="14" y="4" width="2" height="16" rx="0.5" />
                    <rect x="18" y="8" width="2" height="12" rx="0.5" />
                    <rect x="22" y="14" width="2" height="6" rx="0.5" />
                  </svg>
                )
              },
              {
                name: "Fortinet",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#c32026" strokeWidth="2.5" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#c32026" strokeWidth="2" />
                  </svg>
                )
              },
              {
                name: "Zoho",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="8" height="8" rx="1" fill="#e53935" />
                    <rect x="14" y="2" width="8" height="8" rx="1" fill="#1e88e5" />
                    <rect x="2" y="14" width="8" height="8" rx="1" fill="#43a047" />
                    <rect x="14" y="14" width="8" height="8" rx="1" fill="#fdd835" />
                  </svg>
                )
              },
              {
                name: "Salesforce",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#00a1e0">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                )
              },
              {
                name: "Adobe",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#ff0000">
                    <path d="M14.3 2.1l9.2 20.3h-5.4l-3-7.2H9.3l-3 7.2H1L10.2 2.1h4.1zM12 6.5L9.9 11.5h4.2L12 6.5z" />
                  </svg>
                )
              },
              {
                name: "Dropbox",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#0061ff">
                    <path d="M6 2L1 5.3l5 3.3 5-3.3L6 2zm12 0l-5 3.3 5 3.3 5-3.3L18 2zM1 12l5 3.3 5-3.3-5-3.3-5 3.3zm17-3.3l-5 3.3 5 3.3 5-3.3-5-3.3zM6 16.3l6 4 6-4-6-4.1-6 4.1z" />
                  </svg>
                )
              },
              {
                name: "Trend Micro",
                svg: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a10 10 0 1010 10" stroke="#d8232a" strokeWidth="2.5" />
                    <path d="M12 6a6 6 0 106 6" stroke="#d8232a" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="#d8232a" />
                  </svg>
                )
              }
            ].map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 w-full rounded-xl bg-[#0b0f19]/80 border border-white/5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all hover:bg-slate-900/50 group"
              >
                <div className="mb-2.5 group-hover:scale-110 transition-transform duration-300">
                  {logo.svg}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider text-center group-hover:text-white transition-colors">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. ABOUT SKYEAGLE --- */}
      <section id="about" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story / Mission */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">About SkyEagle Technologies</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Based in Bengaluru, SkyEagle Technologies provides enterprise-grade IT infrastructure, network design, structured cabling, cybersecurity, and cloud migration solutions.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Under coordinator Saarika (+91 93534 27314), we deliver responsive maintenance services and certified corporate technology platforms to keep growing businesses scaling.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Our Full Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { count: "120+", label: "Projects Completed" },
                { count: "80+", label: "Businesses Supported" },
                { count: "24/7", label: "Service Desk Hours" },
                { count: "6-Mo", label: "Hardware Warranty" },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 text-center bg-slate-950/40">
                  <div className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1.5">{stat.count}</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. WHY CHOOSE SKYEAGLE --- */}
      <section id="why-choose-us" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Our Strengths</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Why Businesses Trust Us</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              We act as your dedicated IT department, delivering certified support workflows, genuine hardware components, and enterprise protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 hover:border-primary/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 5. CORE SERVICES PREVIEW --- */}
      <section id="services" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Solutions</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Core Services Directory</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              From structured cabling infrastructure to unified cloud administration, we support 18 core services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="gradient-border-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} p-0.5 flex items-center justify-center mb-6`}>
                      <div className="w-full h-full bg-slate-950/90 rounded-[10px] flex items-center justify-center text-white">
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-primary hover:text-white flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hover:text-white"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              View All 18 Services
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section CTA Banner */}
      <div className="bg-primary/10 border-y border-primary/20 py-8 px-6 text-center relative z-10">
        <h4 className="font-bold text-white text-base mb-2">Need Expert IT Infrastructure Support?</h4>
        <p className="text-xs text-slate-400 mb-4">Request a free site assessment audit from our certified engineers.</p>
        <Link href="/contact" className="btn-gradient px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
          Get Free Consultation
        </Link>
      </div>

      {/* --- 6. DATA RECOVERY PREVIEW --- */}
      <section id="data-recovery" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content preview */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Secure Data Protection</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Data Recovery Services
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Lost vital database folders, accounting documents, or business assets? We extract files from mechanical clicks mechanical drives, raw partition SSDs, and crashed enterprise RAID controller arrays.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">✔ Hard Disk Drives (HDD)</div>
                <div className="flex items-center gap-2">✔ Solid State Drives (SSD)</div>
                <div className="flex items-center gap-2">✔ RAID & NAS Servers</div>
                <div className="flex items-center gap-2">✔ USB Flash & SD Cards</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/data-recovery"
                  className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Full Recovery Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Diagnostic card */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-slate-950/40 relative overflow-hidden">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4 border-b border-white/5 pb-2">Forensic Scan Log</h4>
              <div className="font-mono text-[10px] sm:text-[11px] text-slate-400 space-y-2 leading-relaxed">
                <div>[SYSTEM] Reading disk sectors...</div>
                <div className="text-emerald-400">[SUCCESS] Controller layer identified.</div>
                <div>[STATUS] Mechanical head status: <span className="text-rose-500">Physical Degradation</span></div>
                <div>[ACTION] Cloning memory chips in clean lab...</div>
                <div className="text-emerald-400">[EXTRACT] 1,480 SQL records parsed successfully.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Recovery Section CTA Banner */}
      <div className="bg-rose-950/20 border-b border-rose-500/20 py-8 px-6 text-center relative z-10">
        <h4 className="font-bold text-rose-200 text-base mb-2">Lost Important Corporate Data?</h4>
        <p className="text-xs text-rose-400/90 mb-4">Disconnect the hard disk immediately and speak to our labs diagnostics coordinator.</p>
        <a href="tel:+919353427314" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors">
          Contact Specialists Now
        </a>
      </div>

      {/* --- 7. REFURBISHED PRODUCTS PREVIEW --- */}
      <section id="refurbished-products" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Enterprise Hardware</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Refurbished IT Assets</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Get certified, business-grade laptops and desktops from top corporate fleets at a fraction of retail prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Dell Latitude 7490", specs: "Intel Core i5 | 16GB RAM | 256GB SSD", warranty: "6-Mo Warranty" },
              { name: "Lenovo ThinkPad T480s", specs: "Intel Core i7 | 16GB RAM | 512GB SSD", warranty: "6-Mo Warranty" },
              { name: "HP EliteBook 840 G5", specs: "Intel Core i5 | 16GB RAM | 512GB SSD", warranty: "6-Mo Warranty" },
            ].map((p, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all bg-slate-950/20">
                <div>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{p.warranty}</span>
                  <h4 className="font-bold text-white text-base mb-1.5 mt-3">{p.name}</h4>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{p.specs}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Tested & Certified</span>
                  <Link
                    href={`/contact?service=Hardware%20Purchase&product=${encodeURIComponent(p.name)}`}
                    className="text-xs font-bold text-primary hover:text-white"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/refurbished-products"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              Browse Products Catalog
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Refurbished Section CTA Banner */}
      <div className="bg-slate-900/40 border-y border-white/5 py-8 px-6 text-center relative z-10">
        <h4 className="font-bold text-white text-base mb-2">Looking for Bulk Office Procurement?</h4>
        <p className="text-xs text-slate-400 mb-4">We offer deep discounts for commercial orders, complete with customization parameters.</p>
        <Link href="/contact" className="btn-gradient px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
          Request Bulk Hardware Quote
        </Link>
      </div>

      {/* --- 8. SOLUTIONS BY INDUSTRY --- */}
      <section id="industries" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Industries</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Solutions by Industry</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              We design specialized setups configured explicitly to fit your industry sector regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all hover:bg-slate-900/30 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1.5">{ind.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{ind.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 9. FEATURED PROJECTS PREVIEW --- */}
      <section id="portfolio" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Case Studies</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Featured Engagements</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Take a look at how we deploy physical networking hardware, execute cloud migrations, and implement automation protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                category: "Cloud",
                title: "Microsoft 365 Enterprise Migration",
                desc: "Migrated 150+ user profiles from legacy IMAP email environments onto secure Microsoft 365 configurations with OneDrive document mapping.",
                image: "/images/cloud_migration.jpg",
                tags: ["M365", "Migration", "Security"],
              },
              {
                category: "Network",
                title: "High-Density Office Network Setup",
                desc: "Engineered multi-zone corporate Wi-Fi layout utilizing Cisco hardware, custom VLAN isolation, and structured server cabling routing.",
                image: "/images/network_setup.jpg",
                tags: ["Networking", "Wi-Fi", "Cisco"],
              },
              {
                category: "Rentals",
                title: "Corporate Event Laptop Provisioning",
                desc: "Delivered, configured, and supported 80 high-end rental workstations for a major corporate conference under strict setup windows.",
                image: "/images/laptop_rentals.jpg",
                tags: ["Rentals", "Workstations", "Onsite Support"],
              },
            ].map((engagement, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group bg-slate-950/20"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={engagement.image}
                      alt={engagement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-primary/95 text-white px-2.5 py-1 rounded-md">
                      {engagement.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {engagement.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                      {engagement.desc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                  {engagement.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-semibold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              Explore Projects Cases
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 10. OUR PROCESS --- */}
      <section id="process" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Structured Process</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              We follow a strict 6-step project delivery loop to ensure uptime stability and security validation.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {[
              { step: "01", name: "Consultation", desc: "Detail office endpoints & cabling requirements." },
              { step: "02", name: "Assessment", desc: "Map network structure gaps & security endpoints." },
              { step: "03", name: "Proposal", desc: "Share custom budget options & OEM spec sheets." },
              { step: "04", name: "Deployment", desc: "Certified installation of switches, servers & firewalls." },
              { step: "05", name: "Testing", desc: "Rigorous diagnostic sweeps & backup failover checks." },
              { step: "06", name: "Support", desc: "24x7 priority maintenance sweeps & remote helpdesk." },
            ].map((p, idx) => (
              <div key={idx} className="relative text-center z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-xs mb-4 shadow-lg shadow-primary/5">
                  {p.step}
                </div>
                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">{p.name}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed max-w-[150px] mx-auto">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 11. TESTIMONIALS --- */}
      <section id="testimonials" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Feedback</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What Our Clients Say</h3>
          </div>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 text-center bg-slate-950/40"
              >
                <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed mb-6">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <h4 className="font-bold text-white text-sm">
                  {testimonials[activeTestimonial].author}
                </h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                  {testimonials[activeTestimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Testimonials Dots */}
            <div className="flex items-center justify-center gap-2.5 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none cursor-pointer ${
                    activeTestimonial === idx ? "bg-primary w-6" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- DOWNLOADS STRIP --- */}
      <div className="bg-slate-900/60 border-y border-white/5 py-8 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Downloads Center</h4>
              <p className="text-xs text-slate-400">Company Profile, AMC Service Sheet &amp; Product Catalog — free PDFs</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/downloads/SkyEagle-Company-Profile-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Company Profile
            </a>
            <a href="/downloads/SkyEagle-AMC-Service-Sheet-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              AMC Service Sheet
            </a>
            <a href="/downloads/SkyEagle-Product-Catalog-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Product Catalog
            </a>
            <a href="/downloads" className="btn-gradient px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* --- 12. PRICING --- */}
      <section id="pricing" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Plans</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Transparent Starting Prices</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Flexible IT agreements without hidden costs. Get premium assets and remote assistance when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Laptop Rentals",
                desc: "Flexible leases for startups and temporary teams.",
                price: "₹999",
                unit: "/ day",
                features: ["Core i5 / i7 setups", "16GB RAM / SSD", "Immediate replacement"],
                cta: "Request Rental",
                link: "/refurbished-products",
                featured: false,
              },
              {
                title: "Printer Rentals",
                desc: "High-speed laser printing for office paperwork.",
                price: "Custom",
                unit: "plan rates",
                features: ["Laser MFP Printer", "Toner support included", "Network print capabilities"],
                cta: "Request Rental",
                link: "/refurbished-products?category=printers",
                featured: false,
              },
              {
                title: "IT AMC Services",
                desc: "Complete lifecycle maintenance for networks & PCs.",
                price: "₹4,999",
                unit: "/ month",
                features: ["Preventive checks", "Remote & Onsite Support", "Network firewall policy"],
                cta: "Sign Agreement",
                link: "/contact?service=AMC%20Services",
                featured: true,
              },
              {
                title: "Website Design",
                desc: "Modern glassmorphic landing pages for businesses.",
                price: "₹14,999",
                unit: "/ once",
                features: ["Custom UI Design", "SSL Certificate Setup", "Cloudflare CDN setup"],
                cta: "Order Website",
                link: "/contact?service=Website%20Design",
                featured: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-2xl p-6 border flex flex-col justify-between relative transition-all duration-300 ${
                  plan.featured
                    ? "border-primary bg-slate-900/60 shadow-lg shadow-primary/10 ring-2 ring-primary/20 scale-[1.02] md:scale-105 z-10"
                    : "border-white/5 bg-slate-950/40 hover:border-primary/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 right-6 bg-primary text-white text-[9px] font-black tracking-widest uppercase py-1 px-3 rounded-full shadow">
                    Corporate Choice
                  </div>
                )}

                <div>
                  <h4 className="text-base font-bold text-white mb-2">{plan.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 min-h-[36px]">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-medium">{plan.unit}</span>
                  </div>

                  <div className="h-px bg-white/5 my-4" />
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.link}
                  className={`w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
                    plan.featured
                      ? "bg-primary text-white hover:bg-primary-dark shadow"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 13. FAQ --- */}
      <section id="faq" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* --- 14. LATEST BLOGS PREVIEW --- */}
      <section id="blog" className="section-padding relative z-10 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Knowledge Base</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Latest Articles & Guides</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                category: "Cloud Security",
                title: "Microsoft 365 Security Settings Checklist for Office Administrators",
                desc: "A hands-on guide to securing your M365 tenant: enabling MFA, configuring SPF/DKIM validation records, and disabling legacy protocols.",
              },
              {
                category: "Network Defense",
                title: "Why Next-Gen Firewalls Are Essential for Small Business Networks",
                desc: "Unlike standard routers, next-gen firewalls perform Deep Packet Inspection to detect malware payloads, block suspicious ports, and secure remote VPN terminals.",
              },
            ].map((art, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between bg-slate-950/20">
                <div>
                  <span className="text-[9px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{art.category}</span>
                  <h4 className="font-bold text-white text-base mb-2 mt-4">{art.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{art.desc}</p>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-primary hover:text-white flex items-center gap-1 mt-auto"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              Read All Articles
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- 15. CAREERS PREVIEW --- */}
      <section id="careers" className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Join Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Active Opportunities</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Work with certified engineers, deploy high-end network topologies, and gain hands-on systems training.
            </p>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-slate-950/20 max-w-3xl mx-auto text-center space-y-6">
            <h4 className="font-bold text-white text-lg">We are hiring IT Engineers & Remote System Admins!</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto">
              If you have 1-3 years of experience in structured cabling routing, firewall configurations, or Active Directory management, apply today.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/careers"
                className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                View Opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 16. CONTACT SECTION --- */}
      <section id="contact" className="section-padding relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Connect</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Start Your Project</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Fill out the form below or contact our primary coordinator Saarika directly to schedule your site assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-950/40 space-y-6">
                
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Office Address</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Srinidhi Layout, Konanakunte,<br />
                      Bengaluru, Karnataka - 560062, India
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1.5">
                      Service Areas: Bengaluru, Mysuru, Mangaluru, Hubballi, Karnataka
                    </p>
                  </div>
                </div>

                {/* Direct Line */}
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Call Coordinator</h4>
                    <a href="tel:+919353427314" className="text-xs text-slate-400 hover:text-white transition-colors">
                      +91 93534 27314
                    </a>
                    <span className="block text-[9px] text-slate-500 font-medium">Hours: 24/7 Support Desk</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">Email Coordinates</h4>
                    <a href="mailto:sales@skyeagletechno.com" className="text-xs text-slate-400 hover:text-white transition-colors">
                      sales@skyeagletechno.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Embedded Interactive Map */}
              <div className="h-64 rounded-2xl overflow-hidden border border-white/10 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15557.733519965022!2d77.5585!3d12.8837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15be212c4ab1%3A0xe212c6a0c0000000!2sKonanakunte%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1722335123456!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SkyEagle Technologies Google Maps Coordinates"
                ></iframe>
              </div>
            </div>

            {/* Direct Form Submission */}
            <div className="lg:col-span-7">
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-slate-950/40">
                <h4 className="font-bold text-white text-sm mb-6 border-b border-white/5 pb-2">Send Message</h4>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
