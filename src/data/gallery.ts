export type GalleryCategory = "All" | "Cakes" | "Pastries" | "Breads" | "Cafe";

export type GalleryTile = (
  | {
      kind: "photo";
      id: string;
      seed: string;
      caption: string;
      aspect: "square" | "portrait" | "landscape" | "tall";
    }
  | {
      kind: "svg";
      id: string;
      caption: string;
      accent: string;
      pattern: "loaf" | "croissant" | "cake" | "tart" | "coffee" | "candle";
      aspect: "square" | "portrait" | "landscape" | "tall";
    }
) & { category: GalleryCategory };

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Cakes",
  "Pastries",
  "Breads",
  "Cafe",
];

export const GALLERY: GalleryTile[] = [
  { kind: "photo", id: "g1", seed: "sweetescape-viennoiserie-1", caption: "06:12 · first proof of the day", aspect: "square", category: "Pastries" },
  { kind: "svg", id: "g2", pattern: "loaf", accent: "#C8553D", caption: "Sourdough boule · 72 hr", aspect: "portrait", category: "Breads" },
  { kind: "photo", id: "g3", seed: "sweetescape-chocolate-torte", caption: "Kahwa-chocolate, set overnight", aspect: "landscape", category: "Cakes" },
  { kind: "photo", id: "g4", seed: "sweetescape-counter-1", caption: "The counter at 08:00 sharp", aspect: "tall", category: "Cafe" },
  { kind: "svg", id: "g5", pattern: "croissant", accent: "#E8A345", caption: "32 layers of butter", aspect: "square", category: "Pastries" },
  { kind: "photo", id: "g6", seed: "sweetescape-chandigarh-street", caption: "Sector 35-B, Monday off", aspect: "landscape", category: "Cafe" },
  { kind: "photo", id: "g7", seed: "sweetescape-flour-dust-1", caption: "Flour on the marble", aspect: "square", category: "Breads" },
  { kind: "svg", id: "g8", pattern: "cake", accent: "#B64722", caption: "Three tiers, one candle", aspect: "portrait", category: "Cakes" },
  { kind: "photo", id: "g9", seed: "sweetescape-coffee-pour", caption: "Americano, slow", aspect: "square", category: "Cafe" },
  { kind: "svg", id: "g10", pattern: "tart", accent: "#F9E3B3", caption: "Fig tart · Oct batch", aspect: "square", category: "Pastries" },
  { kind: "photo", id: "g11", seed: "sweetescape-signage", caption: "The SweetEscape sign, 2022", aspect: "tall", category: "Cafe" },
  { kind: "photo", id: "g12", seed: "sweetescape-kouign-amann-stack", caption: "Kouign-amann on parchment", aspect: "landscape", category: "Pastries" },
  { kind: "svg", id: "g13", pattern: "candle", accent: "#E8A345", caption: "Birthday order · Mehek & Ravi", aspect: "square", category: "Cakes" },
  { kind: "photo", id: "g14", seed: "sweetescape-window-light", caption: "Window light at 16:00", aspect: "portrait", category: "Cafe" },
  { kind: "photo", id: "g15", seed: "sweetescape-lamination", caption: "Lamination class · Tue 19:00", aspect: "landscape", category: "Pastries" },
  { kind: "svg", id: "g16", pattern: "coffee", accent: "#2F1F14", caption: "Espresso shot, 28g", aspect: "square", category: "Cafe" },
  { kind: "photo", id: "g17", seed: "sweetescape-cake-slice", caption: "Saffron tres leches, slice 12", aspect: "tall", category: "Cakes" },
  { kind: "photo", id: "g18", seed: "sweetescape-eclair-tray", caption: "Pistachio-kulfi eclairs", aspect: "landscape", category: "Pastries" },
  { kind: "svg", id: "g19", pattern: "loaf", accent: "#7A8471", caption: "Methi focaccia · 04:45", aspect: "square", category: "Breads" },
  { kind: "photo", id: "g20", seed: "sweetescape-thank-you-note", caption: "A Sunday regular, handwritten", aspect: "portrait", category: "Cafe" },
];
