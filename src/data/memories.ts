export interface Memory {
  id: string;
  category: "Us" | "Dates" | "Random" | "Trips" | "Favorite" | "Funny" | "Vell Vell" | "Putra";
  caption: string;
  date: string | null;
  location?: string;
  story?: string;
  isFavorite: boolean;
  // Use arrays of strings to support multiple photos per memory if needed.
  // First photo is the cover/preview.
  photos: string[];
  layoutHint?: "tall" | "wide" | "square";
}

export const memories: Memory[] = [
  {
    id: "mem-1",
    category: "Vell Vell",
    caption: "Just a placeholder for now 💜",
    date: null,
    isFavorite: true,
    photos: [], // Add your image path here like "/images/gallery/photo1.jpg"
    layoutHint: "tall",
  },
  {
    id: "mem-2",
    category: "Dates",
    caption: "Another cute memory",
    date: "2026-06-28",
    isFavorite: false,
    photos: [],
    layoutHint: "wide",
  },
  {
    id: "mem-3",
    category: "Us",
    caption: "Being silly together",
    date: "2026-07-06",
    isFavorite: true,
    photos: [],
    layoutHint: "square",
  },
];
