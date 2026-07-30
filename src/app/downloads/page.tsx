import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads Center | SkyEagle Technologies",
  description:
    "Download SkyEagle Technologies Company Profile, AMC Service Sheet, and full Product & Services Catalog as PDF documents.",
};

const downloads = [
  {
    id: "company-profile",
    title: "Company Profile",
    subtitle: "Who We Are & What We Do",
    description:
      "A complete overview of SkyEagle Technologies — our mission, service portfolio, technology partnerships, industries served, and contact details. Ideal for sharing with procurement teams.",
    file: "/downloads/SkyEagle-Technologies-Company-Profile-2025.pdf",
    size: "~320 KB",
    pages: "3 Pages",
    updated: "July 2025",
    icon: (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
        <path d="M12 12h.01"/><path d="M8 12h.01"/><path d="M16 12h.01"/>
      </svg>`
    ),
    gradient: "from-blue-600 to-cyan-500",
    tag: "Overview",
  },
  {
    id: "amc-service-sheet",
    title: "AMC Service Sheet",
    subtitle: "Annual Maintenance Contract Plans",
    description:
      "Detailed breakdown of our three AMC tiers (Basic, Standard, Enterprise) including SLA commitments, coverage scope, pricing, response times, and contract terms.",
    file: "/downloads/SkyEagle-Technologies-AMC-Service-Sheet-2025.pdf",
    size: "~280 KB",
    pages: "2 Pages",
    updated: "July 2025",
    icon: (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>`
    ),
    gradient: "from-emerald-600 to-teal-500",
    tag: "Contracts",
  },
  {
    id: "product-catalog",
    title: "Product Catalog",
    subtitle: "Hardware, Rentals & IT Services",
    description:
      "Full catalog of refurbished laptops, desktops, workstations, monitors, printer rentals, networking equipment, genuine spare parts, and managed IT services with pricing.",
    file: "/downloads/SkyEagle-Technologies-Product-Catalog-2025.pdf",
    size: "~350 KB",
    pages: "3 Pages",
    updated: "July 2025",
    icon: (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <polyline points="3.29 7 12 12 20.71 7"/>
        <line x1="12" y1="22" x2="12" y2="12"/>
      </svg>`
    ),
    gradient: "from-violet-600 to-purple-500",
    tag: "Catalog",
  },
];

export default function DownloadsPage() {
  return (
    <div className="relative overflow-hidden bg-[#050816] min-h-screen pt-12 pb-24">
      {/* Glow spots */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-400 font-bold mb-4 uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Downloads Center
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Company Documents
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Download our official company documents. Share them with your procurement teams,
            management, or IT consultants to learn more about SkyEagle Technologies.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 gap-8">
          {downloads.map((doc) => (
            <div
              key={doc.id}
              id={doc.id}
              className="group bg-slate-950/50 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.gradient} p-0.5 flex-shrink-0`}>
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white"
                  dangerouslySetInnerHTML={{ __html: doc.icon }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {doc.tag}
                  </span>
                  <span className="text-[10px] text-slate-500">{doc.pages}</span>
                  <span className="text-[10px] text-slate-500">•</span>
                  <span className="text-[10px] text-slate-500">{doc.size}</span>
                  <span className="text-[10px] text-slate-500">•</span>
                  <span className="text-[10px] text-slate-500">Updated {doc.updated}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {doc.title}
                </h2>
                <p className="text-xs text-blue-400 font-semibold mb-3">{doc.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{doc.description}</p>
              </div>

              {/* Download Button */}
              <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
                <a
                  href={doc.file}
                  download
                  id={`download-${doc.id}`}
                  className={`bg-gradient-to-r ${doc.gradient} text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-100`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white px-6 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:border-white/20 inline-flex items-center justify-center gap-2 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Preview Online
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-white/5 bg-slate-950/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
          </svg>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">Need a Custom Brochure or Proposal?</p>
            <p className="text-xs text-slate-400">
              Contact Saarika at{" "}
              <a href="tel:+919353427314" className="text-blue-400 hover:underline">+91 93534 27314</a>
              {" "}or{" "}
              <a href="mailto:sales@skyeagletechno.com" className="text-blue-400 hover:underline">sales@skyeagletechno.com</a>
              {" "}for custom proposals, NDA documents, or technical datasheets tailored to your project.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
