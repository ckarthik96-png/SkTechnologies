import type { Metadata } from "next";
import { Suspense } from "react";
import RefurbishedProductsClient from "./RefurbishedProductsClient";

export const metadata: Metadata = {
  title: "Refurbished IT Hardware & Spare Parts | SkyEagle Technologies",
  description: "Browse our inventory of business-grade refurbished laptops (ThinkPad, Latitude, EliteBook), enterprise desktops, workstations, monitors, and genuine components in Bengaluru.",
  keywords: ["refurbished laptops Bangalore", "used computers Bangalore", "ThinkPad refurbished", "Latitude Dell used", "office hardware procurement"],
};

export default function RefurbishedProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-slate-400">
        Loading Catalog...
      </div>
    }>
      <RefurbishedProductsClient />
    </Suspense>
  );
}
