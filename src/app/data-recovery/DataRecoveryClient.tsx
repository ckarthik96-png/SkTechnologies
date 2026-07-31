"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Database,
  HardDrive,
  Cpu,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

const devices = [
  { name: "Hard Disk Drives (HDD)", desc: "Internal/External desktop and laptop 2.5\" and 3.5\" mechanical drives.", icon: HardDrive },
  { name: "Solid State Drives (SSD)", desc: "High-speed NVMe, M.2, and SATA solid state storage units.", icon: Cpu },
  { name: "RAID & NAS Arrays", desc: "Multi-disk network-attached storage architectures and logical RAID sets.", icon: Database },
  { name: "USB Flash & SD Cards", desc: "Removable memory devices, thumb drives, and camera media cards.", icon: ShieldCheck },
  { name: "MacBook & Laptop Storages", desc: "Integrated board-soldered flash storage chips and legacy modules.", icon: Cpu },
  { name: "Enterprise Servers", desc: "High-capacity server arrays, SQL databases, and file repository boxes.", icon: Database },
];

const scenarios = [
  { title: "Accidental Deletion", desc: "Accidentally emptied recycling bins, deleted folders, or lost user directory folders." },
  { title: "Formatted Drives", desc: "Drives formatted during clean OS installations or partition setups." },
  { title: "Partition Corruption", desc: "Raw partitions, invalid file systems (NTFS/FAT/exFAT), or boot block errors." },
  { title: "BitLocker & Encryption", desc: "Lost decryption keys, locked volumes, or password recovery conflicts." },
  { title: "Physical Drop Damage", desc: "Clicking mechanical drives, dropped external hardware, or motor stalls." },
  { title: "Water / Liquid Spills", desc: "Corroded board layers, short circuits, or liquid damage on laptop components." },
  { title: "Ransomware & Malware", desc: "File extensions encrypted by malicious agents or system lockers." },
  { title: "RAID Config Failures", desc: "Broken disk chains, offline disk states, or rebuild errors in RAID controller units." },
];

const steps = [
  { step: "01", title: "Consultation", desc: "Contact Saarika (+91 93534 27314) to detail your drive model and symptoms." },
  { step: "02", title: "Device Handover", desc: "Safely drop off the media at our Bengaluru office or arrange a secure courier." },
  { step: "03", title: "Lab Diagnosis", desc: "Our specialists examine the controller board and flash chips to map recovery viability." },
  { step: "04", title: "Quotation & Approval", desc: "We share a detailed directory file list and price quote for your confirmation." },
  { step: "05", title: "Secure Recovery", desc: "We copy sector-by-sector and rebuild indices using specialized disk utility tools." },
  { step: "06", title: "Verification & Delivery", desc: "Review the extracted file checklist. We transfer the recovered files to a new secure drive." },
];

export default function DataRecoveryClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mediaType: "Mechanical Hard Drive (HDD)",
    scenario: "Accidental Deletion",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const formattedMessage = `*New Data Recovery Diagnostic Inquiry*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `💾 *Media Type:* ${formData.mediaType}\n` +
      `⚠️ *Scenario:* ${formData.scenario}\n\n` +
      `📝 *Drive Details & Symptoms:*\n${formData.details}`;

    const whatsappUrl = `https://wa.me/919353427314?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setStatus("success");
      window.location.href = whatsappUrl;
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        mediaType: "Mechanical Hard Drive (HDD)",
        scenario: "Accidental Deletion",
        details: "",
      });
      
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Ambient background glows */}
      <div className="glow-spot top-1/4 left-1/3 bg-primary/10" />
      <div className="glow-spot bottom-1/4 right-1/3 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin [animation-duration:10s]" /> Securing Core Assets
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Professional Data Recovery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Recover lost databases, files, and partitions from damaged hard disks, SSD modules, RAID arrays, and server storages with transparent diagnostics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <Link
              href="/contact?service=Data%20Recovery"
              className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              Request Diagnostics
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919353427314"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 text-white"
            >
              Call Specialist
            </a>
          </motion.div>
        </div>

        {/* Warning Indicator */}
        <div className="mb-20 max-w-3xl mx-auto p-5 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-rose-200 text-sm">Immediate Actions to Prevent Permanent Data Loss</h4>
            <p className="text-xs text-rose-400/90 leading-relaxed">
              If your hard drive is clicking, formatting, or has liquid damage: <strong>Power it down immediately.</strong> Continued attempts to reboot or run default scanning software can physically scratch mechanical platters or overwrite deleted flash cells, rendering files permanently unrecoverable.
            </p>
          </div>
        </div>

        {/* Supported Devices */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Supported Media</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Devices We Service</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device, idx) => {
              const Icon = device.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex gap-4 hover:border-primary/25 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{device.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{device.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recovery Scenarios */}
        <div className="mb-24 bg-slate-950/20 p-8 rounded-2xl border border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Diagnostic Scenarios</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Data Loss Situations We Address</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((sc, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-1">{sc.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{sc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Workflow Strategy</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Our Recovery Process</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all relative">
                <span className="absolute top-4 right-4 text-3xl font-mono font-black text-white/5">{st.step}</span>
                <div>
                  <h4 className="font-bold text-white text-sm mb-2 pt-2">{st.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Intake Form */}
        <div id="diagnostic-form" className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="text-center mb-8 border-b border-white/5 pb-4">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Safe Diagnostics Request</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Describe your device model and failure symptoms. Our specialists will review the case details and establish a clean lab intake clone ticket.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Media Type *</label>
                <select
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleChange}
                  className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Mechanical Hard Drive (HDD)">Mechanical Hard Drive (HDD)</option>
                  <option value="Solid State Drive (SSD/NVMe)">Solid State Drive (SSD/NVMe)</option>
                  <option value="RAID / Server Array">RAID / Server Array</option>
                  <option value="USB Flash / Memory Card">USB Flash / Memory Card</option>
                  <option value="Laptop Storage (Mac/PC)">Laptop Storage (Mac/PC)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Failure Scenario *</label>
              <select
                name="scenario"
                value={formData.scenario}
                onChange={handleChange}
                className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Accidental Deletion">Accidental Deletion (Emptied Trash)</option>
                <option value="Formatted Media">Formatted Media (OS reinstallation)</option>
                <option value="Corrupted Partition">Corrupted Partition (Raw file system)</option>
                <option value="Water/Liquid Damage">Water / Liquid Spills</option>
                <option value="Physical Drop (Clicking/No Power)">Physical Drop (Clicking / Stalled)</option>
                <option value="Ransomware Encryption">Ransomware / Encryption lockout</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Symptoms & Drive Details *</label>
              <textarea
                name="details"
                required
                rows={4}
                placeholder="List drive capacity, brand/model, symptoms (e.g. clicking sounds, not recognized in BIOS, liquid spill, etc.)..."
                value={formData.details}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="pt-2 text-center">
              {status === "success" ? (
                <div className="text-emerald-400 text-xs font-bold py-2">
                  ✓ Ticket generated! Redirecting to WhatsApp desk...
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gradient w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? "Processing Inquiry..." : "Submit Diagnostic Inquiry"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
