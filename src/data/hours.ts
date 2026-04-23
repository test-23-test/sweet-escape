export type HoursEntry = {
  day: string;
  open: string;
  close: string;
  note?: string;
};

export const HOURS: HoursEntry[] = [
  { day: "Monday", open: "", close: "", note: "Closed — we rest, we re-stock." },
  { day: "Tuesday", open: "08:00", close: "22:00" },
  { day: "Wednesday", open: "08:00", close: "22:00" },
  { day: "Thursday", open: "08:00", close: "22:00" },
  { day: "Friday", open: "08:00", close: "23:00", note: "Late bake till 11pm" },
  { day: "Saturday", open: "08:00", close: "23:00", note: "Late bake till 11pm" },
  { day: "Sunday", open: "09:00", close: "21:00" },
];

export const ADDRESS = {
  line1: "SCO 114, Sector 35-B",
  line2: "Chandigarh 160022",
  country: "India",
  phone: "+91 172 419 7326",
  email: "hello@sweetescape.in",
  maps: "https://www.google.com/maps?q=SCO+114+Sector+35-B+Chandigarh",
  coords: { lat: 30.7291, lng: 76.7586 },
};
