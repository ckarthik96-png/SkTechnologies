import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "IT Services & Solutions | SkyEagle Technologies",
  description: "Explore our 15 comprehensive corporate IT services including Networking, Cybersecurity, Cloud solutions, Firewall installations, and AMC Support in Bengaluru.",
  keywords: ["IT support services", "CCTV installation Bangalore", "Firewall installation Bangalore", "AMC IT support", "Microsoft 365 setup"],
};

export default function ServicesPage() {
  return <ServicesClient />;
}
