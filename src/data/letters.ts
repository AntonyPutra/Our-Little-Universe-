export interface LoveLetter {
  id: string;
  title: string;
  date: string | null;
  preview: string;
  content: string[]; // Array of paragraphs
  isSpecial?: boolean; // For "Open When You Miss Me"
}

export const letters: LoveLetter[] = [
  {
    id: "open-when-miss-me",
    title: "Open When You Miss Me",
    date: null,
    preview: "For those moments when I'm not right there next to you.",
    content: [
      "Hi pretty girl,",
      "If you're reading this, it means you're missing me. I'm probably missing you right now too.",
      "Just remember that you are my favorite person in the whole world. No matter the distance or what we're doing, you're always on my mind.",
      "I love you, Vell Vell.",
      "Yours,",
      "Putra"
    ],
    isSpecial: true,
  },
  {
    id: "first-letter",
    title: "For You, Vell Vell 💜",
    date: "2026-07-06",
    preview: "A little note to remind you how much you mean to me.",
    content: [
      "I wanted to write something down so you can always come back and read it.",
      "You make ordinary days feel special. Thank you for being you.",
      "(Replace this text with your real letter later!)"
    ],
  },
];
