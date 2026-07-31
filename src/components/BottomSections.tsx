"use client";

import Link from "next/link";
import { ArrowRight, HelpCircle, BookOpen } from "lucide-react";
import Accordion from "./Accordion";

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

const blogPosts = [
  {
    category: "Cloud Security",
    date: "July 28, 2026",
    title: "Microsoft 365 Security Settings Checklist for Office Administrators",
    desc: "A hands-on guide to securing your M365 tenant: enabling MFA, configuring SPF/DKIM validation records, disabling legacy protocols, and preventing database access leaks.",
    author: "SkyEagle Tech Board",
  },
  {
    category: "Network Defense",
    date: "July 15, 2026",
    title: "Why Next-Gen Firewalls Are Essential for Small Business Networks",
    desc: "Unlike standard routers, next-gen firewalls perform Deep Packet Inspection to detect malware payloads, block suspicious outbound ports, and secure remote VPN terminals.",
    author: "Cyber Security Specialist",
  },
  {
    category: "Data Protection",
    date: "June 30, 2026",
    title: "Implementing the 3-2-1 Backup Strategy: A Disaster Recovery Guide",
    desc: "Protect your critical client records from disk malfunctions or malware attacks by storing three copies of database logs across two different media types, with one stored offsite.",
    author: "Systems Engineer",
  },
  {
    category: "IT Procurement",
    date: "June 12, 2026",
    title: "Buying Refurbished Business Laptops: ThinkPad vs. Latitude Comparison",
    desc: "Discover why buying certified business-grade refurbished computers (like the Lenovo T480s or Dell Latitude 7490) is far superior to buying consumer laptops, at a fraction of the cost.",
    author: "Hardware Desk",
  },
];

export default function BottomSections() {
  const partners = [
    {
      name: "Google Cloud",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    },
    {
      name: "Microsoft 365",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 23 23">
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
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#ff9900" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: "Jio Fiber",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#0059c3" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="6" stroke="#00a8e8" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" fill="#0059c3" />
        </svg>
      )
    },
    {
      name: "Sophos",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#0055ff" />
        </svg>
      )
    },
    {
      name: "Cisco Systems",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#049fd9">
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
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#c32026" strokeWidth="2.5" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#c32026" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: "Zoho",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24">
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
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#00a1e0">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    },
    {
      name: "Adobe",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#ff0000">
          <path d="M14.3 2.1l9.2 20.3h-5.4l-3-7.2H9.3l-3 7.2H1L10.2 2.1h4.1zM12 6.5L9.9 11.5h4.2L12 6.5z" />
        </svg>
      )
    },
    {
      name: "Dropbox",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#0061ff">
          <path d="M6 2L1 5.3l5 3.3 5-3.3L6 2zm12 0l-5 3.3 5 3.3 5-3.3L18 2zM1 12l5 3.3 5-3.3-5-3.3-5 3.3zm17-3.3l-5 3.3 5 3.3 5-3.3-5-3.3zM6 16.3l6 4 6-4-6-4.1-6 4.1z" />
        </svg>
      )
    },
    {
      name: "Trend Micro",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M12 2a10 10 0 1010 10" stroke="#d8232a" strokeWidth="2.5" />
          <path d="M12 6a6 6 0 106 6" stroke="#d8232a" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" fill="#d8232a" />
        </svg>
      )
    }
  ];

  const steps = [
    { step: "01", name: "Consultation", desc: "Detail office endpoints & cabling requirements." },
    { step: "02", name: "Assessment", desc: "Map network structure gaps & security endpoints." },
    { step: "03", name: "Proposal", desc: "Share custom budget options & OEM spec sheets." },
    { step: "04", name: "Deployment", desc: "Certified installation of switches, servers & firewalls." },
    { step: "05", name: "Testing", desc: "Rigorous diagnostic sweeps & backup failover checks." },
    { step: "06", name: "Support", desc: "24x7 priority maintenance sweeps & remote helpdesk." }
  ];

  return (
    <>
      {/* OEM Partners Section */}
      <section className="py-20 relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">OEM Partners</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Trusted Technology Partners</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-90">
            {partners.map((logo, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 w-full rounded-xl bg-[#0b0f19]/80 border border-white/5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all hover:bg-slate-900/50 group"
              >
                <div className="mb-2.5 group-hover:scale-110 transition-transform duration-300">
                  {logo.svg}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider text-center group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Strategy Process Section */}
      <section className="py-20 relative z-10 px-6 border-b border-white/5 bg-[#030611]/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Structured Process</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4">
              We follow a strict 6-step project delivery loop to ensure uptime stability and security validation.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {steps.map((p, idx) => (
              <div key={idx} className="relative text-center z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-primary/30 flex items-center justify-center text-primary font-extrabold text-xs mb-4 shadow-lg shadow-primary/5">
                  {p.step}
                </div>
                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">{p.name}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed max-w-[150px] mx-auto">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10 px-6 border-b border-white/5 bg-[#030611]/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> FAQ
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Resources & Blog Section */}
      <section className="py-20 relative z-10 px-6 border-b border-white/5 bg-[#030611]/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3 flex items-center justify-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Resources & Blog
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Insights & Technology Best Practices</h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-4">
              Read guides, configuration walkthroughs, and cybersecurity audits published by our Bengaluru engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {blogPosts.map((art, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col justify-between bg-slate-950/20 group hover:border-primary/20 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{art.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-base md:text-lg mb-2.5 group-hover:text-primary transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {art.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {art.author}
                  </span>
                  <div className="flex items-center gap-3.5">
                    <Link
                      href={`/contact?inquiry=Blog+Details&article=${encodeURIComponent(art.title)}`}
                      className="text-[10px] font-bold text-primary hover:text-white uppercase tracking-wider"
                    >
                      Ask Question
                    </Link>
                    <Link
                      href="/blog"
                      className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
                    >
                      Read Full <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Center PDF Strip */}
      <div className="bg-slate-900/60 border-y border-white/5 py-8 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white text-sm">Downloads Center</h4>
              <p className="text-xs text-slate-400">Company Profile, AMC Service Sheet & Product Catalog — free PDFs</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/downloads/SkyEagle-Company-Profile-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Company Profile
            </a>
            <a href="/downloads/SkyEagle-AMC-Service-Sheet-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              AMC Service Sheet
            </a>
            <a href="/downloads/SkyEagle-Product-Catalog-2025.pdf" download className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 rounded-lg text-[11px] font-semibold text-white transition-all inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Product Catalog
            </a>
            <Link href="/downloads" className="btn-gradient px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
