"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Network,
  Cloud,
  ShieldAlert,
  Video,
  Lock,
  Cpu,
  FileSignature,
  Laptop,
  Printer,
  Mail,
  Workflow,
  HardDriveUpload,
  Users,
  ArrowRight,
  Filter,
  Fingerprint,
  Cable,
  Activity,
  Database
} from "lucide-react";

// The full 18 services list
const servicesList = [
  {
    id: "it-infra",
    title: "IT Infrastructure",
    category: "infra",
    description: "Designing, sourcing, and configuring full office network hardware, virtualization clusters, and cable systems.",
    icon: Cpu,
  },
  {
    id: "networking",
    title: "Networking & Wi-Fi",
    category: "network",
    description: "Robust WAN routing, LAN segmentations, VLAN routing tables, switches, and load balancer installations.",
    icon: Network,
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    category: "cloud",
    description: "Secure migrations, backup replication pipelines, infrastructure-as-a-service configurations (AWS/Azure).",
    icon: Cloud,
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    category: "network",
    description: "Threat detection scanning, end-point antivirus monitoring, access permissions (IAM), and security audits.",
    icon: ShieldAlert,
  },
  {
    id: "cctv-solutions",
    title: "CCTV Solutions",
    category: "network",
    description: "IP camera installations, Network Video Recorder (NVR) setup, storage arrays, and mobile monitoring integrations.",
    icon: Video,
  },
  {
    id: "firewall-installation",
    title: "Firewall Installation",
    category: "network",
    description: "Deploying Sophos, Fortinet, and SonicWall next-gen firewalls with Deep Packet Inspection and VPN routing.",
    icon: Lock,
  },
  {
    id: "server-installation",
    title: "Server Installation & Maintenance",
    category: "infra",
    description: "Physical and virtual server setups, raid array configurations, power backups, and daily uptime monitoring.",
    icon: Server,
  },
  {
    id: "amc",
    title: "Annual Maintenance Contract (AMC)",
    category: "support",
    description: "Proactive computer health checkups, monthly network sweeps, preventive repairs, and priority onsite SLA response.",
    icon: FileSignature,
  },
  {
    id: "laptop-desktop-support",
    title: "Laptop/Desktop Support",
    category: "support",
    description: "Operating system reinstalls, hardware updates (SSD/RAM), software compliance checks, and remote debugging.",
    icon: Laptop,
  },
  {
    id: "printer-support",
    title: "Printer Support",
    category: "support",
    description: "Network printer installation, driver deployment, spooler troubleshooting, and preventive maintenance.",
    icon: Printer,
  },
  {
    id: "email-solutions",
    title: "Email & Domain Solutions",
    category: "cloud",
    description: "Corporate domain setups, spam filtering, distribution groups, SPF/DKIM records validation, and mail migrations.",
    icon: Mail,
  },
  {
    id: "m365",
    title: "Microsoft 365 Integration",
    category: "cloud",
    description: "Licensing provisioning, Sharepoint document management, Teams collaboration rules, and security controls.",
    icon: Workflow,
  },
  {
    id: "backup-solutions",
    title: "Backup & Disaster Recovery",
    category: "cloud",
    description: "Automated local NAS storage and hybrid offsite cloud backups (3-2-1 strategy) with routine recovery testing.",
    icon: HardDriveUpload,
  },
  {
    id: "structured-cabling",
    title: "Structured Cabling",
    category: "network",
    description: "Clean voice & data Cat6 laying, patch panel dressing, rack mapping, and physical connectivity certification.",
    icon: Cable,
  },
  {
    id: "biometric-attendance",
    title: "Biometric Attendance Systems",
    category: "infra",
    description: "Fingerprint and facial scanners installation, magnetic locks, gate barriers, and local time logs software config.",
    icon: Fingerprint,
  },
  {
    id: "vpn-solutions",
    title: "VPN & Remote Access",
    category: "network",
    description: "Secure site-to-site tunnels and remote client dial-in portals, enabling safe database sync for home offices.",
    icon: Activity,
  },
  {
    id: "data-recovery-srv",
    title: "Professional Data Recovery",
    category: "cloud",
    description: "Secure forensic file extraction from mechanical clicks HDDs, raw partition flash SSDs, and broken RAID sets.",
    icon: Database,
  },
  {
    id: "remote-it-support",
    title: "Remote IT Support",
    category: "support",
    description: "Rapid response screen share diagnosis resolving server logs, user permissions, and email client failures.",
    icon: Users,
  },
];

