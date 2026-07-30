import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers & Internships | SkyEagle Technologies",
  description: "Join SkyEagle Technologies. Explore IT engineer, systems administrator, and cloud coordinator job openings and internship opportunities in Bengaluru.",
  keywords: ["IT jobs Bangalore", "systems admin vacancies", "computer technician jobs HSR", "IT internships Bangalore"],
};

export default function CareersPage() {
  return <CareersClient />;
}
