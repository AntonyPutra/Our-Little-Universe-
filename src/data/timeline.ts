export interface TimelineEvent {
  id: string;
  title: string;
  date: string | null;
  description: string;
  photo: string | null;
  icon: string;
  location?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "first-meet",
    title: "First Time We Met",
    date: null, // Replace with actual date if known, e.g., "2025-12-01"
    description: "Add your story here... How did it feel when you first saw her?",
    photo: null, // e.g., "/images/story/first-meet.jpg"
    icon: "Eye", // Lucide icon name
  },
  {
    id: "first-date",
    title: "Our First Date",
    date: "2026-06-28",
    description: "The beginning of something beautiful.",
    photo: null,
    icon: "Coffee",
  },
  {
    id: "became-us",
    title: "The Day We Became Us",
    date: "2026-07-06",
    description: "The day you officially became my girlfriend.",
    photo: null,
    icon: "Heart",
  },
  {
    id: "favorite-memory",
    title: "A Favorite Memory",
    date: null,
    description: "A moment I'll never forget.",
    photo: null,
    icon: "Sparkles",
  }
];
