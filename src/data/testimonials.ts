export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rhea",
    name: "Rhea Walia",
    role: "Architect · Sector 8",
    quote:
      "The cardamom kouign-amann is the best thing I've eaten in Chandigarh since I moved back. I've stopped testing other bakeries.",
    avatar: "/avatars/rhea.svg",
    accent: "#C8553D",
  },
  {
    id: "arjun",
    name: "Arjun Khanna",
    role: "Music producer",
    quote:
      "Niharika greets you like you own the place. The kahwa torte tastes exactly like my mother's Darjeeling trip from 2009.",
    avatar: "/avatars/arjun.svg",
    accent: "#E8A345",
  },
  {
    id: "mehek",
    name: "Mehek Kaur Sethi",
    role: "Wedding planner",
    quote:
      "Ordered 120 pistachio-kulfi eclairs for a sangeet. They arrived looking like jewellery. Every guest noticed.",
    avatar: "/avatars/mehek.svg",
    accent: "#7A8471",
  },
  {
    id: "vikram",
    name: "Dr. Vikram Bedi",
    role: "Cardiologist · PGI",
    quote:
      "I tell my patients to live a little. Then I come here on Sundays. The ghee kesar shortbread is my exception.",
    avatar: "/avatars/vikram.svg",
    accent: "#2F1F14",
  },
  {
    id: "ananya",
    name: "Ananya Puri",
    role: "Sommelier · Taj Chandigarh",
    quote:
      "Pairing their methi focaccia with an off-dry Riesling genuinely changed my service. That bread belongs on a tasting menu.",
    avatar: "/avatars/ananya.svg",
    accent: "#B67DA0",
  },
  {
    id: "tanvir",
    name: "Tanvir Singh Virk",
    role: "Cycle-stop regular",
    quote:
      "6:30am. Post-ride. Saffron tres leches and an Americano. Ishaan doesn't even ask anymore — it's just there on the counter.",
    avatar: "/avatars/tanvir.svg",
    accent: "#D69155",
  },
];
