import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "IT Project Case Studies & Deployments | SkyEagle Technologies",
  description: "Explore our portfolio of commercial IT setups, cloud migrations, CCTV installations, network structuring, and security firewall integrations in Bengaluru.",
  keywords: ["IT projects Bangalore", "network setup case studies", "M365 cloud migration cases", "Surveillance setup Peenya"],
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
