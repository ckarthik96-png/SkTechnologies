import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import FloatingContacts from "@/components/FloatingContacts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyEagle Technologies | IT Infrastructure, Networking & Cyber Security Solutions",
  description: "SkyEagle Technologies provides IT Infrastructure, Networking, Cyber Security, Cloud Solutions, Microsoft 365, CCTV, Firewall Installation, AMC Support, and Enterprise Technology Services in Bengaluru.",
  keywords: [
    "SkyEagle Technologies",
    "IT Services Bangalore",
    "Cyber Security",
    "Networking",
    "Cloud Solutions",
    "Firewall",
    "Microsoft 365",
    "Server Management",
    "IT Support",
    "AMC Services"
  ],
  authors: [{ name: "SkyEagle Technologies" }],
  openGraph: {
    type: "website",
    url: "https://skyeagletechno.com",
    title: "SkyEagle Technologies | IT Infrastructure, Networking & Cyber Security Solutions",
    description: "SkyEagle Technologies provides IT Infrastructure, Networking, Cyber Security, Cloud Solutions, Microsoft 365, CCTV, Firewall Installation, AMC Support, and Enterprise Technology Services in Bengaluru.",
    siteName: "SkyEagle Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyEagle Technologies | IT Infrastructure & Cybersecurity",
    description: "Managed IT services, security audits, and firewall deployments in Bengaluru.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050816] text-white">
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
        <CookieConsent />
        <FloatingContacts />
      </body>
    </html>
  );
}