const categories = [
  { value: "all", label: "All Services" },
  { value: "network", label: "Network & Security" },
  { value: "cloud", label: "Cloud & Data" },
  { value: "infra", label: "Infrastructure" },
  { value: "support", label: "Support & AMC" },
];

function getServiceIllustration(category: string) {
  switch (category) {
    case "infra":
      return (
        <svg className="absolute top-4 right-4 w-16 h-16 text-white/[0.02] group-hover:text-primary/[0.07] transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="20" width="60" height="15" rx="2" />
          <rect x="20" y="42" width="60" height="15" rx="2" />
          <rect x="20" y="65" width="60" height="15" rx="2" />
          <circle cx="30" cy="27.5" r="2.5" fill="currentColor" />
          <circle cx="30" cy="49.5" r="2.5" fill="currentColor" />
          <circle cx="30" cy="72.5" r="2.5" fill="currentColor" />
          <circle cx="40" cy="27.5" r="1.5" fill="currentColor" />
          <circle cx="40" cy="49.5" r="1.5" fill="currentColor" />
          <circle cx="40" cy="72.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "network":
      return (
        <svg className="absolute top-4 right-4 w-16 h-16 text-white/[0.02] group-hover:text-primary/[0.07] transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="25" r="8" />
          <circle cx="25" cy="65" r="8" />
          <circle cx="75" cy="65" r="8" />
          <line x1="45" y1="31" x2="30" y2="59" />
          <line x1="55" y1="31" x2="70" y2="59" />
          <line x1="33" y1="65" x2="67" y2="65" strokeDasharray="3 3" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="absolute top-4 right-4 w-16 h-16 text-white/[0.02] group-hover:text-primary/[0.07] transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 25c-15 0-20 10-20 15 0 2 0 5 3 7-5 1-8 5-8 10 0 7 6 13 13 13h24c7 0 13-6 13-13 0-5-3-9-8-10 3-2 3-5 3-7 0-5-5-15-20-15z" />
          <path d="M38 52h24M44 58h12" strokeWidth="1" />
        </svg>
      );
    case "support":
    default:
      return (
        <svg className="absolute top-4 right-4 w-16 h-16 text-white/[0.02] group-hover:text-primary/[0.07] transition-colors pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="25" width="60" height="40" rx="3" />
          <path d="M35 65l-5 12h40l-5-12" />
          <line x1="20" y1="53" x2="80" y2="53" />
        </svg>
      );
  }
}

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (value: string) => {
    router.push(`/services?category=${value}`, { scroll: false });
  };

  const filteredServices = activeCategory === "all"
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Glow Spots */}
      <div className="glow-spot top-1/3 right-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/3 left-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            Full Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Managed Technology Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            We offer 18 comprehensive services designed to secure, monitor, and scale corporate systems with high reliability.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 bg-slate-950/40 p-2 rounded-2xl border border-white/5 max-w-4xl mx-auto backdrop-blur">
          <span className="text-slate-500 text-xs uppercase tracking-widest pl-3 pr-2 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Filter</span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const linkHref = service.id === "data-recovery-srv" 
                ? "/data-recovery" 
                : `/contact?service=${encodeURIComponent(service.title)}`;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className="gradient-border-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {getServiceIllustration(service.category)}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5 border border-primary/20 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={linkHref}
                    className="text-xs font-semibold text-primary group-hover:text-white flex items-center gap-1.5 mt-auto transition-colors"
                  >
                    {service.id === "data-recovery-srv" ? "Get Diagnostics Form" : "Inquire Service"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA Summary Card */}
        <div className="mt-20 p-8 rounded-2xl glass-card border border-white/10 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl" />
          <h3 className="text-xl font-bold text-white mb-2">Need a Custom SLA / AMC Proposal?</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We offer bundle pricing and custom Annual Maintenance Contracts tailored around your office size and IT nodes.
          </p>
          <Link
            href="/contact"
            className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            Get Custom Proposal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ServicesClient() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
