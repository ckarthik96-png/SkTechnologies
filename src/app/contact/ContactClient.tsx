"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, MessageSquare, Clock, User } from "lucide-react";
import ContactForm from "@/components/ContactForm";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || searchParams.get("industry") || undefined;
  const defaultProduct = searchParams.get("product") || undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Contact Details & Actions */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Get In Touch</h2>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Connect With Our Representatives
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Have questions about Annual Maintenance Contracts, networking setups, or hardware deployments? Saarika and our specialists are ready to coordinate.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <User className="w-5 h-5 text-primary mb-3" />
              <h4 className="text-xs text-slate-500 uppercase tracking-widest mb-1">Contact Person</h4>
              <p className="text-sm font-semibold text-white">Saarika</p>
              <p className="text-xs text-slate-400 mt-1">Lead Client Coordinator</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <Clock className="w-5 h-5 text-primary mb-3" />
              <h4 className="text-xs text-slate-500 uppercase tracking-widest mb-1">Business Hours</h4>
              <p className="text-sm font-semibold text-white">24x7 Help Desk</p>
              <p className="text-xs text-slate-400 mt-1">Remote & Onsite Support</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+919353427314"
            className="flex-1 btn-gradient py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            Call +91 93534 27314
          </a>
          <a
            href="https://wa.me/919353427314"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Saarika
          </a>
        </div>

        {/* Location & Details List */}
        <div className="space-y-4 bg-slate-950/20 p-6 rounded-2xl border border-white/5">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Corporate Address</h5>
              <p className="text-sm text-slate-300 leading-relaxed">
                SkyEagle Technologies<br />
                Srinidhi Layout, Konanakunte,<br />
                Bengaluru, Karnataka - 560062, India
              </p>
            </div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Email Communications</h5>
              <a href="mailto:sales@skyeagletechno.com" className="text-sm text-slate-300 font-semibold hover:text-primary transition-colors break-all">
                sales@skyeagletechno.com
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-[280px] rounded-2xl overflow-hidden border border-white/10 relative">
          <iframe
            title="SkyEagle Map"
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
      <div>
        <ContactForm key={`${defaultService}-${defaultProduct}`} defaultService={defaultService} defaultProduct={defaultProduct} />
      </div>
    </div>
  );
}

export default function ContactClient() {
  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Glow Spots */}
      <div className="glow-spot top-1/3 right-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/3 left-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ContactPageContent />
        </Suspense>
      </div>
    </div>
  );
}
