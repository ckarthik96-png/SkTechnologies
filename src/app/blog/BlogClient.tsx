"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ChevronRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Microsoft 365 Security Settings Checklist for Office Administrators",
    date: "July 28, 2026",
    author: "SkyEagle Tech Board",
    category: "Cloud Security",
    desc: "A hands-on guide to securing your M365 tenant: enabling MFA, configuring SPF/DKIM validation records, disabling legacy protocols, and preventing database access leaks.",
  },
  {
    id: 2,
    title: "Why Next-Gen Firewalls Are Essential for Small Business Networks",
    date: "July 15, 2026",
    author: "Cyber Security Specialist",
    category: "Network Defense",
    desc: "Unlike standard routers, next-gen firewalls perform Deep Packet Inspection to detect malware payloads, block suspicious outbound ports, and secure remote VPN terminals.",
  },
  {
    id: 3,
    title: "Implementing the 3-2-1 Backup Strategy: A Disaster Recovery Guide",
    date: "June 30, 2026",
    author: "Systems Engineer",
    category: "Data Protection",
    desc: "Protect your critical client records from disk malfunctions or malware attacks by storing three copies of database logs across two different media types, with one stored offsite.",
  },
  {
    id: 4,
    title: "Buying Refurbished Business Laptops: ThinkPad vs. Latitude Comparison",
    date: "June 12, 2026",
    author: "Hardware Desk",
    category: "IT Procurement",
    desc: "Discover why buying certified business-grade refurbished computers (like the Lenovo T480s or Dell Latitude 7490) is far superior to buying consumer laptops, at a fraction of the cost.",
  },
];

export default function BlogClient() {
  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Glow spots */}
      <div className="glow-spot top-1/4 right-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/4 left-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            Resources & Blog
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Insights & Technology Best Practices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Read guides, configuration walkthroughs, and cybersecurity audits published by our Bengaluru engineering team.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={art.id}
              className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <span className="text-[11px] text-slate-500 flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary" /> {art.author}</span>
                <Link
                  href={`/contact?inquiry=Blog+Details&article=${encodeURIComponent(art.title)}`}
                  className="text-xs font-bold text-primary group-hover:text-white flex items-center gap-1 transition-colors"
                >
                  Ask Question
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
