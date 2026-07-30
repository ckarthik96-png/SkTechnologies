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
  Wifi,
  Users,
  ArrowRight,
  Filter
} from "lucide-react";

// The full 15 services list
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
    title: "Networking",
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
    id: "server-management",
    title: "Server Management",
    category: "infra",
    description: "Domain Controller setups, Active Directory policies, DNS configs, IIS/Apache web hosting, and Linux administration.",
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
    title: "Email Solutions",
    category: "cloud",
    description: "Corporate domain setups, spam filtering, distribution groups, SPF/DKIM records validation, and mail migrations.",
    icon: Mail,
  },
  {
    id: "m365",
    title: "Microsoft 365",
    category: "cloud",
    description: "Licensing provisioning, Sharepoint document management, Teams collaboration rules, and security controls.",
    icon: Workflow,
  },
  {
    id: "backup-solutions",
    title: "Backup Solutions",
    category: "cloud",
    description: "Automated local NAS storage and hybrid offsite cloud backups (3-2-1 strategy) with routine recovery testing.",
    icon: HardDriveUpload,
  },
  {
    id: "wifi-deployment",
    title: "Wi-Fi Deployment",
    category: "network",
    description: "Office heatmaps analysis, access point configurations, captive portals, guest networks, and controller tuning.",
    icon: Wifi,
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    category: "infra",
    description: "Comprehensive audits, compliance roadmaps, software assessments, capacity planning, and architecture audits.",
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
            We offer 15 comprehensive services designed to secure, monitor, and scale corporate systems with high reliability.
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
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className="gradient-border-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
                >
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
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-semibold text-primary group-hover:text-white flex items-center gap-1.5 mt-auto transition-colors"
                  >
                    Inquire Service
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
