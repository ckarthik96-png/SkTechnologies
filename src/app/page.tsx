"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";

// Services subset to display on home page
const featuredServices = [
  {
    title: "Networking Solutions",
    description: "Enterprise-grade wired & wireless network design, Wi-Fi deployments, and robust router configurations.",
    icon: Network,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Cyber Security & Firewall",
    description: "Advanced threat protection, multi-layer firewall installations, and absolute data defense systems.",
    icon: ShieldCheck,
    color: "from-red-500 to-purple-500",
  },
  {
    title: "Cloud & Email Solutions",
    description: "Seamless Microsoft 365, Google Workspace, and scalable cloud backups for secure remote collaboration.",
    icon: Cloud,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Server & IT Infrastructure",
    description: "Active server management, secure domain controllers, storage systems, and virtualization solutions.",
    icon: Server,
    color: "from-amber-500 to-orange-500",
  },
];

// Why Choose Us features
const features = [
  { title: "24x7 Support", desc: "Constant remote and onsite monitoring to prevent downtime.", icon: Clock },
  { title: "Certified Engineers", desc: "Expert staff certified in security, networking, and server platforms.", icon: Award },
  { title: "Enterprise Solutions", desc: "Top-tier architectures scaled down for growing businesses.", icon: Cpu },
  { title: "Affordable Pricing", desc: "Transparent costing models built around your operating budget.", icon: Briefcase },
  { title: "Fast Deployment", desc: "Rapid project rollouts, testing, and documentation procedures.", icon: Workflow },
  { title: "Trusted Partner", desc: "A reliable technology advisor focused on your business growth.", icon: Users },
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
    answer: "An AMC is a comprehensive service agreement where SkyEagle takes full responsibility for maintaining your IT hardware, networks, desktops, and printers. It includes routine diagnostic cleanups, unlimited remote desk help, and prompt emergency onsite engineer visits.",
  },
  {
    question: "Does SkyEagle design and install structured network cabling?",
    answer: "Yes! We specialize in end-to-end structured network cabling (Cat6/Cat6A/Fiber), rack dressing, switch provisioning, and enterprise Wi-Fi deployment for corporate offices, warehouses, and educational campuses.",
  },
  {
    question: "How does your client contact routing system work?",
    answer: "When you fill out our contact form, it captures your details and immediately formats them into a neat message template, opening a WhatsApp chat with Saarika, our direct coordinator. This ensures instant response and prevents tickets from getting lost in slow email pipelines.",
  },
  {
    question: "What security measures do you deploy for office firewalls?",
    answer: "We deploy industry-standard next-generation firewalls (NGFW) from top partners like Fortinet, Sophos, and SonicWall. Our setups configure Deep Packet Inspection, sandboxing, malware filters, employee browsing controls, and secure Site-to-Site IPsec VPNs.",
  },
];

