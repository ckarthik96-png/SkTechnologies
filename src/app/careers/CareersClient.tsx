"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, UserPlus } from "lucide-react";

const positions = [
  {
    id: 1,
    title: "IT Support Engineer (Onsite)",
    department: "Infrastructure & Operations",
    location: "Bengaluru, India",
    type: "Full-Time",
    desc: "Responsibilities include structured cabling, installing switches & next-gen firewalls (Sophos/Fortinet), CCTV deployments, printer support, and hardware diagnostics.",
    requirements: [
      "1-3 years experience in onsite IT infrastructure deployments",
      "Familiarity with network topologies and hardware troubleshooting",
      "Valid driver license for local office service visits"
    ],
  },
  {
    id: 2,
    title: "Remote Systems Administrator",
    department: "Managed Cloud Services",
    location: "Remote / Hybrid (Bengaluru Office)",
    type: "Full-Time",
    desc: "Handling domain controller configurations, Microsoft 365 migrations, user access directory rules, backup logs validation, and SLA incident resolutions.",
    requirements: [
      "Knowledge of Active Directory, Exchange Online, and Azure Cloud AD",
      "Experience setting up secure backups (NAS and cloud replications)",
      "Excellent communication skills for handling SLA client inquiries"
    ],
  },
];

export default function CareersClient() {
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
            Join Our Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Build Your IT Career with SkyEagle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Work with certified engineers, deploy high-end network topologies, secure enterprise cloud systems, and gain hands-on hardware training.
          </motion.p>
        </div>

        {/* Positions List */}
        <div className="space-y-8 mb-20">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-primary" /> Active Job Openings
          </h2>
          {positions.map((pos) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={pos.id}
              className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {pos.department}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2.5">{pos.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {pos.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" /> {pos.type}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {pos.desc}
              </p>

              <div className="bg-slate-950/20 p-5 rounded-xl border border-white/5 mb-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Minimum Qualifications</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  {pos.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <a
                  href={`https://wa.me/919353427314?text=Hello%20Saarika,%20I%20am%20interested%20in%20applying%20for%20the%20${encodeURIComponent(pos.title)}%20position.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  Apply via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* General Application */}
        <div className="p-8 rounded-2xl glass-card border border-white/10 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl" />
          <h3 className="text-xl font-bold text-white mb-2">Don&apos;t See Your Role?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
            We are always looking for certified technicians, hardware engineers, and database administrators. Send your CV to our sales coordinators.
          </p>
          <a
            href="mailto:sales@skyeagletechno.com?subject=Job%20Application%20-%20General%20Inquiry"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 text-white"
          >
            <UserPlus className="w-4 h-4" />
            Email Your Resume
          </a>
        </div>

      </div>
    </div>
  );
}
