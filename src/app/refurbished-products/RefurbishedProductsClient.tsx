"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Check, ShoppingCart, Info } from "lucide-react";

// Catalog items
const products = [
  {
    id: 1,
    name: "Dell Latitude 7490",
    category: "laptops",
    brand: "Dell",
    specs: "Intel Core i5 (8th Gen) | 16GB RAM | 256GB SSD | 14\" FHD",
    condition: "Grade A++ (Excellent)",
    warranty: "6 Months Support",
    price: "INR 18,500 approx.",
  },
  {
    id: 2,
    name: "Lenovo ThinkPad T480s",
    category: "laptops",
    brand: "Lenovo",
    specs: "Intel Core i7 (8th Gen) | 16GB RAM | 512GB SSD | 14\" FHD",
    condition: "Grade A+ (Premium)",
    warranty: "6 Months Support",
    price: "INR 22,000 approx.",
  },
  {
    id: 3,
    name: "HP EliteBook 840 G5",
    category: "laptops",
    brand: "HP",
    specs: "Intel Core i5 (8th Gen) | 16GB RAM | 512GB SSD | 14\" FHD Touch",
    condition: "Grade A (Good)",
    warranty: "6 Months Support",
    price: "INR 19,800 approx.",
  },
  {
    id: 4,
    name: "Apple MacBook Pro 2019",
    category: "laptops",
    brand: "Apple",
    specs: "Intel Core i7 | 16GB RAM | 512GB SSD | 15.4\" Retina | Touchbar",
    condition: "Grade A++ (Like New)",
    warranty: "6 Months Support",
    price: "INR 38,000 approx.",
  },
  {
    id: 5,
    name: "Dell OptiPlex 7050 SFF",
    category: "desktops",
    brand: "Dell",
    specs: "Intel Core i7 (7th Gen) | 16GB RAM | 512GB SSD | Win 10 Pro",
    condition: "Grade A+ (Business)",
    warranty: "6 Months Support",
    price: "INR 14,500 approx.",
  },
  {
    id: 6,
    name: "Lenovo ThinkCentre M710q Tiny",
    category: "desktops",
    brand: "Lenovo",
    specs: "Intel Core i5 (7th Gen) | 8GB RAM | 256GB SSD | Micro Form Factor",
    condition: "Grade A (Clean)",
    warranty: "6 Months Support",
    price: "INR 11,000 approx.",
  },
  {
    id: 7,
    name: "HP Z240 Workstation",
    category: "workstations",
    brand: "HP",
    specs: "Intel Xeon E3-1225 v5 | 32GB RAM | 512GB SSD + 1TB HDD | NVIDIA Quadro",
    condition: "Grade A+ (Enterprise)",
    warranty: "6 Months Support",
    price: "INR 26,000 approx.",
  },
  {
    id: 8,
    name: "Dell 24\" Professional Monitor P2419H",
    category: "monitors",
    brand: "Dell",
    specs: "24-Inch IPS Panel | Full HD (1080p) | HDMI, DisplayPort, VGA",
    condition: "Grade A++ (Scratchless)",
    warranty: "3 Months Support",
    price: "INR 6,500 approx.",
  },
  {
    id: 9,
    name: "Samsung 870 EVO 500GB SSD",
    category: "spares",
    brand: "Samsung",
    specs: "2.5\" SATA III Internal SSD | Read speed up to 560MB/s",
    condition: "Brand New Box Pack",
    warranty: "Manufacturer Warranty",
    price: "Inquire Price",
  },
  {
    id: 10,
    name: "Kingston 8GB DDR4 Laptop RAM",
    category: "spares",
    brand: "Kingston",
    specs: "2666MHz DDR4 Non-ECC SODIMM Laptop Memory Module",
    condition: "Brand New Box Pack",
    warranty: "Manufacturer Warranty",
    price: "Inquire Price",
  },
  {
    id: 11,
    name: "Cisco Catalyst 2960X Switch",
    category: "networking",
    brand: "Cisco",
    specs: "24 Port Gigabit Ethernet Switch | 4 x 1G SFP | Managed",
    condition: "Grade A (Refurbished)",
    warranty: "6 Months Support",
    price: "Inquire Price",
  },
];

const categories = [
  { value: "all", label: "All Items" },
  { value: "laptops", label: "Business Laptops" },
  { value: "desktops", label: "Desktops & AIO" },
  { value: "workstations", label: "Workstations" },
  { value: "monitors", label: "Monitors" },
  { value: "networking", label: "Networking Gear" },
  { value: "spares", label: "Genuine Spares" },
];

export default function RefurbishedProductsClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-screen pt-12 pb-24">
      {/* Background glow spots */}
      <div className="glow-spot top-1/4 right-1/4 bg-primary/10" />
      <div className="glow-spot bottom-1/4 left-1/4 bg-accent/10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-primary font-bold mb-4 uppercase tracking-widest"
          >
            Certified Hardware
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Refurbished IT Hardware
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Sourced from top enterprise fleets. Every device undergoes a strict 25-point hardware diagnostic test and comes backed by SkyEagle warranty support.
          </motion.p>
        </div>

        {/* Assurances Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            { title: "25-Point Diagnostics", desc: "Tested thoroughly" },
            { title: "Warranty Included", desc: "Up to 6 months support" },
            { title: "Genuine Components", desc: "Crucial/Samsung units" },
            { title: "Sourced Safely", desc: "Legally compliant fleets" },
          ].map((as, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-white/5 text-center">
              <Check className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-white text-xs tracking-wide uppercase mb-0.5">{as.title}</h4>
              <p className="text-[10px] text-slate-500">{as.desc}</p>
            </div>
          ))}
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto bg-slate-950/40 p-2 rounded-2xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={p.id}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-white/5 px-2.5 py-1 rounded">
                      {p.brand}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {p.condition}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[40px]">
                    {p.specs}
                  </p>
                  
                  <div className="h-px bg-white/5 my-3" />
                  <div className="flex items-center justify-between text-xs mb-6">
                    <span className="text-slate-500 font-medium">Warranty:</span>
                    <span className="text-slate-300 font-semibold">{p.warranty}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-auto">
                  <div className="text-xs">
                    <span className="text-slate-500 block">Est. Cost:</span>
                    <span className="font-semibold text-white text-xs">{p.price}</span>
                  </div>
                  <Link
                    href={`/contact?service=Hardware%20Purchase&product=${encodeURIComponent(p.name)}`}
                    className="btn-gradient px-4 py-2.5 rounded-lg text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5"
                  >
                    Request Quote
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quote Disclaimer */}
        <div className="mt-16 p-6 rounded-xl border border-white/5 bg-slate-950/20 max-w-2xl mx-auto flex gap-3.5 items-start">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Note on Pricing & Stock</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Stock levels change daily based on corporate upgrades. Rates are indicative based on order quantities. We offer custom bulk pricing for commercial clients looking to equip entire offices.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
