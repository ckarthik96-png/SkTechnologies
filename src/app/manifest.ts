import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SkyEagle Technologies",
    short_name: "SkyEagle",
    description: "SkyEagle Technologies provides IT Infrastructure, Networking, Cyber Security, Cloud Solutions, Microsoft 365, CCTV, and Enterprise Technology Services in Bengaluru.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
