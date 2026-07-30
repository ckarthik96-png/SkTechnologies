"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm({ defaultService }: { defaultService?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: defaultService || "IT Infrastructure",
    message: "",
  });


  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const requirementsList = [
    "IT Infrastructure",
    "Networking Solutions",
    "Cloud Solutions",
    "Cyber Security",
    "CCTV Solutions",
    "Firewall Installation",
    "Server Management",
    "Annual Maintenance Contract (AMC)",
    "Laptop/Desktop Support",
    "Printer Support",
    "Email Solutions (M365/Google Workspace)",
    "Backup Solutions",
    "Wi-Fi Deployment",
    "IT Consulting",
    "Other Services",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Format WhatsApp message
    const formattedMessage = `*New SkyEagle Inquiry*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `🏢 *Company:* ${formData.company || "Not specified"}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🛠️ *Service:* ${formData.requirement}\n\n` +
      `📝 *Message:*\n${formData.message}`;

    // WhatsApp url with Saarika's phone number
    const whatsappUrl = `https://wa.me/919353427314?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setStatus("success");
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, "_blank");

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        requirement: "IT Infrastructure",
        message: "",
      });

      // Clear success notification after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1200);
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-white/10">
      {/* Background radial glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full filter blur-3xl pointer-events-none" />

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Inquiry Form Prepared</h3>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            Thank you! Your enquiry has been prepared. Continue in WhatsApp to send it.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs text-primary hover:text-white transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Saarika"
                className="w-full bg-slate-950/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="sales@skyeagletechno.com"
                className="w-full bg-slate-950/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="9353427314"
                className="w-full bg-slate-950/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="SkyEagle Technologies"
                className="w-full bg-slate-950/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Requirement */}
          <div>
            <label htmlFor="requirement" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Service Requirement *
            </label>
            <select
              id="requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
            >
              {requirementsList.map((req) => (
                <option key={req} value={req} className="bg-slate-950 text-white">
                  {req}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Tell us about your project or support details *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide a description of your IT constraints or server specs..."
              className="w-full bg-slate-950/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full btn-gradient py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting to representative...
              </>
            ) : (
              <>
                Submit Inquiry
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
