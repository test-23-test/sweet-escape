import type { MetadataRoute } from "next";

const BASE = "https://sweetescape.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/menu", "/story", "/order", "/gallery", "/visit"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/menu" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
