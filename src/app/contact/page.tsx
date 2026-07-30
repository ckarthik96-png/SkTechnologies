import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | SkyEagle Technologies",
  description: "Get in touch with SkyEagle Technologies in Bengaluru. Call Saarika at +91 9353427314, email sales@skyeagletechno.com, or submit a request directly via WhatsApp.",
  keywords: ["SkyEagle contact number", "IT services Bangalore phone", "Saarika phone number Bangalore"],
};

export default function ContactPage() {
  return <ContactClient />;
}
