"use client";

import { motion } from "framer-motion";
import { Compass, Target, Shield, Award, Users, Heart } from "lucide-react";

export default function AboutClient() {
  const values = [
    { title: "Excellence", desc: "We deploy systems to the highest standards, ensuring optimal hardware performance and reliable configurations.", icon: Award },
    { title: "Reliability", desc: "Our 24x7 monitoring protocols and rapid-response AMC services mean you are never left without support.", icon: Shield },
    { title: "Client-Centricity", desc: "We adapt to your team's specific constraints, building architectures around your budget.", icon: Users },
    { title: "Integrity", desc: "Zero hidden costs, verified software licenses, and transparent consulting directives.", icon: Heart },
  ];

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Background Radial Glow */}
      <div className="glow-spot top-1/4 left-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/4 right-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            SkyEagle Journey
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            About SkyEagle Technologies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            We are a modern, client-focused IT infrastructure and managed services partner based in Bengaluru, dedicated to securing and streamlining corporate technologies.
          </motion.p>
        </div>

        {/* Introduction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Securing Office Networks & Cloud Nodes Since Inception
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              SkyEagle Technologies was established with a singular vision: to bridge the gap between high-level enterprise IT architectures and mid-tier corporate systems. Based out of Srinidhi Layout, Konanakunte, Bengaluru, we support businesses across Karnataka with fast onsite deployments and proactive remote support.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Led by Saarika and our board of certified network engineers, we maintain and secure endpoints for over 500 active business installations, offering customized Annual Maintenance Contracts (AMC) that protect company resources round-the-clock.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-xl" />
            <h3 className="text-lg font-bold text-white mb-4">Quick Corporate Profile</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Contact Coordinator</span>
                <span className="font-semibold text-white">Saarika</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Service Coverage</span>
                <span className="font-semibold text-white">Bengaluru, KA, India</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Support Availability</span>
                <span className="font-semibold text-emerald-400">24 Hours / 7 Days</span>
              </li>
              <li className="flex items-center justify-between pb-2">
                <span className="text-slate-500">Primary Core Focus</span>
                <span className="font-semibold text-white">Networking & Cybersecurity</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl border border-white/15 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                To deliver seamless, modern, and highly secure technology infrastructure. We strive to enable firms to operate productively and confidently by deploying proactive IT support systems, mitigating network risks, and handling server workloads efficiently.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl border border-white/15 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 border border-accent/20">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                To become South India&apos;s premier managed service provider (MSP) and a trusted tech catalyst. We envision a business landscape where secure cloud migrations, robust hardware networks, and immediate technical resolutions are accessible and painless for corporate units of all sizes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Our Corporate Values</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">The guidelines governing our service desks and system designs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary mb-4 border border-white/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white mb-2">{v.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
