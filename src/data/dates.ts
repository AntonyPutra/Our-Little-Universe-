export interface SpecialDate {
  id: string;
  title: string;
  date: string;
  icon: string;
  isYearly: boolean;
}

export const specialDates: SpecialDate[] = [
  {
    id: "vell-vell-bday",
    title: "Vell Vell's Birthday",
    date: "2006-02-17",
    icon: "Cake",
    isYearly: true,
  },
  {
    id: "putra-bday",
    title: "Putra's Birthday",
    date: "2005-06-16",
    icon: "Gift",
    isYearly: true,
  },
  {
    id: "first-date-anniv",
    title: "First Date Anniversary",
    date: "2026-06-28",
    icon: "CalendarHeart",
    isYearly: true,
  },
  {
    id: "our-anniversary",
    title: "Our Anniversary",
    date: "2026-07-06",
    icon: "Heart",
    isYearly: true,
  }
];
