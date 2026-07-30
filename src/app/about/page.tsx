import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | SkyEagle Technologies",
  description: "Learn about SkyEagle Technologies' mission, vision, and core corporate values as a premier IT infrastructure and managed services partner in Bengaluru.",
  keywords: ["About SkyEagle Technologies", "Saarika", "IT company Bangalore", "Managed IT Services Bangalore"],
};

export default function AboutPage() {
  return <AboutClient />;
}
