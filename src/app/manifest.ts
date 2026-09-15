import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jatin Madan — Portfolio",
    short_name: "Jatin Madan",
    description:
      "Portfolio of Jatin Madan — Engineering Manager 2 and Enterprise AI Program Architect specializing in Microsoft Entra, enterprise AI security governance, and Azure.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fbfd",
    theme_color: "#0078D4",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
