"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Briefcase, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Corporate Office Network Infrastructure",
    client: "Fintech Startup, HSR Layout",
    category: "Networking",
    desc: "Designed and deployed a high-redundancy Cisco core network with Cat6 structure cabling, clean rack layouts, and VLAN isolation for a 120-user fintech office space.",
    outcomes: [
      "Zero-downtime dual-WAN routing topology setup",
      "VLAN segmentation separating client POS from employee desks",
      "Full rack dressing and patch panel labeling"
    ],
  },
  {
    id: 2,
    title: "Enterprise Microsoft 365 Migration",
    client: "Logistics Leader, Whitefield",
    category: "Cloud",
    desc: "Migrated 200+ legacy email accounts to Microsoft 365 Cloud. Configured Sharepoint Document vaults, Teams collaboration compliance, and SPF/DKIM validation rules.",
    outcomes: [
      "Zero email disruption during weekend cutover",
      "Configured multi-factor authentication rules for logins",
      "Migrated 1.2TB of file servers to Sharepoint libraries"
    ],
  },
  {
    id: 3,
    title: "Sophos Next-Gen Firewall Installation",
    client: "Healthcare Clinic Network, Indiranagar",
    category: "Security",
    desc: "Deployed high-availability Sophos XGS Firewalls across three clinic branches in Bengaluru, implementing strict Web Filtering, sandboxing logs, and secure IPsec VPN tunnels.",
    outcomes: [
      "Blocked unauthorized SQL database traffic attempts",
      "Connected multiple clinic branches to unified secure VPN",
      "HIPAA-compliant web traffic filtering configured"
    ],
  },
  {
    id: 4,
    title: "IP CCTV Surveillance Deployment",
    client: "Fulfillment Center, Peenya",
    category: "Security",
    desc: "Installed a 48-channel high-definition IP camera network with 4K camera nodes, central Network Video Recorder (NVR), RAID backup storage, and remote client app access.",
    outcomes: [
      "100% blindspot coverage verified through heatmaps",
      "30-day continuous video backup with RAID-5 protection",
      "Safe mobile app access keys configured for managers"
    ],
  },
  {
    id: 5,
    title: "Biometric Attendance & Access Control",
    client: "Manufacturing Facility, Bommasandra",
    category: "Infrastructure",
    desc: "Configured automated biometric scanner access control locks at entry gates and integrated timesheet reporting systems directly with ERP software.",
    outcomes: [
      "Automatic shift time capture reducing manual sheet entries",
      "Magnetic door locks block unauthorized zone visits",
      "Integrated emergency fire alarm exit door overrides"
    ],
  },
  {
    id: 6,
    title: "High-Density Enterprise Wi-Fi",
    client: "Tech Park Coworking, Electronic City",
    category: "Networking",
    desc: "Conducted RF site survey heatmaps and configured high-density Aruba access points, handling over 500 simultaneous wireless user devices.",
    outcomes: [
      "Seamless roaming across 20,000 sq ft office",
      "Bandwidth throttling preventing download congestion",
      "Isolated secure Guest Portal configured"
    ],
  },
];

export default function PortfolioClient() {
  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Glow spots */}
      <div className="glow-spot top-1/4 left-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/4 right-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            Our Case Studies
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            IT Deployments & Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Review actual systems configurations, migrations, and installations deployed by SkyEagle Technologies across commercial workspaces in Karnataka.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((proj) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              key={proj.id}
              className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row gap-8 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Category indicator */}
              <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                {proj.category}
              </div>

              {/* Text side */}
              <div className="md:w-1/2 space-y-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{proj.client}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {proj.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/contact?service=Inquiry&project=${encodeURIComponent(proj.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Discuss Similar Project
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Outcomes list */}
              <div className="md:w-1/2 bg-slate-950/30 p-6 rounded-xl border border-white/5 flex flex-col justify-center">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Key Outcomes Deployed</h4>
                <ul className="space-y-3">
                  {proj.outcomes.map((out, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-2xl glass-card border border-white/10 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl" />
          <h3 className="text-xl font-bold text-white mb-2">Have a Custom IT Project in Mind?</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We provide full consulting, roadmap budgeting, and certified engineers for corporate office setups.
          </p>
          <Link
            href="/contact"
            className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            Get Custom Proposal
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
