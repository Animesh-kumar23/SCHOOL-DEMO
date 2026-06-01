import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest — powers "Add to Home Screen" on Android/Chrome with the
 * school's name and icons. Served at /manifest.webmanifest; Next injects the
 * <link rel="manifest"> automatically.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14337b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-256.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
