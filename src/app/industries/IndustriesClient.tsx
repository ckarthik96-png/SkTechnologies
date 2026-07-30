"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Activity,
  ShoppingBag,
  Factory,
  Rocket,
  Landmark,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const industriesList = [
  {
    id: "corporate",
    title: "Corporate Offices",
    icon: Building2,
    tagline: "High-uptime networking, domain configuration, and priority AMC desks.",
    details: [
      "Multi-WAN failover firewall systems preventing office downtime",
      "Active Directory, group policies, and Microsoft 365 migrations",
      "Structured rack dressing and organized Cat6 network cabling",
      "Comprehensive desktop, laptop, and network printer AMC plans"
    ]
  },
  {
    id: "education",
    title: "Education & Campus",
    icon: GraduationCap,
    tagline: "High-density Wi-Fi nodes, student browsing filters, and device labs.",
    details: [
      "Access point controller configuration managing thousands of active devices",
      "Sophos / Fortinet firewall content filtering rules blocking unwanted media",
      "CCTV surveillance networks covering hallways, labs, and gates",
      "Server support for local database portals and email distribution"
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare & Clinics",
    icon: Activity,
    tagline: "Secure data backups, compliant networks, and zero-compromise security.",
    details: [
      "HIPAA-compliant firewall configurations protecting patient records",
      "Local NAS + offsite cloud backup strategy for critical records",
      "Immediate SLA desk response for emergency billing station failures",
      "IP camera security surveillance integrations for reception areas"
    ]
  },
  {
    id: "retail",
    title: "Retail & Multi-Store",
    icon: ShoppingBag,
    tagline: "POS database security, store Wi-Fi, and remote camera monitoring.",
    details: [
      "Secure firewall isolation between client Wi-Fi and POS systems",
      "NVR storage arrays and remote IP CCTV setups on mobile devices",
      "Fast troubleshooting for retail billing desktops and label printers",
      "Consolidated networking management across multiple regional sites"
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industrial",
    icon: Factory,
    tagline: "Rugged network layouts, secure field labs, and active server management.",
    details: [
      "Industrial-grade cabling setups and ruggedized switch installations",
      "Segmented VLAN rules isolating factory machines from office computers",
      "Secure backup redundancy profiles safeguarding production lines",
      "IT Consulting assessments mapping facility scaling requirements"
    ]
  },
  {
    id: "startups",
    title: "Startups & Tech Teams",
    icon: Rocket,
    tagline: "Fast cloud rollouts, developer setups, and agile network systems.",
    details: [
      "Rapid Microsoft 365 licensing, Teams, and Sharepoint provisioning",
      "Advanced Wi-Fi deployment for fluid and high-bandwidth tech spaces",
      "Fast laptops/desktops provisioning and remote admin access configurations",
      "Zero-trust endpoint protection setups tracking threat vector logs"
    ]
  },
  {
    id: "government",
    title: "Government & PSU",
    icon: Landmark,
    tagline: "Highly compliant security protocols, secure DNS, and local support.",
    details: [
      "Rigid cyber-defense policies, secure VPNs, and localized firewalls",
      "System administration support for Linux / Windows legacy server builds",
      "Onsite hardware support ensuring public desk terminal uptime",
      "Regular backup verification runs keeping government records immutable"
    ]
  }
];

export default function IndustriesClient() {
  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Background Radial Glow */}
      <div className="glow-spot top-1/4 left-1/3 bg-primary/10" />
      <div className="glow-spot bottom-1/4 right-1/3 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            Sectors We Support
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Tailored Industry Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            We customize our networking, cybersecurity, and server builds to address the unique compliance and operational demands of your sector.
          </motion.p>
        </div>

        {/* Industry Cards Grid */}
        <div className="space-y-8">
          {industriesList.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                key={ind.id}
                className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col lg:flex-row gap-8 items-start hover:border-primary/20 transition-all duration-300"
              >
                {/* Visual Header */}
                <div className="lg:w-1/3 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{ind.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{ind.tagline}</p>
                  <div>
                    <Link
                      href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                    >
                      Configure Plan
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Details Checklist */}
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full bg-slate-950/20 p-5 rounded-xl border border-white/5">
                  {ind.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
