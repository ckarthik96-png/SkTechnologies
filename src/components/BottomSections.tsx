"use client";

import Link from "next/link";

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
