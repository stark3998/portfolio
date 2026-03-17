import { MetadataRoute } from "next";
import { hasCosmosConfig } from "@/lib/cosmos";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jatinmadan.com";
  const disallow = ["/admin", "/api/private"];

  if (!hasCosmosConfig()) {
    disallow.push("/blog/__build-fallback__");
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
