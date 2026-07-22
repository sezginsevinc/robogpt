import type { MetadataRoute } from "next";
import { locales } from "@/content/locale";
import { programs } from "@/content/programs";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/programs", "/projects", "/manifesto", "/visit"];
  return locales.flatMap((locale) => [
    ...routes.map((route) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified: now,
      priority: route === "" ? 1 : 0.7,
    })),
    ...programs.map((program) => ({
      url: `${site.url}/${locale}/programs/${program.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ]);
}