const bespokeTabs = [
  {
    label: "Web Applications",
    title: "Web Applications & Portals",
    desc: "We build secure, responsive web applications and portals that allow your customers or team to sync databases, track service requests, and manage M365 accounts across any device seamlessly.",
    code: `import { syncNode, dbConnect } from "@skyeagle/sync-sdk";

export default async function SyncService() {
  const connection = await dbConnect(process.env.DATABASE_URL);
  const nodeStatus = await syncNode({
    nodeId: "SE-BLR-062",
    clientName: "SkyEagle Technologies",
    protocols: ["HTTPS", "WSS"],
    encryption: "AES-256-GCM"
  });
  return nodeStatus.active ? "Sync Successful" : "Failover Initiated";
}`,
    fileName: "app/sync-service.ts"
  },
  {
    label: "Networking Config",
    title: "Enterprise LAN & WAN Routing",
    desc: "Robust network topology configurations defining secure VLAN routing tables, multi-WAN load balancing interfaces, and high-density Access Point controls.",
    code: `interface GigabitEthernet0/1
 description WAN_PRIMARY_FIBER
 ip address 192.168.10.2 255.255.255.252
 ip nat outside
!
interface VLAN 62
 description CORPORATE_OFFICE_LAN
 ip address 10.62.1.1 255.255.255.0
 ip nat inside
 ip access-group SECURE_TRAFFIC in`,
    fileName: "cisco-ios.config"
  },
  {
    label: "Cloud Architecture",
    title: "Terraform Infrastructure as Code",
    desc: "Automated provisioning of secure Amazon Web Services (AWS) or Microsoft Azure cloud structures, establishing encrypted backup buckets and identity rules.",
    code: `resource "aws_s3_bucket" "skyeagle_backup" {
  bucket = "skyeagle-secure-backups-blr"
  tags = {
    Environment = "Production"
    Compliance  = "HIPAA-Encrypted"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encrypt" {
  bucket = aws_s3_bucket.skyeagle_backup.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}`,
    fileName: "main.tf"
  },
  {
    label: "Cyber Security",
    title: "Next-Gen Firewall Rules",
    desc: "Rigid security rules configurations enforcing Deep Packet Inspection, sandboxing logs, and blocking unauthorized database access attempts.",
    code: `firewall-policy:
  name: SECURE_INBOUND_FILTER
  target: WAN_PORT_1
  action: INSPECT
  rules:
    - source: ANY
      destination: DB_ZONE_VLAN62
      ports: [3306, 5432]
      action: DENY_AND_LOG
    - source: VPN_IPSEC_TUNNEL
      destination: CORPORATE_OFFICE_LAN
      action: ALLOW`,
    fileName: "fortigate-policy.yaml"
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedBespokeTab, setSelectedBespokeTab] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen">
      {/* Glowspots */}
      <div className="glow-spot -top-20 -left-20 bg-primary/20" />
      <div className="glow-spot top-1/3 -right-20 bg-accent/15" />
      <div className="glow-spot bottom-10 left-1/3 bg-secondary/10" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        <HeroBackground />
        
        <div className="container mx-auto max-w-5xl text-center z-10">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold mb-8 uppercase tracking-widest backdrop-blur"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Reliable Enterprise IT Support
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Empowering Businesses with <br />
            <span className="bg-gradient-to-r from-primary via-slate-100 to-accent bg-clip-text text-transparent">
              Smart IT Solutions
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Reliable Networking, Cyber Security, Cloud Infrastructure, and End-to-End Managed Technology Services tailored for enterprise-grade performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-gradient w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 text-white transition-all backdrop-blur cursor-pointer"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Floating details / technology grid look */}
        <div className="absolute bottom-10 left-0 right-0 hidden md:flex items-center justify-center gap-12 text-slate-500 text-xs tracking-wider uppercase font-semibold">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> CYBER SECURITY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="flex items-center gap-1.5"><Network className="w-4 h-4 text-accent" /> ENTERPRISE WI-FI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="flex items-center gap-1.5"><Cloud className="w-4 h-4 text-secondary" /> M365 CLOUD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="flex items-center gap-1.5"><Server className="w-4 h-4 text-primary" /> AMC SUPPORT</span>
        </div>
      </section>

      {/* --- STATS / OVERVIEW SECTION --- */}
      <section className="relative px-6 py-12 border-t border-b border-white/5 bg-[#030610]/80 backdrop-blur z-10">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { count: "500+", label: "Active Network Nodes" },
            { count: "99.99%", label: "Uptime Maintained" },
            { count: "24/7", label: "Incident Support" },
            { count: "15+", label: "Certified IT Specialists" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent mb-1">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PARTNERS / TECHNOLOGY ENABLER SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Technology Enabler</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Grow Your Business 10x with <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SkyEagle</span>
              </h3>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                SkyEagle Technologies brings all of your business requirements under one roof, integrating services, sales operations, networks, cybersecurity, and cloud support altogether.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Grid of Logos */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-slate-950/40 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-85">
                {[
                  { name: "Google Cloud", icon: "☁️" },
                  { name: "Microsoft 365", icon: "💻" },
                  { name: "AWS", icon: "📦" },
                  { name: "Jio Fiber", icon: "🌐" },
                  { name: "Sophos Security", icon: "🛡️" },
                  { name: "Cisco Systems", icon: "🔌" },
                  { name: "Fortinet", icon: "🧱" },
                  { name: "Zoho Enterprise", icon: "⚙️" },
                  { name: "Salesforce", icon: "☁️" },
                  { name: "Adobe Cloud", icon: "🎨" },
                  { name: "Dropbox", icon: "📁" },
                  { name: "Trend Micro", icon: "👾" }
                ].map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 w-full rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 transition-all hover:bg-slate-900/50 group"
                  >
                    <span className="text-xl mb-1.5 group-hover:scale-110 transition-transform duration-300">{logo.icon}</span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider text-center group-hover:text-white transition-colors">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="section-padding relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Enterprise Solutions</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Premier Services</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              From proactive cyber defenses to unified cloud configurations, we deploy robust solutions matching your corporate scale.
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
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-primary hover:text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              View All 15 Services
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- BESPOKE SOLUTIONS / SYNC ACROSS DEVICES SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-t border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Our Bespoke Solutions</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Sync Across All Devices</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Everything you need to make your business grow super fast! Our unified architectures adapt dynamically to desktop, laptop, mobile, and field hardware.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-xl mx-auto">
            {bespokeTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedBespokeTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                  selectedBespokeTab === idx
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Showcase split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Code Viewer Mockup (7 cols) */}
            <div className="lg:col-span-7 w-full">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#02040b] shadow-2xl">
                {/* Header bar */}
                <div className="bg-[#080d19] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wide bg-[#0d1527] px-3 py-1 rounded border border-white/5">
                    {bespokeTabs[selectedBespokeTab].fileName}
                  </span>
                  <div className="w-12" /> {/* spacer */}
                </div>

                {/* Code Body */}
                <div className="p-5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-slate-300 max-h-[300px]">
                  <pre className="whitespace-pre">
                    {bespokeTabs[selectedBespokeTab].code}
                  </pre>
                </div>
              </div>
            </div>

            {/* Right: Text details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {bespokeTabs[selectedBespokeTab].title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {bespokeTabs[selectedBespokeTab].desc}
              </p>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-t border-white/5 bg-[#030611]/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Our Core Assets</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Why Choose SkyEagle Technologies</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              We focus on delivering high-reliability systems and certified technical expertise, acting as your extended IT department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1.5">{feat.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES SECTION --- */}
      <section className="section-padding relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Sectors We Empower</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Custom Configurations by Industry</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              "Corporate",
              "Education",
              "Healthcare",
              "Retail",
              "Manufacturing",
              "Startups",
              "Government",
            ].map((ind, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-xl text-center flex flex-col items-center justify-center border border-white/5 hover:border-primary/30 transition-all hover:bg-slate-900/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold mb-3 border border-primary/20">
                  0{idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE TIMELINE / PROCESS --- */}
      <section className="section-padding relative z-10 px-6 border-t border-white/5 bg-[#030611]/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">How We Engage</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Structured Process</h3>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-[30px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 z-0" />

            {[
              { step: "01", name: "Consultation", desc: "We review your active IT endpoints, security rules, and structural gaps." },
              { step: "02", name: "Planning", desc: "Detailed proposal mapping hardware specs, firewall rules, and backup timelines." },
              { step: "03", name: "Implementation", desc: "Staging, deploying components, training personnel, and system validation." },
              { step: "04", name: "Support", desc: "Continuous 24x7 monitoring, ticketing, and preventive onsite checkups." },
            ].map((p, idx) => (
              <div key={idx} className="relative text-center z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-slate-950 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-sm mb-5 shadow-lg shadow-primary/5">
                  {p.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{p.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="section-padding relative z-10 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Success Stories</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What Our Clients Say</h3>
          </div>

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 rounded-2xl border border-white/10 text-center"
              >
                <p className="text-base sm:text-lg italic text-slate-200 leading-relaxed mb-6">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <h4 className="font-bold text-white text-base">
                  {testimonials[activeTestimonial].author}
                </h4>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  {testimonials[activeTestimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center items-center gap-2.5 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                    activeTestimonial === idx ? "bg-primary w-6" : "bg-slate-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-t border-white/5 bg-[#030611]/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Answers & Support</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* --- CONTACT & MAP SECTION --- */}
      <section className="section-padding relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Details and Map */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Connect Instantly</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Let&apos;s Secure &amp; Scale Your Node</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-8">
                  Get custom hardware quotes, establish reliable AMC support, or request urgent network deployments. Our representative Saarika is online.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest">Call Directly</div>
                      <a href="tel:+919353427314" className="text-sm text-slate-300 font-semibold hover:text-primary transition-colors">
                        +91 93534 27314
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest">Email Support</div>
                      <a href="mailto:sales@skyeagletechno.com" className="text-sm text-slate-300 font-semibold hover:text-primary transition-colors break-all">
                        sales@skyeagletechno.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden border border-white/10 relative">
                <iframe
                  title="SkyEagle Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.373465819777!2d77.56846187593256!3d12.883713087423588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1565576d337d%3A0xe54d2dc8c8d8d3f1!2sSrinidhi%20Layout%2C%20Konanakunte%2C%20Bengaluru%2C%20Karnataka%20560062!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
