export type StoryChapter = {
  id: string;
  year: string;
  chapter: string;
  title: string;
  lede: string;
  body: string;
  dough: string;
  accent: string;
};

/**
 * Six chapters of the SweetEscape origin story.
 * Each `dough` is a 200x200 SVG path; `DoughMorph` interpolates between them.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "2019",
    year: "2019",
    chapter: "Chapter one",
    title: "A Paris stage that wasn&apos;t supposed to matter.",
    lede: "Ishaan was 26 and bored of financial modelling.",
    body:
      "A friend who ran a cafe in Panchkula dared him to apply for a stage at Du Pain et des Idées. He flew to Paris in a February coat that did nothing. For three months he folded butter blocks at 4am and learned that good dough is allergic to hurry.",
    dough: "M70,60 C100,40 150,60 160,100 C170,140 140,170 100,160 C60,150 40,110 70,60 Z",
    accent: "#F9E3B3",
  },
  {
    id: "2020",
    year: "2020",
    chapter: "Chapter two",
    title: "A lockdown spreadsheet, a rented convection.",
    lede: "Niharika was running a hospitality agency that had just gone quiet.",
    body:
      "She borrowed a rented convection oven and started shipping viennoiserie out of her flat in Sector 8 — 40 croissants a day, sold via an Instagram link-in-bio that Ishaan had grudgingly helped her set up from Paris.",
    dough: "M40,80 C80,50 130,40 170,70 C200,100 180,150 140,170 C100,190 60,180 40,150 C20,120 20,100 40,80 Z",
    accent: "#E8A345",
  },
  {
    id: "2021",
    year: "2021",
    chapter: "Chapter three",
    title: "The conversation that started SweetEscape.",
    lede: "One Sunday afternoon in October. A half-eaten tarte tatin. Two phones out.",
    body:
      "Ishaan had come home for three weeks. Niharika had sold 11,000 croissants that year. They spent a full afternoon arguing whether SweetEscape should be a brand or a storefront. By the time the tart was gone, they had a lease offer for SCO 114.",
    dough: "M60,50 C110,30 170,50 180,100 C190,150 150,180 100,180 C50,180 30,140 30,100 C30,60 30,40 60,50 Z",
    accent: "#C8553D",
  },
  {
    id: "2022",
    year: "2022",
    chapter: "Chapter four",
    title: "First croissant out of a 1m deck oven.",
    lede: "March 14, 2022. Six hours of sleep. One deck oven. A queue around the corner by 8am.",
    body:
      "Niharika opened the door; Ishaan ran the proof. They sold out the first batch in 47 minutes. The second batch in 52. The last guest of the day got a free coffee because Ishaan had no energy to ring it up. The next morning they did it again.",
    dough: "M50,70 C90,30 170,40 180,90 C200,140 170,180 120,180 C70,180 30,160 30,120 C30,80 20,100 50,70 Z",
    accent: "#B64722",
  },
  {
    id: "2024",
    year: "2024",
    chapter: "Chapter five",
    title: "Cardamom in kouign-amann. Saffron in tres leches.",
    lede: "The fusion line started with a plate of home-made thandai at Holi 2024.",
    body:
      "Niharika's mother made thandai; Ishaan sat with it for a long time. The next week the menu grew by six items. Saffron tres leches won a mention in Mint Lounge that September. People started flying in from Delhi on the weekend.",
    dough: "M60,60 C110,40 170,70 170,110 C170,150 130,180 90,170 C50,160 20,130 30,90 C40,50 40,70 60,60 Z",
    accent: "#7A8471",
  },
  {
    id: "2026",
    year: "2026",
    chapter: "Chapter six",
    title: "Where we are now: a lamination room with a window.",
    lede: "In 2026 we renovated the bakery so guests can see the lamination table from the counter.",
    body:
      "It was Niharika's idea. Some guests watch for thirty seconds, some stay for twenty minutes. On Tuesdays after 7pm, Ishaan teaches a two-person lamination workshop. We still run out of kouign-amann by noon.",
    dough: "M70,50 C120,40 170,80 160,130 C150,180 100,190 70,170 C40,150 30,110 40,80 C50,50 60,55 70,50 Z",
    accent: "#E8A345",
  },
];

export const TIMELINE_EVENTS = STORY_CHAPTERS.map((c) => ({
  year: c.year,
  label: c.title.replace(/&apos;/g, "'").split(".")[0] + ".",
  accent: c.accent,
}));
