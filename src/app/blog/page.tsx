import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "IT Insights, Guides & Cybersecurity Blog | SkyEagle Technologies",
  description: "Read IT consulting guides, Microsoft 365 security recommendations, ransomware defenses, and hardware reviews written by our engineers in Bengaluru.",
  keywords: ["M365 security settings", "ransomware protection Bangalore", "business laptops comparison", "data disaster recovery strategy"],
};

export default function BlogPage() {
  return <BlogClient />;
}
