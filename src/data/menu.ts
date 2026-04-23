import type { PastryKind } from "@/types/pastry";

export type MenuCategory = "cakes" | "viennoiserie" | "cookies" | "breads" | "fusion";

export type MenuItem = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: MenuCategory;
  pastry: PastryKind;
  accent: string;
  tags?: string[];
  signature?: boolean;
};

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  cakes: "Cakes",
  viennoiserie: "Viennoiserie",
  cookies: "Cookies",
  breads: "Breads",
  fusion: "Fusion",
};

export const CATEGORY_ORDER: MenuCategory[] = [
  "cakes",
  "viennoiserie",
  "cookies",
  "breads",
  "fusion",
];

export const MENU: MenuItem[] = [
  {
    id: "kahwa-chocolate-torte",
    name: "Kahwa-Chocolate Torte",
    subtitle: "64% Madagascar, Kashmir kahwa",
    description:
      "Valrhona Caraïbe reduced slowly in hot Kashmiri kahwa, set overnight on a cocoa-nib sablé. Served with a shard of cocoa nib brittle.",
    price: 420,
    category: "cakes",
    pastry: "tart",
    accent: "#1A0F08",
    tags: ["chef's pick", "single slice", "fusion"],
    signature: true,
  },
  {
    id: "saffron-tres-leches",
    name: "Saffron Tres Leches",
    subtitle: "Kesar, cardamom, rose",
    description:
      "Cardamom sponge soaked for 12 hours in saffron-laced three milks, topped with rose-water whipped cream and dried rose petals.",
    price: 380,
    category: "cakes",
    pastry: "cupcake",
    accent: "#E8A345",
    tags: ["signature", "fusion"],
    signature: true,
  },
  {
    id: "jamun-fig-cheesecake",
    name: "Jamun-Fig Cheesecake",
    subtitle: "Baked, 72 hours rested",
    description:
      "Basque-style burnt cheesecake swirled with jamun compote and roasted Afghani fig on a salted jaggery crust.",
    price: 460,
    category: "cakes",
    pastry: "tart",
    accent: "#3b1e52",
  },
  {
    id: "cardamom-kouign-amann",
    name: "Cardamom Kouign-Amann",
    subtitle: "Laminated 32 layers",
    description:
      "Butter-saturated Breton pastry caramelised in green-cardamom sugar. Morning bake — rarely lasts past 11am.",
    price: 340,
    category: "viennoiserie",
    pastry: "croissant",
    accent: "#D69155",
    tags: ["chef's pick", "fusion"],
    signature: true,
  },
  {
    id: "masala-chai-pain-au-chocolat",
    name: "Masala Chai Pain au Chocolat",
    subtitle: "Tulsi-ginger lamination",
    description:
      "Classic pain au chocolat with masala-chai butter block and two batons of 70% single-origin chocolate from Karnataka.",
    price: 310,
    category: "viennoiserie",
    pastry: "croissant",
    accent: "#8E4A2B",
    tags: ["fusion"],
    signature: true,
  },
  {
    id: "amrood-danish",
    name: "Amrood Danish",
    subtitle: "Guava compote, lime zest",
    description:
      "Braided danish with thick guava compote, lime zest, and a crackle of pink-salt demerara. Reminds you of winter school recess.",
    price: 290,
    category: "viennoiserie",
    pastry: "croissant",
    accent: "#D65477",
  },
  {
    id: "gulab-jamun-cruffin",
    name: "Gulab Jamun Cruffin",
    subtitle: "Rose syrup core",
    description:
      "Croissant-muffin hybrid filled with warm rose-saffron syrup and khoya cream. Best eaten the minute it arrives.",
    price: 280,
    category: "viennoiserie",
    pastry: "cupcake",
    accent: "#C8553D",
    tags: ["fusion"],
    signature: true,
  },
  {
    id: "sea-salt-jaggery-cookie",
    name: "Sea Salt Jaggery Cookie",
    subtitle: "2-pack, chewy centre",
    description:
      "Organic jaggery replaces half the sugar in our brown-butter cookie. Maldon flake across the top. Comes as a pair.",
    price: 180,
    category: "cookies",
    pastry: "donut",
    accent: "#A0653B",
  },
  {
    id: "ghee-kesar-shortbread",
    name: "Ghee Kesar Shortbread",
    subtitle: "Milk solids, pistachio dust",
    description:
      "Shortbread baked with slow-cooked ghee and bloomed saffron, dusted with Iranian pistachio. Keeps for a week; disappears in two days.",
    price: 220,
    category: "cookies",
    pastry: "donut",
    accent: "#E8A345",
  },
  {
    id: "old-monk-rum-ball",
    name: "Old Monk Rum Ball",
    subtitle: "Dark chocolate, cocoa roll",
    description:
      "Chocolate cake crumb blended with Old Monk ganache, hand-rolled in Dutch cocoa. A soft grown-up snack.",
    price: 160,
    category: "cookies",
    pastry: "donut",
    accent: "#2F1F14",
  },
  {
    id: "paneer-pav",
    name: "Paneer Pepper Pav",
    subtitle: "Braided milk bread",
    description:
      "Tangzhong milk bread twisted with smoked paneer, cracked peppercorn, and curry-leaf butter. Savoury morning staple.",
    price: 240,
    category: "breads",
    pastry: "bread",
    accent: "#7A8471",
    tags: ["savoury"],
  },
  {
    id: "sourdough-boule",
    name: "Country Sourdough Boule",
    subtitle: "72 hr cold ferment",
    description:
      "Punjabi wheat + 20% rye, naturally leavened over three days. Served whole; ask for the half-loaf on weekdays.",
    price: 340,
    category: "breads",
    pastry: "bread",
    accent: "#C27B52",
  },
  {
    id: "methi-focaccia",
    name: "Methi-Garlic Focaccia",
    subtitle: "Pressed fenugreek, olive oil",
    description:
      "Airy focaccia pressed with fresh methi, roasted garlic, and a finishing oil of green chilli + lime. Punjabi comfort in Italian bones.",
    price: 280,
    category: "breads",
    pastry: "bread",
    accent: "#7A8471",
    tags: ["savoury", "fusion"],
  },
  {
    id: "kulcha-sourdough",
    name: "Kulcha Sourdough",
    subtitle: "Amritsari inspired",
    description:
      "Sourdough starter meets Amritsari kulcha — charred onion crown, cold-fermented three days, served with nigella butter.",
    price: 320,
    category: "breads",
    pastry: "bread",
    accent: "#D69155",
    tags: ["fusion"],
  },
  {
    id: "kulfi-eclair",
    name: "Pistachio-Kulfi Eclair",
    subtitle: "Frozen centre, choux shell",
    description:
      "Choux filled with pistachio kulfi cream, finished with cardamom glaze and silver varak. Eaten fast, eaten cold.",
    price: 330,
    category: "fusion",
    pastry: "eclair",
    accent: "#7A8471",
    tags: ["fusion"],
  },
  {
    id: "thandai-macaron",
    name: "Thandai Macaron",
    subtitle: "Box of six",
    description:
      "Six macaron shells filled with cold-brewed thandai ganache: almond, fennel, rose, black pepper. Light, floral, long finish.",
    price: 520,
    category: "fusion",
    pastry: "donut",
    accent: "#B67DA0",
    tags: ["fusion", "gift"],
  },
  {
    id: "mysore-pak-brownie",
    name: "Mysore-Pak Brownie",
    subtitle: "Ghee-forward fudge",
    description:
      "Dense brownie made on clarified butter and jaggery, laced with crumbled Mysore pak. Eat with chai.",
    price: 260,
    category: "fusion",
    pastry: "tart",
    accent: "#E8A345",
    tags: ["fusion"],
  },
  {
    id: "naankhatai-tart",
    name: "Naankhatai Tart",
    subtitle: "Cardamom short crust",
    description:
      "Naankhatai base filled with white-chocolate cardamom ganache and a roasted almond crown. A Lucknow heirloom, retold.",
    price: 360,
    category: "fusion",
    pastry: "tart",
    accent: "#F9E3B3",
    tags: ["fusion"],
  },
];

export const SIGNATURE_IDS: readonly string[] = [
  "kahwa-chocolate-torte",
  "cardamom-kouign-amann",
  "saffron-tres-leches",
  "masala-chai-pain-au-chocolat",
  "gulab-jamun-cruffin",
  "kulfi-eclair",
];

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}

export function getSignatureBakes(): MenuItem[] {
  return SIGNATURE_IDS.map((id) => getMenuItem(id)).filter(Boolean) as MenuItem[];
}
