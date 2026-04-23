export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Priya Sharma",
    rating: 5,
    text: "The saffron tres leches is unreal. Went back three Sundays in a row — my kids refuse cake from anywhere else now.",
    date: "3 weeks ago",
    initials: "PS",
  },
  {
    id: "r2",
    name: "Arjun Mehta",
    rating: 5,
    text: "Best croissants in Chandigarh, hands down. The lamination is perfect and they're always warm when I pick up at 8:30.",
    date: "1 month ago",
    initials: "AM",
  },
  {
    id: "r3",
    name: "Neha Kaur",
    rating: 4,
    text: "Love the fusion concept — pistachio-kulfi eclairs are genius. Only wish the cafe had more seating.",
    date: "2 weeks ago",
    initials: "NK",
  },
  {
    id: "r4",
    name: "Rohit Verma",
    rating: 5,
    text: "Ordered a custom three-tier cake for our anniversary. Ishaan delivered something better than the reference photos.",
    date: "1 month ago",
    initials: "RV",
  },
  {
    id: "r5",
    name: "Simran Bhatia",
    rating: 5,
    text: "The methi focaccia on Fridays is my weekly ritual. They remember my name now, which is a nice touch.",
    date: "3 days ago",
    initials: "SB",
  },
  {
    id: "r6",
    name: "Karan Singh",
    rating: 4,
    text: "Solid sourdough and the coffee is better than most cafes in Sector 35. Packaging is thoughtful too.",
    date: "2 months ago",
    initials: "KS",
  },
  {
    id: "r7",
    name: "Meera Joshi",
    rating: 5,
    text: "Got the corporate hamper for Diwali — 40 boxes, personalised tags on each. Every colleague sent a thank-you note.",
    date: "5 months ago",
    initials: "MJ",
  },
  {
    id: "r8",
    name: "Tanvir Ahmed",
    rating: 5,
    text: "The gulab jamun brioche on Saturdays should be illegal. I've stopped going to any other bakery in the city.",
    date: "1 week ago",
    initials: "TA",
  },
  {
    id: "r9",
    name: "Ananya Reddy",
    rating: 4,
    text: "Beautiful space, great pastries, and the team genuinely cares about quality. The kouign-amann sells out fast — go early.",
    date: "3 weeks ago",
    initials: "AR",
  },
  {
    id: "r10",
    name: "Vikram Patel",
    rating: 5,
    text: "My daughter's birthday cake was a showstopper. Tasted even better than it looked, which is saying something.",
    date: "2 weeks ago",
    initials: "VP",
  },
];

export const AGGREGATE = {
  rating: 4.8,
  count: 312,
};
