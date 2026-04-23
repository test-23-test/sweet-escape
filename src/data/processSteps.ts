export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  time: string;
  description: string;
  pathD: string;
  accent: string;
};

/**
 * Each pathD is drawn on a 200x200 viewBox.
 * The DoughMorph component interpolates between consecutive paths.
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "mise",
    number: "01",
    title: "Mise en place",
    time: "04:15",
    description:
      "Flour, butter, eggs, jaggery — each weighed to the gram before sunrise. No shortcuts, no eyeballing. A quiet room, mostly.",
    pathD: "M80,60 C110,40 160,50 170,100 C180,150 140,170 100,160 C60,150 50,120 60,100 C70,80 50,80 80,60 Z",
    accent: "#F9E3B3",
  },
  {
    id: "mix",
    number: "02",
    title: "Mix",
    time: "04:45",
    description:
      "Tangzhong scalded, poolish rested from last night, butter folded at 18°C. Every dough knows what time it is.",
    pathD: "M60,70 C80,40 140,30 170,60 C200,90 180,140 150,170 C120,200 70,180 50,150 C30,120 40,90 60,70 Z",
    accent: "#E8A345",
  },
  {
    id: "proof",
    number: "03",
    title: "Proof",
    time: "05:30",
    description:
      "Bulk on the counter, cold retard at 3°C, bench rest under linen. We argue about the proof window the way sommeliers argue about decanting.",
    pathD: "M40,90 C60,40 130,50 160,70 C190,90 200,140 170,170 C140,200 80,190 50,170 C20,150 20,130 40,90 Z",
    accent: "#C8553D",
  },
  {
    id: "bake",
    number: "04",
    title: "Bake",
    time: "06:30",
    description:
      "Deck oven at 240°C. Steam for crust. A timer we don't need anymore. The ovens pop when the crumb is right.",
    pathD: "M70,40 C110,20 160,50 180,90 C200,130 170,180 130,190 C90,200 40,180 30,140 C20,100 30,60 70,40 Z",
    accent: "#B64722",
  },
  {
    id: "finish",
    number: "05",
    title: "Finish",
    time: "07:30",
    description:
      "Glaze, dust, ribbon, wrap. The cake goes on the shelf. Arjun walks in for the first espresso. Another day, a little better than yesterday.",
    pathD: "M90,50 C140,40 180,80 170,130 C160,180 110,190 70,170 C30,150 20,110 40,80 C60,50 70,55 90,50 Z",
    accent: "#E8A345",
  },
];
