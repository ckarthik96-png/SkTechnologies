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
            Reliable IT Infrastructure, Cloud & <br />
            <span className="bg-gradient-to-r from-primary via-slate-100 to-accent bg-clip-text text-transparent">
              Cyber Security for Modern Businesses
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Empowering enterprises with certified networking solutions, 24x7 AMC support, next-gen firewalls, and tailored technology services.
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
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-90">
                {[
                  {
                    name: "Google Cloud",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                      </svg>
                    )
                  },
                  {
                    name: "Microsoft 365",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 23 23">
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
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#ff9900" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  },
                  {
                    name: "Jio Fiber",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#0059c3" strokeWidth="2.5" fill="none" />
                        <circle cx="12" cy="12" r="6" stroke="#00a8e8" strokeWidth="2" fill="none" />
                        <circle cx="12" cy="12" r="2" fill="#0059c3" />
                      </svg>
                    )
                  },
                  {
                    name: "Sophos",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0055ff" />
                      </svg>
                    )
                  },
                  {
                    name: "Cisco Systems",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="#049fd9">
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
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#c32026" strokeWidth="2.5" />
                        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#c32026" strokeWidth="2" />
                      </svg>
                    )
                  },
                  {
                    name: "Zoho",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24">
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
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="#00a1e0">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                      </svg>
                    )
                  },
                  {
                    name: "Adobe",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="#ff0000">
                        <path d="M14.3 2.1l9.2 20.3h-5.4l-3-7.2H9.3l-3 7.2H1L10.2 2.1h4.1zM12 6.5L9.9 11.5h4.2L12 6.5z" />
                      </svg>
                    )
                  },
                  {
                    name: "Dropbox",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="#0061ff">
                        <path d="M6 2L1 5.3l5 3.3 5-3.3L6 2zm12 0l-5 3.3 5 3.3 5-3.3L18 2zM1 12l5 3.3 5-3.3-5-3.3-5 3.3zm17-3.3l-5 3.3 5 3.3 5-3.3-5-3.3zM6 16.3l6 4 6-4-6-4.1-6 4.1z" />
                      </svg>
                    )
                  },
                  {
                    name: "Trend Micro",
                    svg: (
                      <svg className="w-7 h-7 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2a10 10 0 1010 10" stroke="#d8232a" strokeWidth="2.5" />
                        <path d="M12 6a6 6 0 106 6" stroke="#d8232a" strokeWidth="2" />
                        <circle cx="12" cy="12" r="2" fill="#d8232a" />
                      </svg>
                    )
                  }
                ].map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 w-full rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all hover:bg-slate-900/50 group"
                  >
                    <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                      {logo.svg}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider text-center group-hover:text-white transition-colors">{logo.name}</span>
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
              View All 18 Services
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

      {/* --- HOMEPAGE DATA RECOVERY PREVIEW --- */}
      <section className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: content */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Secure Labs</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Professional Data Recovery Services
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Lost vital database files, accounting documents, or business assets? We extract files from mechanical clicks mechanical drives, raw partition SSDs, and crashed enterprise RAID controller arrays.
              </p>
              <ul className="grid grid-cols-2 gap-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Hard Disk Drives (HDD)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> SSD & NVMe Modules
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> RAID & NAS Servers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Encrypted Volumes
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/data-recovery"
                  className="btn-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Explore Recovery Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right side: visual mock */}
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-slate-950/40">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full filter blur-xl animate-pulse" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4 border-b border-white/5 pb-2">Diagnostic Scan Log</h4>
              <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed">
                <div>[SYSTEM] Initializing physical drive scan...</div>
                <div className="text-emerald-400">[SUCCESS] Controller board communication active.</div>
                <div>[STATUS] Mechanical head status: <span className="text-amber-400">Degraded (Sector Errors)</span></div>
                <div>[ACTION] Cloning block sectors securely...</div>
                <div className="text-emerald-400">[EXTRACT] 1,480 database files recovered.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOMEPAGE REFURBISHED PRODUCTS PREVIEW --- */}
      <section className="section-padding relative z-10 px-6 border-b border-white/5 bg-[#030611]/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Enterprise Hardware</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Refurbished IT Hardware Catalog</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Get certified, business-grade laptops and desktops from top corporate fleets at a fraction of retail prices, backed by a 6-month support warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Dell Latitude 7490", specs: "i5 8th Gen | 16GB RAM | 256GB SSD", price: "INR 18,500 approx." },
              { name: "Lenovo ThinkPad T480s", specs: "i7 8th Gen | 16GB RAM | 512GB SSD", price: "INR 22,000 approx." },
              { name: "HP EliteBook 840 G5", specs: "i5 8th Gen | 16GB RAM | 512GB SSD", price: "INR 19,800 approx." },
            ].map((p, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{p.name}</h4>
                  <p className="text-[11px] text-slate-400 mb-4">{p.specs}</p>
                </div>
                <div className="flex items-center justify-between text-xs pt-4 border-t border-white/5">
                  <span className="text-slate-500">{p.price}</span>
                  <span className="text-emerald-400 font-semibold">Grade A++</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/refurbished-products"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
            >
              View Refurbished Inventory
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- HOMEPAGE BRANDS SUPPORTED STRIP --- */}
      <section className="py-10 relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Supported Technologies & OEM Brands</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-40 grayscale hover:opacity-75 transition-opacity">
            {["Microsoft", "Cisco", "Fortinet", "Sophos", "Dell", "HP", "Lenovo", "Apple", "VMware", "AWS", "Google Cloud", "Intel", "AMD"].map((brand, idx) => (
              <span key={idx} className="text-xs sm:text-sm font-black tracking-wider text-slate-400">{brand}</span>
            ))}
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

      {/* --- FEATURED ENGAGEMENTS SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-t border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Our Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight animate-fade-in">Featured Engagements</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              Take a look at how we deploy physical networking hardware, execute cloud migrations, and implement automation protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
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

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {engagement.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                      {engagement.desc}
                    </p>
                  </div>
                </div>

                {/* Tags */}
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

      {/* --- PLANS / PRICING SECTION --- */}
      <section className="section-padding relative z-10 px-6 border-t border-white/5 bg-[#030611]/30">
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
                link: "/contact?service=Hardware%20Rentals",
                featured: false,
              },
              {
                title: "Printer Rentals",
                desc: "High-speed laser printing for office paperwork.",
                price: "₹1,499",
                unit: "/ month",
                features: ["Laser MFP Printer", "Toner support included", "Network print capabilities"],
                cta: "Request Rental",
                link: "/contact?service=Hardware%20Rentals",
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
