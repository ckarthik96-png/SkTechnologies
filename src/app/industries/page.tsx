import type { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";

export const metadata: Metadata = {
  title: "Target Industries | SkyEagle Technologies",
  description: "Customized IT systems, cybersecurity setups, POS security, campus Wi-Fi, and server provisioning designed for Corporate, Education, Healthcare, Retail, and Startup sectors in Bengaluru.",
  keywords: ["POS security Bangalore", "school campus wifi setup", "corporate IT audit", "healthcare IT compliance"],
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
