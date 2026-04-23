import type { PastryKind } from "@/types/pastry";

export type DailySpecial = {
  day: number; // 0 = Sunday, 6 = Saturday
  dayLabel: string;
  name: string;
  description: string;
  price: number;
  pastry: PastryKind;
  accent: string;
};

export const DAILY_SPECIALS: DailySpecial[] = [
  {
    day: 0,
    dayLabel: "Sunday",
    name: "Saffron Tres Leches",
    description: "Three milks soaked through Kashmir saffron sponge, cardamom whip.",
    price: 420,
    pastry: "cake",
    accent: "#E8A345",
  },
  {
    day: 1,
    dayLabel: "Monday",
    name: "Kahwa-Chocolate Torte",
    description: "72% dark chocolate ganache layered with almond kahwa cream.",
    price: 380,
    pastry: "tart",
    accent: "#2F1F14",
  },
  {
    day: 2,
    dayLabel: "Tuesday",
    name: "Pistachio-Kulfi Eclair",
    description: "Choux pastry filled with kulfi-spiced pistachio cream, mirror glaze.",
    price: 220,
    pastry: "eclair",
    accent: "#7A8471",
  },
  {
    day: 3,
    dayLabel: "Wednesday",
    name: "Masala Chai Croissant",
    description: "32-layer lamination infused with ginger-cardamom chai sugar.",
    price: 180,
    pastry: "croissant",
    accent: "#C8553D",
  },
  {
    day: 4,
    dayLabel: "Thursday",
    name: "Rose-Pistachio Kouign-Amann",
    description: "Breton butter cake with Kannauj rose water and crushed pista.",
    price: 260,
    pastry: "cupcake",
    accent: "#B64722",
  },
  {
    day: 5,
    dayLabel: "Friday",
    name: "Methi Focaccia Loaf",
    description: "Stone-baked focaccia with fresh fenugreek, nigella seeds, ghee glaze.",
    price: 160,
    pastry: "bread",
    accent: "#7A8471",
  },
  {
    day: 6,
    dayLabel: "Saturday",
    name: "Gulab Jamun Brioche",
    description: "Brioche dough soaked in light rose syrup with mawa filling.",
    price: 200,
    pastry: "donut",
    accent: "#E8A345",
  },
];
