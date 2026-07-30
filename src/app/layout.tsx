import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import FloatingContacts from "@/components/FloatingContacts";
import Preloader from "@/components/Preloader";

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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SkyEagle Technologies",
  "image": "https://skyeagletechno.com/logo.png",
  "@id": "https://skyeagletechno.com/#localbusiness",
  "url": "https://skyeagletechno.com",
  "telephone": "+919353427314",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Srinidhi Layout, Konanakunte",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560062",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.8837,
    "longitude": 77.5685
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://github.com/ckarthik96-png/SkTechnologies"
  ]
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
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-[#050816] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Preloader />
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
