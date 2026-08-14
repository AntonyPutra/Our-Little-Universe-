export type DreamStatus = "Dreaming" | "Planned" | "Done 💜";

export interface Dream {
  id: string;
  title: string;
  status: DreamStatus;
  description?: string;
}

export const dreams: Dream[] = [
  {
    id: "dream-1",
    title: "Watch the sunset at the beach",
    status: "Dreaming",
    description: "Just you, me, and the sound of the waves."
  },
  {
    id: "dream-2",
    title: "Go on a late night food run",
    status: "Planned",
  },
  {
    id: "dream-3",
    title: "Take a photobooth picture together",
    status: "Done 💜",
  },
];
